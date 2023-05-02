const express = require('express');
const router = express.Router();
const {
  createGenre,
  getAllGenre,
  searchGenre,
  getGenre,
  patchGenre,
  deleteGenre,
} = require('../controllers/genre');

router.route('/genres').post(createGenre).get(getAllGenre);

router.route('/genres/search').post(searchGenre);

router.route('/genres/:id').get(getGenre).patch(patchGenre).delete(deleteGenre);

module.exports = router;
