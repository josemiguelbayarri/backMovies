const router = require('express').Router();//requerimos la funcion router de la libreria express
const MovieController = require('../controllers/MovieController.js') //le pasamos el contenido de el archivo moviecontroller en la carpeta controllers a la funcion moviecontroller

router.get('/allmovies', MovieController.searchAll);//nos traemos todas las peliculas con la funcion searchALL
//
router.get('/title/:title', MovieController.searchTitle);//buscamos las peliculas por titulo con la funcion searchTitle
router.get('/id/:id', MovieController.searchId);//buscamos las peliculas por id con la funcion searchTitle
router.get('/mostpopular', MovieController.mostPopular);
router.get('/lastmovies', MovieController.lastMovies);
router.get('/page/:page', MovieController.getByPage);
module.exports = router //exportamos todos los parametros