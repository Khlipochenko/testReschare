import { createFilter, searchItemsInDB } from '../services/searchService.js';

// Funktion, um in allen Items zu suchen und zu filtern
export const getSearchItems = async (req, res, next) => {
  try {
    const {
      q: searchQuery = '',
      category = '',
      subcategory = '',
      size = '',
      color = '',
      shipping = '',
      sort = 'Neueste',
      location = '',
      page = '1',
      limit = '12'
    } = req.query;
    const currentPage = Math.max(parseInt(page ?? '1'), 1); // stellt sicher, dass currentPage min 1 ist
    const itemsPerPage = Math.max(parseInt(limit ?? '12'), 12); // stellt sicher, dass itemsPerPage min 10 ist

    // Filter erstellen
    const filterParams = { category, subcategory, size, color, location, shipping };
    const filter = createFilter(filterParams);

    // Items aus der Datenbank abrufen
    const { searchItems, totalItemsCount, availableFilters, allFilters } = await searchItemsInDB(
      filter,
      searchQuery,
      currentPage,
      itemsPerPage,
      sort
    );

    // if (searchItems.length === 0) {
    //   // Wenn Filter verfügbar sind, aber keine Ergebnisse gefunden wurden
    //   if (availableFilters && Object.keys(availableFilters).length > 0) {
    //     return res.status(404).json({ message: 'Keine Ergebnisse für die gewählten Filter.', availableFilters });
    //   } else {
    //     // Falls keine Filter verfügbar sind
    //     return res.status(404).json({ message: 'Keine Filter gefunden.', availableFilters });
    //   }
    // }

    // Gesamtseiten berechnen
    const totalPages = Math.ceil(totalItemsCount / itemsPerPage);

    return res.status(200).json({ totalItemsCount, totalPages, searchItems, availableFilters, allFilters });
  } catch (e) {
    return next(e);
  }
};

// Funktion, um in Kategorien zu duchen und zu filtern
export const getCategorySearchItems = async (req, res, next) => {
  try {
    const { category } = req.params; // Kategorie ist Pflicht für diese Route
    const {
      q: searchQuery = '',
      subcategory = '',
      size = '',
      color = '',
      shipping = '',
      sort = 'Neueste',
      location = '',
      page = '1',
      limit = '12'
    } = req.query;
    const currentPage = Math.max(parseInt(page ?? '1'), 1); // stellt sicher, dass currentPage min 1 ist
    const itemsPerPage = Math.max(parseInt(limit ?? '12'), 12); // stellt sicher, dass itemsPerPage min 10 ist

    // Filter erstellen
    const filterParams = { subcategory, size, color, location, shipping };
    const filter = createFilter(filterParams);
    filter.category = category; // Kategorie Filter ist immer gesetzt

    // Items aus der Datenbank abrufen
    const { searchItems, totalItemsCount, availableFilters, allFilters } = await searchItemsInDB(
      filter,
      searchQuery,
      currentPage,
      itemsPerPage,
      sort
    );

    // if (searchItems.length === 0) {
    //   // Wenn Filter verfügbar sind, aber keine Ergebnisse gefunden wurden
    //   if (availableFilters && Object.keys(availableFilters).length > 0) {
    //     return res.status(404).json({ message: 'Keine Ergebnisse für die gewählten Filter.', availableFilters });
    //   } else {
    //     // Falls keine Filter verfügbar sind
    //     return res.status(404).json({ message: 'Keine Filter gefunden.', availableFilters });
    //   }
    // }

    // Gesamtseiten berechnen
    const totalPages = Math.ceil(totalItemsCount / itemsPerPage);

    return res.status(200).json({ totalItemsCount, totalPages, searchItems, availableFilters, allFilters });
  } catch (e) {
    return next(e);
  }
};
