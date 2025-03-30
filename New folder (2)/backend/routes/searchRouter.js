import { Router } from 'express';
import { getSearchItems, getCategorySearchItems } from '../controllers/searchController.js';

export const searchRouter = Router();

// Route für die allgemeine Suche
searchRouter.get('/', getSearchItems);

// Route für die Kategoriesuche (mit Kategorie-Parameter)
searchRouter.get('/category/:category', getCategorySearchItems);
