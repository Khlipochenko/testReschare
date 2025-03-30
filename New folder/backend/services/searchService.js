import { Item } from '../models/Item.js';

// Volltextsuche und Fuzzy Search mit MongoDB Atlas Search
// in Atlas muss ein Search Index erstellt werden, damit man Item.aggregate() verwenden kann --> gibt Sammlung von Item Objekten
// https://www.mongodb.com/docs/atlas/atlas-search/

export const searchItemsInDB = async (filter, searchQuery, currentPage, itemsPerPage) => {
  const skip = (currentPage - 1) * itemsPerPage;
  let searchItems = [];
  let totalItemsCount = 0;
  let availableFilters = {};

  try {
    // Suche und Filter werden in ein Array gespeichert
    const aggregationPipeline = [];

    // Fuzzy Search, wird durchgeführt falls ein Suchbegriff eingegeben wird
    // mit push werden verschiedene Stufen zur Pipeline hinzugefügt
    // Jede Stufe ist ein Objekt, das bestimmte Reihenfolge ausführt
    if (searchQuery && searchQuery.trim().length > 0) {
      aggregationPipeline.push({
        // Objekt
        $search: {
          index: 'default',
          text: { query: searchQuery, path: ['title', 'description'], fuzzy: { maxEdits: 2, prefixLength: 1 } }
        }
      });
    }

    // Anwenden der zusätzlichen Filter
    aggregationPipeline.push(
      { $match: filter }, // funktioniert wie find()

      {
        $facet: {
          // parallele Datenbankabfrage mit facet
          searchItems: [{ $skip: skip }, { $limit: itemsPerPage }],
          totalCount: [{ $count: 'total' }],
          availableFilters: [
            { $unwind: '$color' }, // color-feld muss "entpackt" werden, da array (Items können 2 Farben haben)
            {
              $group: {
                // group sammelt eindeutige Werte aus gefilterten Dokumenten
                _id: null, // Gruppierung nicht nach bestimmten Feld
                categories: { $addToSet: '$category' },
                subcategories: { $addToSet: '$subcategory' },
                sizes: { $addToSet: '$size' },
                colors: { $addToSet: '$color' },
                shipping: { $addToSet: '$shipping' }
              }
            }
          ]
        }
      }
    );

    // Ergebnisse aus der pipeline, gibt aggregierte Ergebnisse zurück -> Item.aggregate: filtert, gruppiert und zählt Items
    const result = await Item.aggregate(aggregationPipeline);

    if (result && result[0]) {
      searchItems = result[0].searchItems;
      totalItemsCount = result[0].totalCount.length > 0 ? result[0].totalCount[0].total : 0;
      availableFilters = result[0].availableFilters.length > 0 ? result[0].availableFilters[0] : {};
      // console.log('AvailableFilters', availableFilters);
    }

    return { searchItems, totalItemsCount, availableFilters };
  } catch (err) {
    console.error('Fehler in Atlas Search', err);
    throw new Error(`Fehler in Atlas Search Datenbankabfrage: ${err.message}`);
  }
};
