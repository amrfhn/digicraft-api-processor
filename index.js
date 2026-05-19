const express = require("express")
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const cors = require('cors')
const mongoose = require("mongoose")
require('dotenv').config()

const app = express()
const compiler = webpack(webpackConfig)

// Enable webpack-hot-middleware
app.use(webpackHotMiddleware(compiler));

// Enable webpack-dev-middleware
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: 'errors-only',
  })
);

const defaultOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://digital-invite-202301.digicraft.link",
  "https://digital-invite-202401.digicraft.link",
  "https://digital-invite.digicraft.link",
];

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : defaultOrigins;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
}))

app.use(express.static('public'));
app.use(express.json())

const db = mongoose.connection;

const port = process.env.PORT || 3030;
const password = process.env.DB_PASSWORD;
const username = process.env.DB_USERNAME;
const db_name = process.env.DB_NAME;

mongoose.set("strictQuery", false);
mongoose.connect(
  `mongodb+srv://${username}:${password}@digicraft-central.rjug2zb.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=digicraft-central`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsInsecure: true
  }
);

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
app.listen(port, () => console.log(`Server started on port ${port}`));

/** Settings available routers for digicraft-api-processor DB **/
app.use('/api/rsvp', require('./routes/rsvp'));
app.use('/api/wish', require('./routes/wish'));

// Enable HMR
if (module.hot) {
  module.hot.accept();
}
