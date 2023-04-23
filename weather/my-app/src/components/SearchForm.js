import React from "react"
import { useState } from 'react';
import { token } from '../settings';
import axios from 'axios'
import WeatherDiv from "./WeatherDiv";

const url = 'https://api.openweathermap.org/data/2.5/weather'

function SearchForm(props) {
  const [city, setCity] = useState('')
  const [temp, setTemp] = useState('')
  const handleClick = initSearch(setTemp)
  return (
    <div className="weatherWrapperDiv">
      <label>
        <input
        className="searchBar"
          type="text"
          placeholder="insert city name"
          onChange={e => setCity(e.target.value)}
        />
        <button className="weatherBtn" onClick={e => {handleClick(city)}}>
          Search
        </button>
      </label>
    {temp && <WeatherDiv 
                name={`${temp.name}, ${temp.sys ? temp.sys.country : ''}`}
                temp={temp.main ? temp.main.temp : ''}
                desc={temp.weather ? temp.weather[0].description : ''}
                feelsLike={temp.main ? temp.main.feels_like : ''}
              />}
    </div>
  )
}

const initSearch = (setTemp) => {
  const params = {'units': 'metric', 'appid': token}
  const onSearch = async (cityName) => {
        params.q = cityName
        let res
        try {
          res = await axios.get(url, {params:params})
        } catch {
          res = {status: 'failed'}
        }
        if (res.status.toLocaleString()[0] === '2'){
          setTemp(res.data)
          return
        } 
          setTemp({name: 'failed to find result'})
        
    }
  return onSearch
}

export default SearchForm