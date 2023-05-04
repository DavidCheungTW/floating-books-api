const { Order } = require('../models');
const {
  createItem,
  getAllItem,
  searchItem,
  getItem,
  patchItem,
  deleteItem,
} = require('./helper');

exports.createOrder = (req, res) => createItem(Order, req, res);
exports.getAllOrder = (req, res) => getAllItem(Order, req, res);
exports.searchOrder = (req, res) => searchItem(Order, req, res);
exports.getOrder = (req, res) => getItem(Order, req, res);
exports.patchOrder = (req, res) => patchItem(Order, req, res);
exports.deleteOrder = (req, res) => deleteItem(Order, req, res);
