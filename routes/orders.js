const router = require('express').Router();//llamamos a la funcion router de express
const OrderController = require('../controllers/OrderController');//llamamos al archivo ordercontroller dentro de la carpeta controllers y lo pasamos a la funcion ordercontroller

router.get('/', OrderController.allOrders);
router.post('/', OrderController.create);


module.exports = router;