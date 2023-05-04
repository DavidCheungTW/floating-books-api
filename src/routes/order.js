const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrder,
  searchOrder,
  getOrder,
  patchOrder,
  deleteOrder,
} = require('../controllers/order');

router.route('/orders').post(createOrder).get(getAllOrder);

router.route('/orders/search').post(searchOrder);

router.route('/orders/:id').get(getOrder).patch(patchOrder).delete(deleteOrder);

module.exports = router;
