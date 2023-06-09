const { User } = require('../models');
const {
  createItem,
  getAllItem,
  searchItem,
  getItem,
  patchItem,
  deleteItem,
} = require('../controllers/helper');

exports.createUser = (req, res) => createItem(User, req, res);
exports.getAllUser = (req, res) => getAllItem(User, req, res);
exports.searchUser = (req, res) => searchItem(User, req, res);
exports.getUser = (req, res) => getItem(User, req, res);
exports.patchUser = (req, res) => patchItem(User, req, res);
exports.deleteUser = (req, res) => deleteItem(User, req, res);
