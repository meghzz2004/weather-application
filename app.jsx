function WeatherApp() {
  const [city, setCity] = React.useState('');
  const [weatherData, setWeatherData] = React.useState(null);
  const [error, setError] = React.useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = () => {
    const apiKey = '2fe132076b46c3ed0c73076746d16fde'; // Get your API key from a weather API provider
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          // console.log(data);
          setWeatherData(data);
          setError(null);
        } else {
          setWeatherData(null);
          setError('City not found');
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
        setError('Error fetching weather data');
      });
  };

  return (
    <div className="container">
      <header>
       <h1>Weather Forecast</h1>
      </header>
      <div className="content">
        <h2>Get your local weather</h2>
        <input type="text" value={city} onChange={handleInputChange} placeholder="Enter city name" />
        <button onClick={fetchWeather}>Get Weather</button>
        {error && <p>{error}</p>}
        {weatherData && (
          <div className="renderedData">
            <h3 className="weather-info">{weatherData.name}, {weatherData.sys.country}</h3>
            <p className="weather-info">{weatherData.weather[0].description}</p>
            <p className="weather-info">Temperature: {weatherData.main.temp}°C</p>
            <p className="weather-info">Humidity: {weatherData.main.humidity}%</p>
          </div>
        )}
      </div>
    </div>
  );
  
}

ReactDOM.render(<WeatherApp />, document.getElementById('root'))