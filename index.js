const express = require("express");
const mongoose = require("mongoose");
const http = require('http');
require('dotenv').config()

const app = express();
app.use(express.static('public'));
app.use(express.json())

const httpServer = http.createServer(app);

const db = mongoose.connection;

const port = process.env.PORT || 3030;
const http_port = process.env.HTTP_PORT || 8000;
const password = 'Farhan94';

mongoose.connect(
  `mongodb+srv://digicraftAdmin:${password}@digicraft-central.rjug2zb.mongodb.net/rsvpListing?retryWrites=true&w=majority`,
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
httpServer.listen(http_port);

const rsvpRouter = require('./routes/rsvp')
app.use('/rsvp', rsvpRouter);