const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { config } = require('dotenv');
const cors = require('cors');
config();

const bookRoutes = require('./routes/book.routes');

// Usamos express para los middlewares
const app = express();
app.use(cors());
app.use(bodyParser.json()); //Parseador de bodies

// conectaremos la base de datos MongoDb
mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME });
const db = mongoose.connection;

// pasamos las rutas
app.use('/books', bookRoutes);

const port = process.env.PORT || 3300;

app.listen(port, ()=>{
    console.log(`Servidor iniciado en el puerto ${port}`)
});