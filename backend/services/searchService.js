import { Item } from '../models/Item.js';

export const createFilter = (queryParams) => {
  // queryParams aus frontend  übermittelt (useFilteredItems.js hook)
  const { category, subcategory, size, color, shipping, location } = queryParams;
  // Basisfilter: Nur Artikel mit dem Status "aktiv"
  const filter = { status: 'aktiv' };

  // Filter werden hinzugefügt, falls vorhanden
  if (category) {
    filter.category = { $in: category.split(',') };
  }
  if (subcategory) {
    filter.subcategory = { $in: subcategory.split(',') };
  }
  if (size) {
    filter.size = { $in: size.split(',') };
  }
  if (color) {
    filter.color = { $elemMatch: { name: { $in: color.split(',') } } };
  }
  if (shipping) {
    filter.shipping = shipping;
  }
  if (location) {
    filter['location.city'] = { $in: location.split(',') };
  }

  return filter;
};

// Volltextsuche und Fuzzy Search mit MongoDB Atlas Search
// In Atlas muss ein Search Index erstellt werden, damit Item.aggregate() verwenden kann
// Vorteil von Aggregation: mehrere Datenoperationen in einer Datenbankabfrage möglich, zB hier suche, filtern, sortieren und gruppieren
// https://www.mongodb.com/docs/atlas/atlas-search/

export const searchItemsInDB = async (filter, searchQuery, currentPage, itemsPerPage, sortOrder) => {
  // überspringen für Pagination, damit die richtigen Artikel auf der richtigen Seite angezeigt werden
  const skip = (currentPage - 1) * itemsPerPage;

  let searchItems = [];
  let totalItemsCount = 0;
  let availableFilters = {};
  let allFilters = {};

  try {
    // Initialisierung der Aggregationspipeline
    const aggregationPipeline = [];

    // wenn suchbegriff eingegeben wird, dann wird Fuzzy Search angewendet
    if (searchQuery && searchQuery.trim().length > 0) {
      aggregationPipeline.push({
        $search: {
          index: 'default', // Standardindex, in Atlas Search erstellt
          text: {
            // Textsuche, es kann 1 Wort gesucht werden, path Felder werden durchsucht
            query: searchQuery,
            path: ['title', 'description', 'color.name'],
            fuzzy: { maxEdits: 1, prefixLength: 1 } // max. Tippfehler 1, Anfangsbuchstabe muss richtig sein
          }
        }
      });
    }

    // wenn filter vorhanden sind, werden sie mit den in createFilter definierten Filter angewendet
    if (filter && Object.keys(filter).length > 0) {
      aggregationPipeline.push({ $match: filter });
    }

    // Sortierung der gefilterten ergebnisse
    const sortBy = {};

    if (sortOrder === 'Neueste') {
      sortBy.createdAt = -1;
    } else if (sortOrder === 'Älteste') {
      sortBy.createdAt = 1;
    }

    if (Object.keys(sortBy).length > 0) {
      aggregationPipeline.push({ $sort: sortBy });
    } else {
      aggregationPipeline.push({ $sort: { _id: -1 } }); // Standardmäßig nach _id absteigend sortiert, also neueste zuerst (höhere _id)
    }

    // facet Operator für mehrer parallele Aggregationen, um die Suchergebnisse, die Gesamtanzahl und die verfügbaren Filter zu erhalten
    aggregationPipeline.push({
      $facet: {
        // Suchergebnisse
        searchItems: [{ $skip: skip }, { $limit: itemsPerPage }],
        // Gesamtanzahl der gefilterten Items
        totalCount: [{ $count: 'total' }],
        // Verfügbare Filteroptionen
        availableFilters: [
          { $unwind: '$color' }, // color muss erst mit unwind entpackt werden, da es ein array ist
          {
            $group: {
              _id: null,
              categories: { $addToSet: '$category' },
              subcategories: { $addToSet: '$subcategory' },
              sizes: { $addToSet: '$size' },
              colors: { $addToSet: '$color' },
              locations: { $addToSet: '$location.city' },
              shipping: { $addToSet: '$shipping' }
            }
          }
        ]
      }
    });

    // aggregate wird mit den daten aus der pipeline ausgeführt, Ergebnis ist ein array
    const result = await Item.aggregate(aggregationPipeline);

    //console.log('results:', JSON.stringify(result, null, 2));

    // Benötigte Daten aus dem result arary holen
    if (result && result[0]) {
      searchItems = result[0].searchItems;
      totalItemsCount = result[0].totalCount.length > 0 ? result[0].totalCount[0].total : 0;
      availableFilters = result[0].availableFilters.length > 0 ? result[0].availableFilters[0] : {};
    }

    // Zusätzliche Aggregation für alle verfügbaren Filter aus der Datenbank
    // falls Kategorie festgelegt wurde, werden nur die Filter der jeweiligen Kategorie aus der DB geholt
    let allFiltersPipeline = [];
    if (filter && filter.category) {
      allFiltersPipeline.push({ $match: { category: filter.category } });
    }

    allFiltersPipeline.push({ $unwind: '$color' });

    allFiltersPipeline.push({
      $group: {
        _id: null,
        categories: { $addToSet: '$category' },
        subcategories: { $addToSet: '$subcategory' },
        sizes: { $addToSet: '$size' },
        colors: {
          $addToSet: {
            name: '$color.name',
            colorcode: '$color.colorcode'
          }
        },
        locations: { $addToSet: '$location.city' },
        shipping: { $addToSet: '$shipping' }
      }
    });

    allFilters = await Item.aggregate(allFiltersPipeline);
    allFilters = allFilters.length > 0 ? allFilters[0] : {};
    // Rückgabe der Suchergebnisse, der Gesamtanzahl und der verfügbaren Filter
    return { searchItems, totalItemsCount, availableFilters, allFilters };
  } catch (err) {
    console.error('Fehler in der Atlas Search', err);
    throw new Error(`Fehler in der Atlas Search Datenbankabfrage: ${err.message}`);
  }
};
