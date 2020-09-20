const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const authRoutes = require('./routes/auth-routes');
const cookieParser = require('cookie-parser');

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
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.use(authRoutes);

// cookies
app.get('/set-cookies', (req, res) => {
  // cookie store up to browser not close / by default maxAge = session
  // res.setHeader('Set-Cookie', 'newUser=true');

  res.cookie('newUser', false);
  // secure true for only https
  // httpOnly true for access only http not from js document.cookie 
  res.cookie('isEmployee', true,
    {
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      httpOnly: true
    });

  res.send('got the cookies');
})

app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.send(cookies);
})