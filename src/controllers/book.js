const { Book } = require('../models');
const {
  createItem,
  getAllItem,
  searchItem,
  getItem,
  patchItem,
  deleteItem
} = require('../controllers/helper');

exports.createBook = (req, res) => createItem(Book, req, res);
exports.getAllBook = (req, res) => getAllItem(Book, req, res);
exports.searchBook = (req, res) => searchItem(Book, req, res);
exports.getBook = (req, res) => getItem(Book, req, res);
exports.patchBook = (req, res) => patchItem(Book, req, res);
exports.deleteBook = (req, res) => deleteItem(Book, req, res);
