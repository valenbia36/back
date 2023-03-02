const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.set("strictQuery", false);
mongoose.connect('mongodb://0.0.0.0:27017/familias', {useNewUrlParser: true,useUnifiedTopology: true,
family:4});
const db = mongoose.connection;
//brew services restart mongodb-community si tengo Err
db.on('error',(error)=> console.error(error));
db.once('open', ()=> console.log('Connected to Database'));

const familiasRouter = require('./routes/familias');
app.use('/familias', familiasRouter);

app.listen(4000,() => console.log("Server started"));
