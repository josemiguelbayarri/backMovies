const { User, Token } = require('../models');//requerimos la carpeta models y le pasasmos la funcion user para traer ese archivo
const bcryptjs = require('bcryptjs');//requerimos la libreria bcrypsjs para la encriptacion de contraseñas
const jwt = require('jsonwebtoken');//requerimos la libreria jsonwebtoken para la creacion de tokens
const UserController = {
    getAll(req, res) {//Con esta funcion lo que hacemos es traernos a todos los usuarios que estan creados en nuestra base de datos
        User.findAll()
            .then(users => res.send(users))
            .catch(error => {
                console.error(error);
                res.status(500).send({ message: 'Ha habido un problema a la hora de traer a todos los usuarios :(' });
            })
    },
    async signup(req,res) {//Con esta función creamos un nuevo usuario en nuestra base de datos
        try {
            const hash = await bcryptjs.hash(req.body.password, 9);
            req.body.password = hash;
            const user = await User.create(req.body);
            res.status(200).send(user)
        } catch (error) {
            console.log(error)
            res.status(500).send({ message : 'Ha habido un problema a la hora de crear el usuario :('});
        }
    },
    async login(req,res) {// Entramos o logeamos a un usuario ya creado en nuestra base de datos mediante un token
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            const isMatch = await bcryptjs.compare(req.body.password, user.password);
            if (!isMatch) {
                throw new Error('Has equivocado el password o el usuario')
            }
            const token = jwt.sign({ id: user.id}, 'bayarri', { expiresIn: '2y' });
            await Token.create({ 
                token: token,
                UserId: user.id,
                revoked: false
            });
            res.send({ user, token })
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: 'la has cagado en algun momento.'
            });
        }
    },
    async delete(req,res) {//Borramos un usuario que elijamos de nuestra base de datos
        try {
            const { id } = req.params
            const user = await User.destroy({
                where : {
                    id : id
                }
            })
            res.status(200).send({ message : 'Usuario eliminado'})
        } catch (error) {
            console.log(error)
            res.status(500).send({ message : 'Ha habido un problema para eliminar el usuario'})
        }
    },
    async logout(req, res) {
        try {
            const id = req.user.id
            const user = await User.destroy({
                where : {
                    token : req.headers.authorization
                }
            })
            res.status(200).send({ message : 'Succesfully logged out.'})
        } catch (error) {
            console.log(error)
            res.status(500).send({ message : 'There was a problem trying to logout.'})
        }
    }

}


module.exports = UserController;//exportamos usercontroller y toda su logica