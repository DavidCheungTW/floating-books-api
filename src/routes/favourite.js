const express = require('express');
const router = express.Router();
const {
  createFavourite,
  getAllFavourite,
  searchFavourite,
  getFavourite,
  patchFavourite,
  deleteFavourite,
} = require('../controllers/favourite');

router.route('/favourites').post(createFavourite).get(getAllFavourite);

router.route('/favourites/search').post(searchFavourite);

router
  .route('/favourites/:id')
  .get(getFavourite)
  .patch(patchFavourite)
  .delete(deleteFavourite);

module.exports = router;
