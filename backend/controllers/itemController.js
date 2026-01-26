// Create new item
import { v2 as cloudinary } from 'cloudinary';
import { Item } from '../models/Item.js';
import mongoose from 'mongoose';
import User from '../models/User.js';

// All items
export const getItems = async (req, res, next) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (e) {
    next(e);
  }
};

// New item

export const createNewItem = async (req, res, next) => {
  const userId = req.user.userId;

  const images = req.files;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User nicht gefunden' });
    }

    let uploadedImages = [];
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const uploadResult = await cloudinary.uploader.upload(images[i].path); // Der 'path' wird verwendet, um das Bild hochzuladen
        uploadedImages.push(uploadResult.secure_url); // Die URL des hochgeladenen Bildes speichern
      }
    }
    let colors = [];
    if (Array.isArray(req.body.color)) {
      req.body.color.map((colorStr) => colors.push(JSON.parse(colorStr)));
    } else {
      colors.push(JSON.parse(req.body.color));
    }

    const ort = req.body.ort ? JSON.parse(req.body.ort) : {};

    const newItem = await Item.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      subcategory: req.body.subcategory,
      size: req.body.size,
      color: colors,
      location: ort,
      shipping: req.body.shipping,
      images: uploadedImages,
      userId: user._id
    });

    user.itemsId.push(newItem._id);
    await user.save();

    return res.status(201).json({ success: true, message: 'Neuen Artikel hinzugefügt' });
  } catch (error) {
    next(error);
  }
};

// User Items
export const getUserItemsListe = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).populate('itemsId');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User nicht gefunden' });
    }

    return res.status(200).json({ success: true, items: user.itemsId });
  } catch (e) {
    next(e);
  }
};

// Delete Item
export const deleteItem = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const itemId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User nicht gefunden' });
    }
    const item = await Item.findById(itemId);

    if (!item || !item.userId.equals(user._id)) {
      return res.status(404).json({ success: false, message: 'Artikel nicht gefunden' });
    }
    await Item.findByIdAndDelete(itemId);
    const newItemsArray = user.itemsId.filter((itemId) => !itemId.equals(item._id));

    user.itemsId = newItemsArray;

    await user.save();

    return res.status(200).json({ success: true, message: 'Der Artikel wurde gelöscht' });
  } catch (e) {
    next(e);
  }
};

// Get one USER item
export const getOneUserItem = async (req, res, next) => {
  try {
    //   const userId = req.user._id;
    const itemId = req.params.id;
    // const user = await User.findById(userId);
    // if (!user) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "User nicht gefunden" });
    // }
    const item = await Item.findById(itemId);

    if (
      !item
      // ||   !item.userId.equals(user._id)
    ) {
      return res.status(404).json({ success: false, message: 'Der Artikel nicht gefunden' });
    }
    return res.status(200).json({ success: true, item: item });
  } catch (e) {
    next(e);
  }
};

// Get one item
export const getOneItem = async (req, res, next) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ success: false, message: 'Der Artikel nicht gefunden' });
    }

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Der Artikel nicht gefunden' });
    }
    return res.status(200).json({ success: true, item: item });
  } catch (e) {
    next(e);
  }
};

/// Edit Item
export const itemEdit = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const itemId = req.params.id;
    const images = req.files;

    const { title, description, category, subcategory, size, color, shipping, ort } = req.body;
    let { imagesUrl } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User nicht gefunden' });
    }
    const item = await Item.findById(itemId);

    if (!item || !item.userId.equals(user._id)) {
      return res.status(404).json({ success: false, message: 'Artikel nicht gefunden' });
    }
    let uploadedImages = [];
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const uploadResult = await cloudinary.uploader.upload(images[i].path); // Der 'path' wird verwendet, um das Bild hochzuladen
        uploadedImages.push(uploadResult.secure_url); // Die URL des hochgeladenen Bildes speichern
      }
    }

    let newImagesArray = [];

    if (imagesUrl && imagesUrl.length > 0) {
      if (!Array.isArray(imagesUrl)) {
        imagesUrl = imagesUrl ? [imagesUrl] : []; // Falls String → Array, falls null → leeres Array
      }

      newImagesArray = imagesUrl.concat(uploadedImages);
    } else {
      newImagesArray = uploadedImages;
    }
    let colors = [];
    if (Array.isArray(color)) {
      color.map((colorStr) => colors.push(JSON.parse(colorStr)));
    } else {
      colors.push(JSON.parse(color));
    }

    const place = ort ? JSON.parse(ort) : {};

    item.title = title;
    item.category = category;
    item.description = description;
    item.subcategory = subcategory;
    item.size = size;
    item.color = colors;
    item.shipping = shipping;
    item.location = place;
    item.images = newImagesArray;

    await item.save();
    return res.status(200).json({ success: true, message: 'Der Artikel wurde bearbeitet' });
  } catch (e) {
    next(e);
  }
};

//get similar items
export const getSimilarItems = async (req, res, next) => {
  const { size, category, subcategory } = req.query;
  const { id } = req.params;
  const objectId = new mongoose.Types.ObjectId(id);

  try {
    const items = await Item.find({
      size: size,
      category: category,
      subcategory: subcategory,
      _id: { $ne: objectId },
      status: 'aktiv'
    });
    if (items.length > 0) {
      res.json({
        success: true,
        items: items
      });
    } else {
      res.json({
        success: false,
        message: 'Nicht gefunden'
      });
    }
  } catch (e) {
    next(e);
  }
};

// update Item
export const itemUpdate = async (req, res, next) => {
  const userId = req.user.userId;
  const { id } = req.params;
  const { status } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User nicht gefunden' });
    }
    const item = await Item.findById(id);
    if (!item || !item.userId.equals(user._id)) {
      return res.status(404).json({ success: false, message: 'Artikel nicht gefunden' });
    }
    item.status = status;
    await item.save();

    return res.status(200).json({ success: true, message: 'Der Status wurde geändert' });
  } catch (e) {
    next(e);
  }
};
