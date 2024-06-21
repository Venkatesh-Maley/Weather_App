import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from './ice.jpg'; 

const App = () => {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`)
      .then(response => response.json())
      .then(data => {
        const kelvin = data.main.temp;
        const celsius = kelvin - 273.15;
        setResult(`Temperature at ${city}: ${Math.round(celsius)}°C`);
        setCity("");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setResult('Error fetching data. Please try again.');
      });
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="card p-4">
          <h4 className="card-title text-center mb-4">Weather App</h4>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <input
                type="text"
                name="city"
                value={city}
                onChange={changeHandler}
                className="form-control"
                placeholder="Enter city"
              />
            </div>
            <div className="form-group mt-3 text-center">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Get Temperature
              </button>
            </div>
          </form>
          {result && (
            <div className="mt-3">
              <h2 className="text-center">{result}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
