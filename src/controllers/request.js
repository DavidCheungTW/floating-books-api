const { Request } = require('../models');
const {
  createItem,
  getAllItem,
  searchItem,
  getItem,
  patchItem,
  deleteItem,
} = require('../controllers/helper');

exports.createRequest = (req, res) => createItem(Request, req, res);
exports.getAllRequest = (req, res) => getAllItem(Request, req, res);
exports.searchRequest = (req, res) => searchItem(Request, req, res);
exports.getRequest = (req, res) => getItem(Request, req, res);
exports.patchRequest = (req, res) => patchItem(Request, req, res);
exports.deleteRequest = (req, res) => deleteItem(Request, req, res);
