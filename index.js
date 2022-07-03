const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
require('dotenv').config()

const app = express();
app.use(cors())
app.use(express.static('public'));
app.use(express.json())

const db = mongoose.connection;

const port = process.env.PORT || 3030;
const password = process.env.DB_PASSWORD;
const username = process.env.DB_USERNAME;
const db_name = process.env.DB_NAME;


mongoose.connect(
  `mongodb+srv://${username}:${password}@digicraft-central.rjug2zb.mongodb.net/${db_name}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsInsecure: true
    // serverApi: ServerApiVersion.v1,
  }
);



db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.listen(port, () => console.log('Server started'));

const rsvpRouter = require('./routes/rsvp') 
app.use('/rsvp', rsvpRouter);