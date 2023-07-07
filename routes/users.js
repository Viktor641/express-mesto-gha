const router = require('express').Router();
const {
  CreateUser,
  getUsers,
  getUser,
  patchProfile,
  patchAvatar,
} = require('../controllers/users');

router.post('/', CreateUser);
router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', patchProfile);
router.patch('/me/avatar', patchAvatar);

module.exports = router;
