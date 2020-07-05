const { Order } = require('../models')
const OrderController = {
    create(req,res) {
        Order.create(req.body)
            .then(order => {
                res.status(200).send(order)
            })
            .catch( error => {
                console.log(error)
                res.status(500).send({ message : 'Ha habido un problema creando el pedido'})
            })
    },
    async allOrders(req,res) {
        const orders = await Order.findAll();
        res.status(200).send(orders);
    }
}
module.exports = OrderController;