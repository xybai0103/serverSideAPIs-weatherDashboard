// WHEN user inputs a city and click search button (event listener)
  // THEN city name should be list in the search history as a clickable button
  // THEN city name should go into the 'city variable' and then the 'queryURL'
    // WHEN receiving response
      // 1. THEN data should be displayed within corresponding HTML elements
        // The data include:
          // Current:
            // City Name
            // Date in '9/13/2022' format (probably use dayjs)
            // Icon representation of weather conditions (sun, cloud, etc.)
            // Temp in ℉
            // Wind in MPH
            // Humidity in %
          // 5-Day Forecast:
            // Date in '9/13/2022' format (probably use dayjs)
            // Temp in ℉
            // Wind in MPH
            // Humidity in %
      // 2. THEN data should be stored in localStorage

// WHEN user click one of the searchHistory button in the list (event listner)
  // THEN data are presented again (get from localStorage, or use reload cache?)