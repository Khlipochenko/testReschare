import { searchItemsInDB } from '../services/searchService.js';
import { createFilter } from '../helpers/createFilter.js';
import { sortItems } from '../helpers/createSort.js';
// import { getFiltersFromDB } from '../helpers/getFiltersFromDB.js';

// Alle Items durchsuchen (globale Suche)
export const getSearchItems = async (req, res, next) => {
  try {
    const searchQuery = req.query.q ?? '';
    const category = req.query.category ?? '';
    const subcategory = req.query.subcategory ?? '';
    const size = req.query.size ?? '';
    const color = req.query.color ?? '';
    const shipping = req.query.shipping ?? '';
    const sort = req.query.sort ?? '';

    const currentPage = parseInt(req.query.page ?? '1');
    const itemsPerPage = parseInt(req.query.limit ?? '12');

    // Filter
    let filter = createFilter({ category, subcategory, size, color, shipping });

    let { searchItems, totalItemsCount, availableFilters } = await searchItemsInDB(
      filter,
      searchQuery,
      currentPage,
      itemsPerPage
    );

    if (searchItems.length === 0) {
      return res.status(404).json({ message: 'Keine Ergebnisse gefunden.', availableFilters });
    }

    // Sortierung nach "Neueste" oder "Älteste" anwenden
    searchItems = sortItems(searchItems, sort);

    const totalPages = Math.ceil(totalItemsCount / itemsPerPage);

    return res.json({ totalItemsCount, totalPages, searchItems, availableFilters });
  } catch (e) {
    return next(e);
  }
};

// Nur Items einer bestimmten Kategorie durchsuchen
export const getCategorySearchItems = async (req, res, next) => {
  try {
    const category = req.params.category; // Kategorie ist Pflicht für diese Route
    const searchQuery = req.query.q ?? '';
    const subcategory = req.query.subcategory ?? '';
    const size = req.query.size ?? '';
    const color = req.query.color ?? '';
    const shipping = req.query.shipping ?? '';
    const sort = req.query.sort ?? '';

    const currentPage = parseInt(req.query.page ?? '1');
    const itemsPerPage = parseInt(req.query.limit ?? '12');

    // Filter erstellen
    let filter = createFilter({ subcategory, size, color, shipping });
    filter.category = category;

    let { searchItems, totalItemsCount, availableFilters } = await searchItemsInDB(
      filter,
      searchQuery,
      currentPage,
      itemsPerPage
    );

    if (searchItems.length === 0) {
      return res.status(404).json({ message: 'Keine Ergebnisse gefunden.', availableFilters });
    }

    // Sortierung nach "Neueste" oder "Älteste" anwenden
    searchItems = sortItems(searchItems, sort);

    const totalPages = Math.ceil(totalItemsCount / itemsPerPage);

    return res.json({ totalItemsCount, totalPages, searchItems, availableFilters });
  } catch (e) {
    return next(e);
  }
};

// import { Item } from '../models/Item.js';

// // Alle Items durchsuchen (globale Suche)
// export const getSearchItems = async (req, res, next) => {
//   try {
//     const searchQuery = req.query.q ?? '';
//     const category = req.query.category ?? '';
//     const subcategory = req.query.subcategory ?? '';
//     const size = req.query.size ?? '';
//     const color = req.query.color ?? '';
//     const shipping = req.query.shipping ?? '';
//     const sort = req.query.sort ?? '';

//     const currentPage = parseInt(req.query.page ?? '1');
//     const itemsPerPage = parseInt(req.query.limit ?? '12');
//     const skip = (currentPage - 1) * itemsPerPage;

//     // Basisfilter: Zeige nur aktive Items
//     let filter = { status: 'aktiv' };

//     // Weitere Filter
//     if (category) filter.category = { $in: category.split(',') };
//     if (subcategory) filter.subcategory = { $in: subcategory.split(',') };
//     if (size) filter.size = { $in: size.split(',') };
//     if (color) filter.color = { $elemMatch: { name: { $in: color.split(',') } } };
//     if (shipping) filter.shipping = shipping;

//     let searchItems = [];
//     let totalItemsCount = 0;

//     // Falls eine Suchbegriff eingegeben wurde → Fuzzy Search mit MongoDB Atlas Search
//     if (searchQuery && searchQuery.trim().length > 0) {
//       const result = await Item.aggregate([
//         {
//           $search: {
//             index: 'default',
//             text: { query: searchQuery, path: ['title', 'description'], fuzzy: { maxEdits: 2, prefixLength: 1 } }
//           }
//         },
//         { $match: filter },
//         {
//           $facet: {
//             searchItems: [
//               // Ergebnisse für die aktuelle Seite
//               { $skip: skip },
//               { $limit: itemsPerPage }
//             ],
//             totalCount: [
//               // Gesamtanzahl der Treffer zählen
//               { $count: 'total' }
//             ]
//           }
//         }
//       ]);

//       if (result && result[0]) {
//         searchItems = result[0].searchItems;
//         totalItemsCount = result[0].totalCount.length > 0 ? result[0].totalCount[0].total : 0;
//       } else {
//         return res.status(404).json({ message: 'Keine Ergebnisse gefunden' });
//       }
//     } else {
//       // Wenn kein Suchbegriff vorhanden ist, dann alle aktiven items zurückgeben
//       searchItems = await Item.find(filter).skip(skip).limit(itemsPerPage);
//       totalItemsCount = await Item.countDocuments(filter);
//     }

