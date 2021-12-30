const express = require('express');
const cors = require('cors')
const {dbConnection} = require('./database/config')
require('dotenv').config();

const app = express();

dbConnection();

app.use(cors());

app.use( express.static('public') );

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use('/api/user', require('./routes/user'));
app.use('/api/favorites', require('./routes/favorites'));

app.listen(process.env.PORT, ()=>{
    console.log(`Escuchando en puerto ${process.env.PORT}`);
})