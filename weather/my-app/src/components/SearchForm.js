import React from "react"
import { token } from '../settings';
import axios from 'axios'
import WeatherDiv from "./WeatherDiv";

const url = 'https://api.openweathermap.org/data/2.5/weather'

export default class SearchForm extends React.Component{
constructor(props){
  super(props)
  this.init()
}

  state = {
    city: '',
    temp: ''
  }

  init(){
    this.handleClick = this.initSearch().bind(this)
  }

  initSearch = () => {
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
            this.setState({temp:res.data})
            return
          } 
          this.setState({temp:{name: 'failed to find result'}})
          
      }
    return onSearch
  }

  render(){
    const {temp, city} = this.state
    return (
      <div className="weatherWrapperDiv">
        <label>
          <input
          className="searchBar"
            type="text"
            placeholder="insert city name"
            onChange={(e => this.setState({city:e.target.value}))}
          />
          <button className="weatherBtn" onClick={e => {this.handleClick(city)}}>
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
  
}
