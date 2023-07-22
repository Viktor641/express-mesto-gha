const router = require('express').Router();
const {
  getUsers,
  getUser,
  patchProfile,
  patchAvatar,
  getAuthUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getAuthUser);
router.get('/:userId', getUser);
router.patch('/me', patchProfile);
router.patch('/me/avatar', patchAvatar);

module.exports = router;
