import "./weather.css"
import search_icon from '../assets/images/search.png'
import clear from '../assets/images/clear.png'
import clouds from '../assets/images/clouds.png'
import drizzle from '../assets/images/drizzle.png'
import humidity from '../assets/images/humidity.png'
import mist from '../assets/images/mist.png'
import rain from '../assets/images/rain.png'
import snow from '../assets/images/snow.png'
import wind from '../assets/images/wind.png'
import { useEffect } from "react"
import { useState , useRef } from "react"




const Weather = () => {

    const inputRef = useRef()
    const [weather , setWeather] = useState({
        humidity : null,
        wind : null,
        temperature: null ,
        location : "",
        icon : clear

});

    const allIcons  = {
        "01d": clear,
        "01n":clear,
        "02d":clouds,
        "02n":clouds,
        "03d":clouds,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow,
    }
 
    const search = async (city) => {

        if  (city === ""){
             alert("Enter City Name ")
             return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response  = await fetch(url);
            const data = await response.json();
            console.log(data);
            
            if(!response.ok) {
                alert(data.message);
                return;
                
            }

            const icon = allIcons[data.weather[0].icon] || clear
            const weatherData = {
                humidity: data.main.humidity,
                wind : data.wind.speed,
                temperature : Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            }
            setWeather(weatherData)
            localStorage.setItem('weather', JSON.stringify(weatherData))

            

        } catch (error) {
            setWeather(false)
            console.log("error in fetching data", error)
            
        }
    }
     
    useEffect ( () => {
        const savedWeather  = localStorage.getItem('weather')
        if (savedWeather) {
            setWeather(JSON.parse(savedWeather))

        } else {
             search("Bangalore")
        }
        
    },[])
  return (
    <div className="weather">
        <div className="search-bar">
            <input type="text" placeholder="search" ref={inputRef}/>
            <img src={search_icon} alt="searc bar"  onClick={() => search(inputRef.current.value)}/>
        </div>
        { weather ? <>
            <img src={weather.icon} alt="clear" className="weather-icon" />
        <p className="temperature">{weather.temperature}°C</p>
        <p className="city">{weather.location}</p>
        <div className="weather-data">
        <div className="col">
            <img src={humidity} alt="humidity" />
            <div>
                <p>{weather.humidity}</p>
                <span>Humidity</span>
            </div>

        </div>
        <div className="col">
            <img src={wind} alt="wind" />
            <div>
                <p>{weather.wind} km/h</p>
                <span>Wind Speed</span>
            </div>
            
        </div>

        </div>

            
        </> : <></>}
       
    </div>
  )
}

export default Weather