require('dotenv').config();
const express = require('express');
const cors = require('cors');
const DB = require('./db/db');
const bodyParser = require('body-parser');
const PORT = process.env.PORT;

const User = require('./routes/userRoutes');
const carPost = require('./routes/carPostRoutes');
const mail = require("./routes/mailRoutes");

const app = express();

//DB connection
    DB.mongooseConnection();  

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/user', User);
app.use('/carpost', carPost);
app.use("/mail", mail);

app.listen(PORT, ()=>{
    console.log(`Server listening at localhost:${PORT}`);
})