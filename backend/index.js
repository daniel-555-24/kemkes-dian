const express = require('express');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const colors = require('colors');
const app = express();
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
const connectDB = require('./config/db');

const bodyParser = require('body-parser');
const port = 3107;
const {
  twitterRouter,
  twitterPremiumRouter,
  newsRouter,
  userProfileRouter,
  userRouter,
  twitterDianRouter
} = require('./router');

connectDB();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.enable('trust proxy');

app.get('/', (req, res) => {
  var idAddress = req.ip;
  console.log(idAddress); // Find IP Address
  res.status(200).send('<h1> Welcome to our API </h1>');
});

app.use('/api/v1/twitter', twitterRouter);
app.use('/api/v1/twitter-dian', twitterDianRouter);
app.use('/api/v1/twitter-premium', twitterPremiumRouter);
app.use('/api/v1/news', newsRouter);
app.use('/api/v1/userprofile', userProfileRouter);
app.use('/api/v1/user', userRouter);
// http://localhost:3107/api/v1/user/login
// http://localhost:3107/api/v1/user/register

app.use(errorHandler);

app.listen(process.env.PORT || port, () => {
  console.log(`Server running on port ${port} `);
});
