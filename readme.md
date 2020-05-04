# Weather App
- Created by Darren Bridenbeck as part of [The Complete Node.js course](https://www.udemy.com/course/the-complete-nodejs-developer-course-2/) on Udemy

# Description
- This is a website that allows you to submit a location and the page will update to provide the weather and confirm the location that was used (e.g. - if you type in "portland" it will confirm the location used was Portland, Oregon, not Portland, Maine).

# Specifications
## app.js config
- Setup express
- Setup handlebars
- Setup static directory

## app.js routes
#### GET /
- Renders index.hbs view with "title" and "name" variables

#### GET /about
- Renders about.hbs view with "title" and "name" variables

#### GET /help
- Renders about.hbs view with "title", "name", and "message" variables

#### GET /weather
- address must be submitted as a query parameter (e.g. /weather?address=portland)
- uses getGeocode() to get coordinates for the address, then getWeather() to return the forecast and location

#### GET /help/*
- Provides a custom 404 page with a message letting user know that the help article you are looking for cannot be found. Renders 404.hbs with "title", "name" and "message" variables.

#### GET /*/
- Renders 404.hbs with "title", "name", and "message" variables

## utils

### getGeocode
- take address as argument
- pass it in as a query parameter to [mapbox](https://www.mapbox.com/)
- use axios to make get request and return an object with the following structure:
```
{
 latitude: "latitude,longitude",
 name: "location name"
}
```

### getWeather
- take object as an argument with the following structure:
```
{
 latitude: "latitude,longitude",
 name: "location name"
}
```
- use location as query parameter in [weatherstack.com](http://weatherstack.com/) api call
- return current weather from weatherstack as an object with the following structure:
```
{
  forecast: `${current.weather_descriptions}. Currently ${current.temperature} degrees with a ${current.precip} chance of rain.`,
  location: name
}
```

# Setup/Install Requirements
- install project
- run 'npm install' while in project root to install dependencies
- run 'npm run dev' to run server
- visit localhost:3000 to view site

# Known Bugs
- none

# Support and Contact Details
- Contact Darren Bridenbeck at darren.bridenbeck@gmail.com

# Technologies Used
- Express
- [hbs](https://handlebarsjs.com/) for html templating
- [axios](https://www.npmjs.com/package/axios) to make http requests