//     if (searchItems.length === 0) {
//       console.log('Keine Ergebnisse gefunden:', searchItems);
//       return res.status(404).json({ message: 'Keine Ergebnisse gefunden.' });
//     }

//     // Sortierung nach "Neueste" oder "Älteste" anwenden
//     if (sort) {
//       if (sort === 'Neueste') {
//         searchItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       } else if (sort === 'Älteste') {
//         searchItems.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//       }
//     }

//     const totalPages = Math.ceil(totalItemsCount / itemsPerPage);

//     return res.json({ totalItemsCount, totalPages, searchItems });
//   } catch (e) {
//     return next(e);
//   }
// };

// // Nur Items einer bestimmten Kategorie durchsuchen
// export const getCategorySearchItems = async (req, res, next) => {
//   try {
//     const category = req.params.category; // Kategorie ist Pflicht für diese Route
//     const searchQuery = req.query.q ?? '';
//     const subcategory = req.query.subcategory ?? '';
//     const size = req.query.size ?? '';
//     const color = req.query.color ?? '';
//     const shipping = req.query.shipping ?? '';
//     const sort = req.query.sort ?? '';

//     const currentPage = parseInt(req.query.page ?? '1');
//     const itemsPerPage = parseInt(req.query.limit ?? '12');
//     const skip = (currentPage - 1) * itemsPerPage;

//     // Filter für aktive Items in der gewählten Kategorie
//     let filter = { status: 'aktiv', category: category };

//     if (subcategory) filter.subcategory = { $in: subcategory.split(',') };
//     if (size) filter.size = { $in: size.split(',') };
//     if (color) filter.color = { $elemMatch: { name: { $in: color.split(',') } } };
//     if (shipping) filter.shipping = shipping;

//     let searchItems = [];
//     let totalItemsCount = 0;

//     // Falls eine Suchanfrage vorhanden ist → Fuzzy Search mit MongoDB Atlas
//     if (searchQuery && searchQuery.trim().length > 0) {
//       const result = await Item.aggregate([
//         {
//           $search: {
//             index: 'default',
//             text: { query: searchQuery, path: ['title', 'description'], fuzzy: { maxEdits: 2, prefixLength: 1 } }
//           }
//         },
//         { $match: filter },
//         {
//           $facet: {
//             searchItems: [
//               // Ergebnisse für die aktuelle Seite
//               { $skip: skip },
//               { $limit: itemsPerPage }
//             ],
//             totalCount: [
//               // Gesamtanzahl der Treffer zählen
//               { $count: 'total' }
//             ]
//           }
//         }
//       ]);

//       if (result && result[0]) {
//         searchItems = result[0].searchItems;
//         totalItemsCount = result[0].totalCount.length > 0 ? result[0].totalCount[0].total : 0;
//       } else {
//         return res.status(404).json({ message: 'Keine Ergebnisse gefunden' });
//       }
//     } else {
//       // Wenn kein Suchbegriff vorhanden ist, dann alle aktiven items zurückgeben
//       searchItems = await Item.find(filter).skip(skip).limit(itemsPerPage);
//       totalItemsCount = await Item.countDocuments(filter);
//     }

//     if (searchItems.length === 0) {
//       console.log('Keine Ergebnisse gefunden:', searchItems);
//       return res.status(404).json({ message: 'Keine Ergebnisse gefunden.' });
//     }

//     // Sortierung nach "Neueste" oder "Älteste" anwenden
//     if (sort) {
//       if (sort === 'Neueste') {
//         searchItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       } else if (sort === 'Älteste') {
//         searchItems.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//       }
//     }

//     const totalPages = Math.ceil(totalItemsCount / itemsPerPage);

//     return res.json({ totalItemsCount, totalPages, searchItems });
//   } catch (e) {
//     return next(e);
//   }
// };

// import { Item } from '../models/Item.js';

// export const getSearchItems = async (req, res, next) => {
//   try {
//     const searchQuery = req.query.q; // Suchbegriff aus query Parameter holen

//     // Falls Suchbegriff leer oder nicht vorhande, alle Items zurückgeben
//     if (!searchQuery || searchQuery.trim().length === 0) {
//       const allItems = await Item.find({});
//       return res.json(allItems);
//     }

//     // Fuzzy Search mit MongoDB Atlas Search, in Atlas muss ein Search Index erstellt werden
//     // https://www.mongodb.com/docs/atlas/atlas-search/
//     const searchResults = await Item.aggregate([
//       {
//         $search: {
//           index: 'default', // Indexname in Atlas Search
//           text: {
//             query: searchQuery,
//             path: ['title', 'description'], // Durchsuchte Felder
//             fuzzy: { maxEdits: 2 } // Maximale Tippfehler
//           }
//         }
//       }
//     ]);

//     // alternativ Regex Suche, title und descripion werden durchsucht, dann fuzzy search durch frontend
//     // const query = {
//     //   $or: [
//     //     { title: { $regex: searchQuery.trim(), $options: 'i' } }, // options "i" für case-insensitive Suche
//     //     { description: { $regex: searchQuery.trim(), $options: 'i' } } // options "i" für case-insensitive Suche
//     //   ]
//     // };
//     // const searchResults = await Item.find(query); // Datenbank durchsuchen

//     if (searchResults.length === 0) {
//       return res.status(404).json({ message: 'Keine Ergebnisse gefunden.' });
//     }

//     res.json(searchResults);
//   } catch (e) {
//     next(e);
//   }
// };
