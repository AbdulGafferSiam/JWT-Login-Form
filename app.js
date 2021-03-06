const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const authRoutes = require('./routes/auth-routes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/auth-middleware');

const app = express();

// middleware
app.use(express.static('public'));
// It takes any json data comes along with a request
// and it passes it into a js object for us
// so we can use it inside the code by request handler (req.body)
app.use(express.json());
app.use(cookieParser());


// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = keys.mongodb.MongoURI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
// to denote every route use *
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

app.use(authRoutes);

