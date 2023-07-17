const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  createFriend,
  removeFriend,

} = require('../../controllers/userController');

const {createThought, deleteThought,} = require('../../controllers/thoughtController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);


// /api/users/:userId/assignments/:thoughtId
//localhost:3001/api/user/64af1d5cea36bbe7eb00f949/friends/64af1f895b15ad6530e6a385
router.route('/:userId/friends/:friendId').post(createFriend).delete(removeFriend);

module.exports = router;
