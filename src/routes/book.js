const express = require('express');
const authorize = require('../middleware/authorize');
const upload = require('../middleware/upload');
const router = express.Router();
const {
  createBook,
  getAllBook,
  searchBook,
  getBook,
  patchBook,
  deleteBook,
} = require('../controllers/book');

/**
 * @swagger
 * /books:
 *  post:
 *      tags:
 *          - books
 *      description: Create new book
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: book
 *          description: The book to create
 *          schema:
 *              type: object
 *              required:
 *                - title
 *                - ISBN
 *                - author
 *                - releaseDate
 *                - donateDate
 *                - genreId
 *                - donatorId
 *                - ownerId
 *              properties:
 *                  title:
 *                      type: string
 *                  ISBN:
 *                      type: string
 *                  author:
 *                      type: string
 *                  releaseDate:
 *                      type: string
 *                  image:
 *                      type: string
 *                  donatorcomment:
 *                      type: string
 *                  donateDate:
 *                      type: string
 *                  genreId:
 *                      type: number
 *                  donatorId:
 *                      type: number
 *                  ownerId:
 *                      type: number
 *      responses:
 *          201:
 *              description: book created
 *  get:
 *      tags:
 *          - books
 *      description: Get all books
 *      responses:
 *          200:
 *              description: All books were retrieved
 */
router
  .route('/books')
  .post(upload.single('image'), authorize, createBook)
  .get(getAllBook);

/**
 * @swagger
 * /books/search:
 *  post:
 *      tags:
 *          - books
 *      description: Search book by data fields
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: book
 *          description: The book to create
 *          schema:
 *              type: object
 *              required:
 *                - title
 *                - ISBN
 *                - author
 *                - releaseDate
 *                - donateDate
 *                - genreId
 *                - donatorId
 *                - ownerId
 *              properties:
 *                  title:
 *                      type: string
 *                  ISBN:
 *                      type: string
 *                  author:
 *                      type: string
 *                  releaseDate:
 *                      type: string
 *                  donateDate:
 *                      type: string
 *                  genreId:
 *                      type: number
 *                  donatorId:
 *                      type: number
 *                  ownerId:
 *                      type: number
 *      responses:
 *          200:
 *              description: Book records are retrieved
 */
router.route('/books/search').post(searchBook);

/**
 * @swagger
 * /books/{bookId}:
 *  get:
 *      tags:
 *          - books
 *      description: Get book with id
 *      parameters:
 *        - in: path
 *          name: bookId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of book to retrieve
 *      responses:
 *          200:
 *              description: Book that was retrieved
 *          404:
 *              description: Book is not found
 *  patch:
 *      tags:
 *          - books
 *      description: Update any attributes of book
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: bookId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of book to patch
 *        - in: body
 *          name: book
 *          description: The book to patch
 *          schema:
 *              type: object
 *              required:
 *                - title
 *                - ISBN
 *                - author
 *                - releaseDate
 *                - donateDate
 *                - genreId
 *                - donatorId
 *                - ownerId
 *              properties:
 *                  title:
 *                      type: string
 *                  ISBN:
 *                      type: string
 *                  author:
 *                      type: string
 *                  releaseDate:
 *                      type: string
 *                  image:
 *                      type: string
 *                  donatorcomment:
 *                      type: string
 *                  donateDate:
 *                      type: string
 *                  genreId:
 *                      type: number
 *                  donatorId:
 *                      type: number
 *                  ownerId:
 *                      type: number
 *      responses:
 *          200:
 *              description: Book patched
 *          404:
 *              description: Book is not found
 *  delete:
 *      tags:
 *          - books
 *      description: Delete book
 *      parameters:
 *        - in: path
 *          name: bookId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of book to delete
 *      responses:
 *          204:
 *              description: Book that was deleted
 *          404:
 *              description: Book is not found
 */
router.route('/books/:id').get(getBook).patch(patchBook).delete(deleteBook);

module.exports = router;
