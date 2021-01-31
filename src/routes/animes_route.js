const express = require('express');
const router = express.Router();
const auth_anime = require('../midlewares/auth_anime');
const auth_access = require('../midlewares/auth_access');
const AnimesController = require('../controllers/animes_controller');

router.get('/api/animes', AnimesController.get_animes);
router.post('/api/anime', [auth_access, auth_anime], AnimesController.new_anime);
router.put('/api/anime', auth_access, AnimesController.update_anime);
router.delete('/api/anime', auth_access, AnimesController.delete_anime);

module.exports = router;