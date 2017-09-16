const express = require('express');
//native node libary, working with low level of http request
const http = require('http');
const bodyParser = require('body-parser');
//logging framework
const morgan = require('morgan');
const cors = require('cors');


//Routes
userRoutes = require('./routes/userRoutes');
commentRoutes = require('./routes/commentRoutes');
postRoutes = require('./routes/postRoutes');


//set up express
const app = express();

// cros OPTIONS
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//mongodb
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
if(process.env.NODE_ENV !== 'test'){
  //const mongolab = 'mongodb://yiwengong:yiwengong@ds151062.mlab.com:51062/instagrammer_packed';
  //const localdb = 'mongodb://localhost/Instagrammer_packed';
  //mongoose.connect('mongodb://yiwengong:yiwengong@ds151062.mlab.com:51062/instagrammer_packed');
  mongoose.connect('mongodb://localhost/Instagrammer_packed');
}

// App Setup
// middlewares
app.use(morgan('combined')); //for debugging
app.use(bodyParser.json());
app.use(cors());

// static files
app.use('/posts', express.static(__dirname + '/../public/posts'));
app.use('/avatar', express.static(__dirname + '/../public/avatar'));

// Routes
userRoutes(app);
commentRoutes(app);
postRoutes(app);

// error from mongodb
app.use((err,req,res,next) =>{
  res.status(422).send({error:err.message});
});

// Server Setup
const port = process.env.PORT || 3090;
//Create a http sever that knows how to recieve request, and anything that comes in
//go ahead and forward it onto oure express application app.
const server = http.createServer(app);
server.listen(port);
console.log('Sever listening on:', port);

module.exports = app;
