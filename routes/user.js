/*
    Rutas de Usuarios
    host + /api/user
*/

const {Router} = require('express');

const {createUser, loginUser, revalidateToken, getImageURI} = require('../controllers/user');
const {validateJWT} = require('../middlewares/validate-jwt');

const router = Router();

router.post('/new', createUser);
router.post('/login', loginUser);
router.get('/renew', validateJWT, revalidateToken)
router.get('/imageURI', validateJWT, getImageURI)

module.exports = router;