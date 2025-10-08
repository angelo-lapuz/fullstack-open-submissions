import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

export const CountryRow = ({ name, capital, area, languages, flag, latlng}) => {

    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const [lat, lon] = latlng

        weatherService
            .getWeather(lat, lon)
            .then(response => {
                setWeather(response)
            })
            .catch(error => {
                console.log('problem getting weather')
            })
    }, [latlng])
   
    console.log(weather)
    return (
        <div>
            <h1>{name}</h1>
            <p>Capital {capital}</p>
            <p>Area {area}</p>
            <h1>Languages</h1>
            <ul>
                {Object.values(languages).map(language => (
                    <li>{language}</li>
                ))}
            </ul>
            <img src={flag} alt={`Flag of ${name}`}/>
            <h1>Weather in {capital}</h1>
            {weather ? (
                <>
                    <p>Temperature {weather.main.temp}</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                    <p>Wind {weather.wind.speed}m/s</p>                
                </>

            ) : (
                <p>Loading Weather</p>
            )
        }


        </div>
    )
}

export const Country = ({ countries, onClick }) => {

    let content
    if (countries.length > 1 && countries.length <= 10) {
        content = countries.map(country => (
                <>
                    <p>{country.name.common}</p>
                    <button onClick={() => onClick(country.name.common)}>View</button>
                </>
        ))
    } else if (countries.length > 10) {
        content = <p>Too many matches, specificy another filer</p>
    } else if (countries.length === 1) {
        content = <CountryRow 
                    name={countries[0].name.common}
                    capital={countries[0].capital}
                    area={countries[0].area}
                    languages={countries[0].languages}
                    flag={countries[0].flags.png}
                    latlng={countries[0].capitalInfo.latlng}
        />
    }

    return (
        <>
            {content}
        </>
    )
}

export default { Country, CountryRow }