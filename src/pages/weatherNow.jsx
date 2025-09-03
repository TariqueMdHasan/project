import { useState } from "react";
import axios from "axios";

function WeatherNow() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [enter, setEnter] = useState(false);
  const [loading, setLoading] = useState(false)

  const getWeatherData = async () => {
    if (!city) {
      setEnter(true);
      return;
    }
    try {
      setLoading(true)
      setEnter(false);
      setError("");

      const result = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        { params: { name: city } }
      );

      if (!result.data.results || result.data.results.length === 0) {
        setError("City not found");
        return;
      }

      const { latitude, longitude, name, population, country } =
        result.data.results[0];

      const weatherFetch = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude,
            longitude,
            current_weather: true,
            timezone: "auto",
            daily: "temperature_2m_max,temperature_2m_min,precipitation_sum",
          },
        }
      );

      setWeatherData({
        longitude,
        latitude,
        city: name,
        population,
        country,
        forecast: weatherFetch.data.daily,
        temperature: weatherFetch.data.current_weather.temperature,
        time: weatherFetch.data.current_weather.time,
        winddirection: weatherFetch.data.current_weather.winddirection,
        windspeed: weatherFetch.data.current_weather.windspeed,
        temperatureUnit: weatherFetch.data.current_weather_units.temperature,
        winddirectionUnit:
          weatherFetch.data.current_weather_units.winddirection,
        windspeedUnit: weatherFetch.data.current_weather_units.windspeed,
        timezone: weatherFetch.data.timezone,
      });
      console.log(weatherFetch.data);

    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }finally{
        setError('')
        setEnter(false)
        setLoading(false)
    }
  };



  return (
    <div className="w-full min-h-screen relative bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col items-center p-6">
      <div className="w-full h-40 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mt-5 mb-6 lg:mt-3">
          🌤️ Weather App
        </h1>

        <form 
            action="submit"
            className="flex gap-2 mb-1"
            onSubmit={(e) => {
                e.preventDefault();
                getWeatherData();
            }}
        >
          <input
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="bg-yellow-400 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition cursor-pointer"
          >
            Search
          </button>
        </form>
        {enter && (
          <p className="text-red-200 text-sm mb-6">Please enter a city</p>
        )}
        {error && <p className="text-red-200 text-sm mb-6">{error}</p>}
      </div>

      <div className="flex-1 w-full overflow-y-auto relative flex flex-col items-center gap-2 ">
        {loading && (<p className="text-white mt-4">Loading...</p>)}
        {weatherData && (
          <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md lg:w-8/12 text-gray-800">
            <h2 className="text-2xl font-bold mb-4">
              {weatherData.city}, {weatherData.country}
            </h2>
            <section className="lg:flex justify-between">
                <section>
                    <p className="mb-2">
                    <span className="font-bold">Population:</span> {weatherData.population || "N/A"}
                    </p>
                    <p className="mb-2">
                    <span className="font-bold">Temperature:</span> {weatherData.temperature}
                    {weatherData.temperatureUnit}
                    </p>
                    <p className="mb-2">
                    <span className="font-bold">Wind Speed:</span> {weatherData.windspeed}
                    {weatherData.windspeedUnit}
                    </p>
                </section>
                <section>
                    <p className="mb-2">
                    <span className="font-bold">Wind Direction:</span> {weatherData.winddirection}
                    {weatherData.winddirectionUnit}
                    </p>
                    <p className="mb-2"><span className="font-bold">Timezone:</span> {weatherData.timezone}</p>
                </section>
            </section>
            <p className="mb-2">
              <span className="font-bold">Geographical Location:</span> {weatherData.longitude},
              {weatherData.latitude}
            </p>
          </div>
        )}
        {weatherData && weatherData.forecast && (
          <div className="mt-6 relative flex flex-col justify-center items-center">
            <h3 className="text-xl font-bold mb-2 text-white relative">
              7-Day Forecast
            </h3>
            <div
              className="gap-4 flex w-full flex-wrap items-center justify-center"
            >
              {weatherData.forecast.time.map((day, index) => (
                <div
                  key={day}
                  className="bg-gray-100 rounded-lg p-4 text-center w-36 shadow"
                >
                  <p className="font-semibold">{day}</p>
                  <p>Max: {weatherData.forecast.temperature_2m_max[index]}°C</p>
                  <p>Min: {weatherData.forecast.temperature_2m_min[index]}°C</p>
                  <p>
                    Rain: {weatherData.forecast.precipitation_sum[index]} mm
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherNow;
