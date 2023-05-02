const { Genre } = require('../models');
const {
  createItem,
  getAllItem,
  searchItem,
  getItem,
  patchItem,
  deleteItem,
} = require('../controllers/helper');

exports.createGenre = (req, res) => createItem(Genre, req, res);
exports.getAllGenre = (req, res) => getAllItem(Genre, req, res);
exports.searchGenre = (req, res) => searchItem(Genre, req, res);
exports.getGenre = (req, res) => getItem(Genre, req, res);
exports.patchGenre = (req, res) => patchItem(Genre, req, res);
exports.deleteGenre = (req, res) => deleteItem(Genre, req, res);
