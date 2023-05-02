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

router.route('/users').post(createUser).get(getAllUser);

router.route('/users/search').post(searchUser);

router.route('/users/:id').get(getUser).patch(patchUser).delete(deleteUser);

module.exports = router;
