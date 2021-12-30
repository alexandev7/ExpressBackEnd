/*
    Rutas de Favoritos
    host + /api/favorites
*/
const {Router} = require('express');

const {getFavorites, createFavorite, deleteFavorites} = require('../controllers/favorites');
const {validateJWT} = require('../middlewares/validate-jwt');

const router = Router();

router.use(validateJWT);

router.get('/', getFavorites);
router.post('/', createFavorite)
router.delete('/:id', deleteFavorites)

module.exports = router;