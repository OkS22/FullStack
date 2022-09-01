import { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesWithFilter from './components/CountriesWithFilter'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log(response.data[0])
        setCountries(response.data)
      })
  }, [])

  const [newFilter, setNewFilter] = useState('')
  const handleFilterChange = (event) => {setNewFilter(event.target.value)}
  
  return (
    <div>
      <h1>Countries</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h4>list (with filter)</h4>
      <CountriesWithFilter countries ={countries} newFilter ={newFilter} /> 
    </div>   
  )
}

export default App;
