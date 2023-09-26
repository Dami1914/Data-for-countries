import { useEffect, useState } from 'react'
import './App.css'
import countryservice from './services/countrydata'
import Countries from './components/Countries'

function App() {

  const {getCountryData,getAll} = countryservice

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("")
  const [notifState,setNotifState] = useState({})
  
  const filteredData = countries.filter((ele)=> ele.name.common.toLowerCase().includes(country))
  console.log(filteredData.length)

  function handleChange(event){
      const {value} = event.target
      setCountry(value)
  }

  

  useEffect(()=>{
    getAll()
      .then(response=>{
        setCountries(response)
      })
      .catch((response)=>console.log(response))

  },[])
 
  return (
    <>
      <form>
        find countries: <input type="text"  placeholder='country' value={country} onChange={handleChange} />
      </form>
      <ul>
        {
          country === "" || country === " " ? "" : 
            (filteredData.length <= 10 ? filteredData.map((ele)=>{
              return <Countries names={ele.name.common} key={ele.cca2}/>
            }): "Too many matches,specify another filter")
        }
      </ul>
    </>
  )
}

export default App
