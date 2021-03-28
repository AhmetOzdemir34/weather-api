import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';

const api = {
  key : "24e6732d739a08064aee546e1e81e86b",
  base : "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query,setQuery] = useState("");
  const [weather,setWeather] = useState({});

  function pressEnter(e){
    if(e.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        console.log(result);
        }
        );
      
    }
  }

  const createDate = (d) =>{
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January","February","March","April","May","June","July","August","September","October",
    "November","December"];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }
  return (
    <div className="main">
        <div className="search">
          <input type="text" onChange={(e)=> setQuery(e.target.value)} 
          onKeyPress={(e)=> pressEnter(e)} 
          placeholder="enter a city name"/>
        </div>
        <div className="date">{createDate(new Date())}</div>
        {typeof weather.main != "undefined" ?(<div className="w-holder">
          <h2 className="w-name">{weather.name}, {weather.sys.country}</h2>
          <h3 className="w-c">{Math.round(weather.main.temp-273.15)}°C</h3>
          <div className="extras">
          <h3 className="w-desc">DESCR: {weather.weather[0].description}</h3>
          <h3 className="hissedilen">Feels like: {Math.round(weather.main.feels_like-273.15)}°C</h3>
          <h3 className="min-deg">Min degree: {Math.round(weather.main.temp_min-273.15)}°C</h3>
          <h3 className="max-deg">Max degree: {Math.round(weather.main.temp_max-273.15)}°C</h3>
          </div>
        </div>) : ("")}
    </div>
  );
}

export default App;
