import React, { useEffect } from 'react'
import countryservice from '../services/countryservices'
import weatherservice from '../services/weatherservices'

const CountryData = ({countryData,setCountryData,filteredData}) => {
    
    const {getCountryData} = countryservice
    const {getWeather} = weatherservice
    const {name,capitalInfo} = filteredData[0] 

    useEffect(()=>{
       
        getCountryData(name.common)
            .then((countryresponse)=>{
                return getWeather(capitalInfo.latlng[0],capitalInfo.latlng[1]).then(weatherresponse=>{
                        return {
                            countryresponse,
                            weatherresponse
                        }
                    }).catch(error=>{
                        console.log("weather network bad")
                    })
            })
            .then(response=>{
                const {countryresponse,weatherresponse} = response
                setCountryData(prev=>{
                    return {...weatherresponse,...countryresponse}
                })
            })
            .catch(response=>{
                console.log("couldn't fetch data")
            })
        console.log(countryData)

    },[])


    if(Object.keys(countryData).length === 0){
        return null
    }

    console.log(countryData)
    
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        <h1>{countryData.name.common}</h1>
        <div>
            <div>Capital: {countryData.capital}</div>
            <div> area: {countryData.area}</div>
        </div>
        <div>
            <h2>languages:</h2>
            <ul>{Object.values(countryData.languages).map((ele,index)=>{
                return <li key={index}>{ele}</li>
            })}
            </ul>
        </div>
        <div>
            <img src={countryData.flags.png} alt={countryData.flags.alt} />
        </div>
        <div>
            <h1>weather in {countryData.name.common}</h1>
            <div>temperature: {countryData.main.temp} </div>
            {<img src={`https://openweathermap.org/img/wn/${countryData.weather.icon}@2x.png`} alt={countryData.weather.description} />}
            <div>wind: {countryData.wind.deg} </div>
        </div>
    </div>
  )
}

export default CountryData