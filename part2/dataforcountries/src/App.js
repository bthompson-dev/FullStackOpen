import { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const Countries = ({ search, countries}) => {

if (search === '') {
   return <div></div>;
} else {
  let filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()));

  if ( filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if (filteredCountries.length === 1) {
    let country = filteredCountries[0];
    return <Country country={country} display={true}/>
  } else {
    return (
      <div>
        <ul>
          {filteredCountries.map(country => (
            <div key={country.name.common}>
            <li>{country.name.common}</li>
            <ShowButton country={country}/>
            </div>
          ))}
        </ul>

      </div>
    );
  }

}
}



const Country = ({country, display}) => {

if (display) {
          return (
            <div>
              <h1>{country.name.common}</h1>

              <p>capital {country.capital}</p>
              <p>area {country.area}</p>

              <h3>languages:</h3>

              <ul>
                {Object.values(country.languages).map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>

              <img src={country.flags.png} alt={country.name.common}></img>
              <Forecast country={country} capital={country.capital} />
            </div>
          );
} else {
  return <div></div>
}
}

const Forecast = ({ country, capital }) => {

const [forecast, setForecast] = useState("");

useEffect(() => {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`
    )
    .then((response) => {
      setForecast(response.data);
    });
}, [country.capitalInfo.latlng]);

if (forecast !== '') {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>temperature {forecast.main.temp}</p>
        <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt=''></img>
        <p>wind {forecast.wind.speed} m/s</p>
      </div>
    );
} else {
  return <div></div>
}
};



const ShowButton = ({country}) => {

  const [display, setDisplay] = useState(false);

  const handleClick = () => {
      setDisplay(!display)
  }

  return (
    <div>
    <button onClick={handleClick}>
      show
    </button>
    <Country country={country} display={display} />
    </div>
  )
}

function App() {

  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState('');

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  return (
<div>
  find countries <input value={search} onChange={handleSearchChange}/>
  <Countries search={search} countries={countries}/>
</div>
  );
}

export default App;
