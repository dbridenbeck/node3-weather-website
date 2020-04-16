const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getGeocode = require('./utils/getGeocode.js');
const getWeather = require('./utils/getWeather.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Darren Bridenbeck'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About",
    name: "darren bridenbeck"
  });
});

app.get('/help', (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "Uh oh, looks like you need some help.",
    name: "darren bridenbeck",
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address."
    })
  }

  getGeocode(req.query.address)
    .then(coordinateInfo => getWeather(coordinateInfo))
    .then(({ forecast, location } = {}) => {
      return res.send({
        forecast,
        location,
        address: req.query.address
      })
    })
    .catch(error => res.send({error}));
});

app.get('/help/*', (req,res) => {
  res.render("404", {
    title: "Page Not Found",
    name: "darren bridenbeck",
    message: "Can't find that HELP page, need a banana?"
  })
});

app.get('*', (req, res) => {
  res.render("404", {
    title: "Page Not Found",
    name: "darren bridenbeck",
    message: "Can't find that page, need a banana?"
  });
});

app.listen(port, () => {
  console.log(`Server running on ${port}.`);
});