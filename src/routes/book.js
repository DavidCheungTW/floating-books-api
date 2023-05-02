const express = require('express');
const router = express.Router();
const {
  createBook,
  getAllBook,
  searchBook,
  getBook,
  patchBook,
  deleteBook,
} = require('../controllers/book');

router.route('/books').post(createBook).get(getAllBook);

router.route('/books/search').post(searchBook);

router.route('/books/:id').get(getBook).patch(patchBook).delete(deleteBook);

module.exports = router;
