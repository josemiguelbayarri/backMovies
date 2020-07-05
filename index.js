const express = require('express');//requerimos la libreria express
const app = express();//activamos la libreria express con su correspondiente funcion

const cors = require('./middlewares/cors');//requerir el archivo corss para que funcione el frontend

const MoviesRouter = require('./routes/movies');//requerimos el archivo movies de la carpeta routes y la pasamos a la funcion moviesRouter
const UserRouter = require('./routes/users');//llamando al archivo users de la carpeta routes y pasadnolo a la funcion userroutes
const OrderRouter = require('./routes/orders');
const PORT = 3000;//declaramos el puerto en el que vamos a trabajar



app.use(cors);//llamar a la funcion cors para permitir el acceso al frontend
app.use(express.json());//activar paquete json para que lo devuelva
app.use(express.urlencoded({ extended: true }));//activa urlencoded (no sabemos que funcion tiene)

app.use('/users', UserRouter);//la ruta de usuario y la funcion que le pasamos que trae con ella la logica

//movies
app.use('/movies', MoviesRouter);//la ruta de las peliculas y la funciones que le pasamos que trae con ella la logica
app.get('/movies/title/:showTitle');



app.use('/orders', OrderRouter);
app.listen(PORT, () => console.log('server running on port ' + PORT))//la llamada para levantar el puerto