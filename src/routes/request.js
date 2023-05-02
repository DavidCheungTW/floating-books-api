const express = require('express');
const router = express.Router();
const {
  createRequest,
  getAllRequest,
  searchRequest,
  getRequest,
  patchRequest,
  deleteRequest,
} = require('../controllers/request');

router.route('/requests').post(createRequest).get(getAllRequest);

router.route('/requests/search').post(searchRequest);

router
  .route('/requests/:id')
  .get(getRequest)
  .patch(patchRequest)
  .delete(deleteRequest);

module.exports = router;
