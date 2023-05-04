const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUser,
  searchUser,
  getUser,
  patchUser,
  deleteUser,
} = require('../controllers/user');

/**
 * @swagger
 * /users:
 *  post:
 *      tags:
 *          - users
 *      description: Create new user
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The user to create
 *          schema:
 *              type: object
 *              required:
 *                - firstName
 *                - lastName
 *                - userName
 *              properties:
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  userName:
 *                      type: string
 *                  emailVerified:
 *                      type: boolean
 *                  postalAddress:
 *                      type: string
 *      responses:
 *          201:
 *              description: user created
 *  get:
 *      tags:
 *          - users
 *      description: Get all users
 *      responses:
 *          200:
 *              description: All users were retrieved
 */
router.route('/users').post(createUser).get(getAllUser);

/**
 * @swagger
 * /users/search:
 *  post:
 *      tags:
 *          - users
 *      description: Search user by data fields
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The user to create
 *          schema:
 *              type: object
 *              required:
 *                - firstName
 *                - lastName
 *                - userName
 *                - postalAddress
 *              properties:
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  userName:
 *                      type: string
 *                  postalAddress:
 *                      type: string
 *      responses:
 *          200:
 *              description: User records are retrieved
 */
router.route('/users/search').post(searchUser);

/**
 * @swagger
 * /users/{userId}:
 *  get:
 *      tags:
 *          - users
 *      description: Get user with id
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of user to retrieve
 *      responses:
 *          200:
 *              description: User that was retrieved
 *          404:
 *              description: User is not found
 *  patch:
 *      tags:
 *          - users
 *      description: Update any attributes of user
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of user to patch
 *        - in: body
 *          name: user
 *          description: The user to patch
 *          schema:
 *              type: object
 *              required:
 *                - firstName
 *                - lastName
 *                - userName
 *                - postalAddress
 *              properties:
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  userName:
 *                      type: string
 *                  emailVerified:
 *                      type: boolean
 *                  postalAddress:
 *                      type: string
 *      responses:
 *          200:
 *              description: User patched
 *          404:
 *              description: User is not found
 *  delete:
 *      tags:
 *          - users
 *      description: Delete user
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of user to delete
 *      responses:
 *          204:
 *              description: User that was deleted
 *          404:
 *              description: User is not found
 */
router.route('/users/:id').get(getUser).patch(patchUser).delete(deleteUser);

module.exports = router;
