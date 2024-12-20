// script.js
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const myLocationButton = document.getElementById('myLocationButton');
const weatherData = document.getElementById('weatherData');
const errorMessage = document.getElementById('error-message');

// Store the API key in a more secure way (if possible in your environment)
// For example, if using a backend, fetch it from the server
const apiKey = 'f4401e0b48fc1db68497eb86b1fcf77b';

async function getWeather(location) {
    try {
        errorMessage.style.display = 'none'; // Hide any previous errors
        weatherData.innerHTML = "<p>Loading...</p>"; // Display loading message

        let apiUrl;
        if (typeof location === 'string') {
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        } else if (typeof location === 'object' && location.latitude && location.longitude) {
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`;
        } else {
            throw new Error("Invalid location format.");
        }
        console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`); // More descriptive error
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        displayError(error.message);
    }
}

function displayWeather(data) {
    weatherData.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon" class="weather-icon">
        <p><strong>Conditions:</strong> ${data.weather[0].description}</p>
        <p><strong>Temperature:</strong> ${Math.round(data.main.temp)}°C</p>
        <p><strong>Feels Like:</strong> ${Math.round(data.main.feels_like)}°C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}

function displayError(message) {
    weatherData.innerHTML = "";
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim(); // Trim whitespace
    if (location) {
        getWeather(location);
    }
});

myLocationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        weatherData.innerHTML = "<p>Getting your location...</p>";
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getWeather({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            },
            (error) => {
                let errorMessage = "Error getting location.";
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "User denied the request for Geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "The request to get user location timed out.";
                        break;
                }
                displayError(errorMessage);
            }
        );
    } else {
        displayError('Geolocation is not supported by your browser.');
    }
});