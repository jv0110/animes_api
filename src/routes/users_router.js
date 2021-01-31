const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users_controller');
const auth_access = require('../midlewares/auth_access');
const auth_newUser = require('../midlewares/auth_newUser');

router.get('/api/users', UsersController.get_users);
router.post('/api/user', [auth_access, auth_newUser], UsersController.new_user);
router.post('/api/login', UsersController.login);
router.put('/api/user', auth_access, UsersController.update_user);
router.delete('/api/user', auth_access, UsersController.delete_user);

module.exports = router;