import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'
import {AiFillCloud} from "react-icons/ai"
import {BsWind} from "react-icons/bs"
import {TbTemperature} from "react-icons/tb"


const CardWeather = ({ lon, lat }) => {

  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isCelsius, setIsCelsius] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [backImage, setBackImage] = useState({})

  useEffect(() => {
    if (lon) {
      const APIKey = "564e904c5fee35f6d14fc6c66346e49d"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

      axios.get(URL)
        .then(res => {
          setWeather(res.data)
          const temp = {
            celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
            farenheit: `${Math.round((res.data.main.temp - 273.15) * 9 / 5 + 32)} °F`
          }
          setTemperature(temp)
          setIsLoading(false)
          setBackImage({
            backgroundImage: `url(src/assets/img/${res.data.weather[0].icon}.jpg)`,
            height: '100vh',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          })
        })
        
        .catch(err => console.log(err))
    }
  }, [lat, lon])

  const handleClick = () => setIsCelsius(!isCelsius)

  if (isLoading) {
    return <LoadingScreen />
  } else {

    return (
      
      <div className="background-weather" style={backImage}>
      <article className='container-weather'>
        <h1 className='weather__title'>WEATHER APP</h1>
        <h2 className='weather__country'>{`${weather?.name}, ${weather?.sys.country}`}</h2>
        <div className='weather__box'>
          <div className="container-img">
          <img className='weather__img' src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
          </div>
          <div className='container-description'>
            <h3 className='weather__description'>&#34;{weather?.weather[0].description}&#34;</h3>
            <ul className='weather__feature'>
              <li className='weather__list'><BsWind className='icon-list'/> Winds Speed <span className='weather__data'>{weather?.wind.speed} m/s</span></li>
              <li className='weather__list'><AiFillCloud className='icon-list'/> Clouds <span className='weather__data'>{weather?.clouds.all} %</span></li>
              <li className='weather__list'><TbTemperature className='icon-list'/> Pressure <span className='weather__data'>{weather?.main.pressure} hPa</span></li>
            </ul>
          </div>
        </div>
        <h2 className='weather__temperature'>{isCelsius ? temperature?.celsius : temperature?.farenheit}</h2>
        <button className='weather__btn' onClick={handleClick}>{isCelsius ? "Change to °F" : "Change to °C"}</button>
      </article>
      </div>
      
    )
  }
}
export default CardWeather