# Weather Web Application

Created with React.js and Bootstrap, using GeoDB Cities API to fetch the city coordonates, and OpenWeather API for fetching the weather data.

# How To Run the App

\*\*NOTE: you need to have docker installed in order to run the command, if you don't have it you can download it from here: https://www.docker.com/products/docker-desktop/

1.  Open a window terminal.

2.  Change directory in the root folder of the project.

3.  Run the command:

        docker-compose up

4.  Open a browser and navigate to the localhost:3000

5.  Enjoy the app.

## App Functionality

On this application you can search a city and get it's weather forecast up to 5 days, also you can add the cities to your favorites list which are saved on the localstorage.

The application is wrapped in a Context Provider, where I wrote all the logic and functionality for:

- fetching the city from the search input, using axios
- fetching the weather data and storing it in a variable using the useState hook
- add and remove cities from favorites, implementing local storage to save the cities
- getting your current location in a useEffect hook and fetching the weather data of it

## Description

The app is made of 3 main components: Navbar, CurrentDayWeather, and WeeklyForecast, all of them inheriting the functions and variables from the context provider, used to fill in the DOM.

The Navbar includes the search bar and the favorites button, which open up a modal with a list of your favorites cities.

CurrentDayWeather show's the city name, country, weather description, an image describing the weather, current grades, feels like, wind and humidity. Also a 24h forecast with the grades specific to the hour .

WeeklyForecast show's the next 5 days weather with an image describing it.

The application has a background theme for each weather condition: clear sky day, clear sky night, cloudy, raining, lightstorm, snowing, windy, etc

Overall I really enjoyed making this project, it was a fun little one. Thank's Accesa for the opportunity!
