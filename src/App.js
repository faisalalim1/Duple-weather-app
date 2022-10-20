import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";
import './App.css';

function App() {



  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState([])
  console.log(data)


  const getWetherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = `http://api.weatherstack.com/current?access_key=9fbd5ab5e0d66ff4d78216405925bcaa&query=${cityName}`
    axios.get(apiURL).then((res) => {
      // console.log("response", res.data)
      setData(res.data)
      
    }).catch((err) => {
      console.log("err", err)
    })
  }

  const handleChangeInput = (e) => {
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch = () => {
    getWetherDetails(inputCity)
  }


  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control"
            value={inputCity}
            onChange={handleChangeInput} />
          <button className="btn btn-primary" type="button"
            onClick={handleSearch}
          >Search</button>
        </div>
      </div>

      {Object.keys(data).length > 0 &&
        <div className="col-md-12 text-center mt-5">

          <div className="shadow rounded wetherResultBox">
          <h5 className="weathorCity">{data.location.name}</h5>
            <img className="weatherIcon"src={data.current.weather_icons}/>
             
            <h2 className="weatherTemp">{data.current.temperature}°C</h2>
            <h5 className="localTime">Time: {data.location.localtime}</h5>
            <h5 className="humidity">Humidity:{data.current.humidity}g.m-3</h5>
          </div>
        </div>
      }

    </div>
  );
}

export default App;
