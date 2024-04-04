const express = require('express');
const cors = require('cors');
const { route } = require('./routes/Routes');
const { Connect_DB } = require('./config/connectDB');
const { Send_Mail } = require('./functions/functions')


// * dot Env Config

require('dotenv').config();

//  * main App Variable 

const app = express();

//  * app Config
app.options("" , cors({
    origin : "*",
    credentials : true,
    methods : ["GET", "POST", "PUT", "DELETE"]
}))
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors({
    origin : "*",
    credentials : true,
    methods : ["GET", "POST", "PUT", "DELETE"]
}));


// * route Config

app.use('/' , route)
// ! db connection

Connect_DB();

// * server Listen

app.listen(process.env.PORT, () => {
    console.log('Server is Listing On Port ' + process.env.PORT);
});



