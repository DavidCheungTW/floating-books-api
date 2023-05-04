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

/**
 * @swagger
 * /favourites:
 *  post:
 *      tags:
 *          - favourites
 *      description: Create new favourite
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: favourite
 *          description: The favourite to create
 *          schema:
 *              type: object
 *              required:
 *                - createDate
 *                - userId
 *                - bookId
 *              properties:
 *                  createDate:
 *                      type: string
 *                  userId:
 *                      type: number
 *                  bookId:
 *                      type: number
 *      responses:
 *          201:
 *              description: favourite created
 *  get:
 *      tags:
 *          - favourites
 *      description: Get all favourites
 *      responses:
 *          200:
 *              description: All favourites were retrieved
 */
router.route('/favourites').post(createFavourite).get(getAllFavourite);

/**
 * @swagger
 * /favourites/search:
 *  post:
 *      tags:
 *          - favourites
 *      description: Search favourite by data fields
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: favourite
 *          description: The favourite to create
 *          schema:
 *              type: object
 *              required:
 *                - createDate
 *                - userId
 *                - bookId
 *              properties:
 *                  createDate:
 *                      type: string
 *                  userId:
 *                      type: number
 *                  bookId:
 *                      type: number
 *      responses:
 *          200:
 *              description: Favourite records are retrieved
 */
router.route('/favourites/search').post(searchFavourite);

/**
 * @swagger
 * /favourites/{favouriteId}:
 *  get:
 *      tags:
 *          - favourites
 *      description: Get favourite with id
 *      parameters:
 *        - in: path
 *          name: favouriteId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of favourite to retrieve
 *      responses:
 *          200:
 *              description: Favourite that was retrieved
 *          404:
 *              description: Favourite is not found
 *  patch:
 *      tags:
 *          - favourites
 *      description: Update any attributes of favourite
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: favouriteId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of favourite to patch
 *        - in: body
 *          name: favourite
 *          description: The favourite to patch
 *          schema:
 *              type: object
 *              required:
 *                - createDate
 *                - userId
 *                - bookId
 *              properties:
 *                  createDate:
 *                      type: string
 *                  userId:
 *                      type: number
 *                  bookId:
 *                      type: number
 *      responses:
 *          200:
 *              description: Favourite patched
 *          404:
 *              description: Favourite is not found
 *  delete:
 *      tags:
 *          - favourites
 *      description: Delete favourite
 *      parameters:
 *        - in: path
 *          name: favouriteId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of favourite to delete
 *      responses:
 *          204:
 *              description: Favourite that was deleted
 *          404:
 *              description: Favourite is not found
 */
router
  .route('/favourites/:id')
  .get(getFavourite)
  .patch(patchFavourite)
  .delete(deleteFavourite);

module.exports = router;
