import React, { useEffect } from 'react'
import countryservice from '../services/countrydata'


const CountryData = ({countryData,setCountryData,filteredData}) => {
    
    const {getCountryData} = countryservice

    useEffect(()=>{
        getCountryData(filteredData[0].name.common)
            .then((response)=>{
                setCountryData(response)
                console.log(response)
            })
            .catch(response=>{

            })
    },[])
    
    if(!countryData){
        return null
    }

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
    </div>
  )
}

export default CountryData