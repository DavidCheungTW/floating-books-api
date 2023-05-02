const { Favourite } = require('../models');
const {
  createItem,
  getAllItem,
  searchItem,
  getItem,
  patchItem,
  deleteItem,
} = require('../controllers/helper');

exports.createFavourite = (req, res) => createItem(Favourite, req, res);
exports.getAllFavourite = (req, res) => getAllItem(Favourite, req, res);
exports.searchFavourite = (req, res) => searchItem(Favourite, req, res);
exports.getFavourite = (req, res) => getItem(Favourite, req, res);
exports.patchFavourite = (req, res) => patchItem(Favourite, req, res);
exports.deleteFavourite = (req, res) => deleteItem(Favourite, req, res);
