var express=require('express');
var path=require('path');
var bodyParser = require('body-parser');
// const helmet = require('helmet');
// const cors= require('cors');
var colors = require('colors/safe');

var app=express();

//import routers
var fabcar = require(path.join(__dirname, '/routes/fabcar'));


//use middlewares
// app.use(helmet());    //helmet sets headers for security

//   app.use(cors());


// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true }));
// parse application/json
app.use(bodyParser.json());


//use the api
app.use('/api/fabcar', fabcar);
   
const port = process.env.PORT || 2000;
 
var server=app.listen(port,function(){
    console.log(colors.yellow(`Server started at port : ${server.address().port}`));
})