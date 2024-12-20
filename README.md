# Weather App (JavaScript)

This is a simple web application that fetches weather data from the OpenWeatherMap API and displays it to the user. Users can search for weather information by city name or use their current location.

## Features

*   Search for weather by city name, zip code, etc.
*   Get weather based on the user's current location (using Geolocation API).
*   Displays current weather conditions, temperature (in Celsius), "feels like" temperature, humidity, and wind speed.
*   Clear error handling and user feedback (loading messages, error messages).
*   Modern JavaScript using `async/await` and `try...catch`.
*   Responsive design.

## How to Use

1.  Clone or download the repository.
2.  Obtain an API key from OpenWeatherMap ([https://openweathermap.org/](https://openweathermap.org/)).
3.  Open `script.js` and replace `YOUR_OPENWEATHERMAP_API_KEY` with your actual API key.
4.  Open `index.html` in your web browser.
5.  Enter a location in the input field and click "Search" or click "Use My Location" to get the weather for your current location.

## Files

*   `index.html`: The main HTML file containing the structure of the app.
*   `style.css`: The CSS file for styling the app.
*   `script.js`: The JavaScript file containing the logic for fetching and displaying weather data.

## Code Explanation (script.js)

*   **`getWeather(location)`:** This asynchronous function fetches weather data from the OpenWeatherMap API. It handles both location strings (city names) and location objects (latitude and longitude). It also includes comprehensive error handling.
*   **`displayWeather(data)`:** This function takes the weather data from the API and updates the HTML to display the information.
*   **`displayError(message)`:** This function displays error messages to the user.
*   **Event Listeners:** Event listeners are attached to the search button and the "Use My Location" button to trigger the weather fetching process.

## API

This app uses the OpenWeatherMap API: [https://openweathermap.org/api](https://openweathermap.org/api)

## Future Improvements

*   Add more weather information (e.g., forecast, pressure, visibility).
*   Improve styling and user interface.
*   Implement more robust input validation.
*   Consider using a more advanced weather icon library.
*   Implement caching to reduce API calls.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to submit a pull request.
