// import React, { useEffect, useState } from "react";
// import axios from "axios"; 

// function App() {
//   const [weatherData, setWeatherData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [city, setCity] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission

//     const fetchApi = async (city) => {
//       setIsLoading(true);
//       setError(""); // Clear any previous errors
//       try {
//         const res = await axios.get(`https://api.weatherapi.com/v1/current.json?key=5b07293f7dc4436c961145729250402&q=${city}`);
//         console.log(res.data)
//         setWeatherData(res.data); 
//       } catch (err) {
//         setError("Error fetching data. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (city) {
//       fetchApi(city);
//     }
//   };
  

//   return (
//     <div>
//          <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter the city name"
//           required
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//         />
//         <button type="submit">Search</button>
//       </form>
//       {isLoading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//        {weatherData && (
//         <div>
//            <WeatherCards/>
//         </div>
//        )}
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";
import axios from "axios";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get(
       `https://api.weatherapi.com/v1/current.json?key=5b07293f7dc4436c961145729250402&q=${city}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("Failed to fetch weather data");
      alert("Failed to fetch weather data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchWeather();
        }}
      >
        <input
          type="text"
          placeholder="Enter the city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading data…</p>}
      {error && <p>{error}</p>}

      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;

