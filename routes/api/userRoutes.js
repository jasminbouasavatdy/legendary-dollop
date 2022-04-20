const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
  updateUser,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getUser).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/user/:userId/friends
router.route('/:userId/friends');

// /api/user/:userId/friends/:friendsId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
