const { Movie, Order } = require('../models');
const { Op } = require("sequelize");

const MovieController = {
    async searchAll(req,res) {//funcion para traer todas las peliculas 
        try {
            const movies = await Movie.findAll({
                limit: 12//limitamos las peliculas que nos traemos a cien
            })
            res.status(200).send(movies)
        } catch (error) {//en casa de que haya un fallo le pasamos este mensaje de error
            console.log(error)
            res.status(500).send({ message : 'error al buscar todas las peliculas'})
        }
    },
    async searchTitle(req,res) {//funcion para buscar pelis por titulo
        try {
            const { title } = req.params
            const movie = await Movie.findAll({//parametro para traer todas las pelis de un mismo titulo
                where : {
                    title : {
                        [Op.regexp]:`.*${title}.*`
                    }
                }
            });
            if (movie === null){//en caso de que el nombre introducido no coincida con ninguna peli salta este mensaje
                res.status(400).send({ message : 'Pelicula no encontrada'});
            }
            res.status(200).send(movie);
            console.log(movie)
        } catch (error) {
            console.log(error)
            res.status(500).send({ message : 'Error creando pelicula'})
        }
    },
    async searchId(req,res) {//funcion para buscar las pelis por id
        try {
            const { id } = req.params;

            const movieId = await Movie.findOne({//definimos que vamops a traernos solo una peli ya que las id son unicas
                where : {
                    id : id
                }
            })
            if (movieId === null){//mensaje de error en caso de no existir el id
                res.status(400).send({ message : 'Movie no encontrada'})
            }
            res.status(200).send(movieId);
        } catch (error) {
            console.log(error)
            res.status(500).send({ message : 'Error actualizando pelicula'})
        }
    },
    async mostPopular(req,res) {
        try {
            const popular = await Movie.findAll({
                limit: 12,
                where : {
                    popularity:{
                        [Op.gte] : 50
                    }
                }
            });
            res.status(200).send(popular)
        } catch (error) {
            res.status(500).send({ message : 'Error obteniendo peliculas populares'})
        }
    },
    async lastMovies(req,res) {
        try {
            const lastMovies = await Movie.findAll({
                limit: 12,
                where : {
                    release_date:{
                        [Op.between]: ['2018-01-01', '2020-06-27']
                    }
                }
            });
            res.status(200).send(lastMovies)
        } catch (error) {
            res.status(500).send({ message : 'Error buscando las ultimas peliculas'});
        }
    },
    getByPage(req, res) {
        const { page } = req.params;
        const skip = (page - 1) * 20
        Movie.findAll({offset:skip,limit:12})
            .then(movies => res.send(movies))
            .catch(error => {
                console.error(error);
                res.status(500).send({ message : 'There was a problem trying to get the pages.'})
            })
    }
}
module.exports = MovieController;//exportamos la logica de MovieController