const router = require('express').Router();//importamos la libreria express pero solo su funcion router
const UserController = require('../controllers/UserController');//requerimos el archivo usercontroller de la carpeta controllers y se lo pasamos a la funcion usercontroller
const  { auth }  = require('../middlewares/auth');//requerimos el archivo auth de la carpeta middlewares que se encarga

//PASO DE USUARIOS MEDIANTE LA FUNCION DESIGNADA
router.get('/', auth, UserController.getAll);//para traernos a todos los usuarios
router.post('/signup', UserController.signup);//para crear un usuario y meterlo en la base de datos
router.post('/login', UserController.login);//para logear a un usuario ya creado en la base de datos
router.delete('/delete/:id', UserController.delete);//para borrar un usuario de la base de datos mediante postman

module.exports = router;//exportamos las funciones