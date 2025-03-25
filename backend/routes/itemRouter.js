import { Router } from 'express';
import { upload } from '../utils/multer.js';
import {
  createNewItem,
  deleteItem,
  getOneItem,
  getOneUserItem,
  getSimilarItems,
  getUserItemsListe,
  itemEdit,
  itemUpdate
} from '../controllers/itemController.js';
import { getItems } from '../controllers/itemController.js';
import { authMiddleware } from '../middleware/auth.js';

export const itemRouter = Router();
itemRouter.get('/', getItems);
itemRouter.get('/:id', getOneItem);
itemRouter.post('/create', upload, authMiddleware, createNewItem);
itemRouter.get('/user/items/meine-artikel', authMiddleware, getUserItemsListe);
itemRouter.delete('/delete/:id',authMiddleware, deleteItem);
itemRouter.put('/edit/:id', upload,authMiddleware, itemEdit);
itemRouter.get('/user/:id',authMiddleware, getOneUserItem);
itemRouter.get('/:id/search', getSimilarItems); //similar items
itemRouter.patch('/:id/status',authMiddleware, itemUpdate); // update status
