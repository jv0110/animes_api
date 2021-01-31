const express = require('express');
const router = express.Router();
const auth_genre = require('../midlewares/auth_genre');
const auth_access = require('../midlewares/auth_access');
const GenreController = require('../controllers/genre_controller');

router.get('/api/genres', GenreController.get_genres);
router.post('/api/genre', [auth_access, auth_genre], GenreController.new_genre);
router.put('/api/genre', auth_access, GenreController.update_genre);
router.delete('/api/genre', auth_access, GenreController.delete_genre);

module.exports = router;