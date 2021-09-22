import React, { useState } from 'react'
import './App.css';

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
      <div className="w-full" style={{textAlign:"center"}}>
          <div className="search">
            <input type="text" onChange={(e)=> setQuery(e.target.value)} 
            onKeyPress={(e)=> pressEnter(e)} 
            placeholder="enter a location name"/>
          </div>
          
          <div className="date">{createDate(new Date())}</div>
      </div>

      <div className="w-full" style={{textAlign:"center"}}>
        {typeof weather.main != "undefined" ? (<div className="w-holder">
          <h2 className="w-name">{weather.name}, {weather.sys.country}</h2>
          <div className="degree">{Math.round(weather.main.temp-273.15)}°C</div>
          <div className="extras">
            <div className="desc">Description : {weather.weather[0].description}</div>
            <div className="alt-flex">
              <div className="divo" style={{backgroundColor:"rgba(0,0,255,.5)", marginRight:".2rem"}}>MIN <br/> {Math.round(weather.main.temp_min-273.15)}°C</div>
              <div className="divo" style={{backgroundColor:"rgba(255,0,0,.5)", marginLeft:".2rem"}}>MAX <br/> {Math.round(weather.main.temp_max-273.15)}°C</div>
            </div>
          </div>
        </div>): <h1>Not found!</h1>}
      </div>
    </div>
  );
}

export default App;
