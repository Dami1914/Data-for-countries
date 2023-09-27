import { useEffect, useState } from 'react'
import './App.css'
import countryservice from './services/countryservices'
import Countries from './components/Countries'
import CountryData from './components/CountryData'

function App() {

  const {getCountryData,getAll} = countryservice

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("")
  const [notifState,setNotifState] = useState({})
  const [countryData,setCountryData] = useState({})
  
  const filteredData = countries.filter((ele)=> ele.name.common.toLowerCase().includes(country.toLowerCase()))
  console.log(filteredData.length)

  function handleChange(event){
      const {value} = event.target
      setCountry(value)
  }

  function handleClick(country){
      setCountry(country)
  }

  

  useEffect(()=>{
    getAll()
      .then(response=>{
        setCountries(response)
      })
      .catch((response)=>console.log(response.message))
  },[])
 
  return (
    <>
      <form>
        find countries: <input type="text"  placeholder='country' value={country} onChange={handleChange} />
      </form>
      <ul>
        {
          country === "" || country === " " ? "" : 
            (filteredData.length <= 10 ? 
              (filteredData.length !== 1? filteredData.map((ele)=>{
              return <Countries handleClick={()=>handleClick(ele.name.common)} names={ele.name.common} key={ele.cca2}/>
            }):
              <CountryData filteredData={filteredData} countryData={countryData} setCountryData={setCountryData} />
            ): "Too many matches,specify another filter")
        }
      </ul>
    </>
  )
}

export default App
