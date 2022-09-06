const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRouter = require('./pokemons');
const typeRouter = require('./types');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', pokemonRouter);
router.use('/types', typeRouter);

router.get('/', (req, res) => { 
    res.send('Bienvenido a mi API =)')
})


module.exports = router;