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

//mongodb
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
if(process.env.NODE_ENV !== 'test'){
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
