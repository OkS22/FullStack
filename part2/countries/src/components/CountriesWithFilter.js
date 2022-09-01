import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Languages = ({languages}) => {
  //console.log(languages)
  return (
     <ul>
     {Object.entries(languages).map(([key,val]) => (
       <li key={key}>{key}: '{val}'</li>
     ))}
    </ul>
  )
  }

const Flag = ({imagelink}) => {
  if (imagelink.length>0) {
    return <img src={`${imagelink}`}></img>
  } 
  }

const Weather = ({city,countryCode}) => { 
  const [dataW, setDataW] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  const apiCall = 'https://api.openweathermap.org/data/2.5/weather?q='
    +city+','+countryCode+'&appid='+api_key+'&units=metric'
  //console.log('api',api_key,apiCall)
  useEffect(() => {
    axios
      .get(apiCall)
      .then(response => {
      console.log('response',response)
      setDataW(response.data)
      })
      .catch(error => {
      alert('Something is wrong... Try again!')
      })
    }, [])
    //console.log('dataW',dataW);
    let myString = JSON.stringify(dataW);
    if (myString!=='{}') {
      const imagelink = 'http://openweathermap.org/img/wn/'+dataW.weather[0].icon+'@2x.png'
      return (
            <div>  
              <h3> Weather in {dataW.name} now</h3>
              <p>temperature {dataW.main.temp} Celcius</p>
              <p>humidity {dataW.main.humidity} %</p>
              <p>wind {dataW.wind.speed} m/s</p>
              <p><img src={`${imagelink}`}></img>
              {dataW.weather[0].description}</p>
            </div>
          )
    }else{
      return (
        <div>  
          <h3> Weather in </h3>
          <p> no data {myString }</p>
        </div>
      )      
    }                 
}

const CountriesWithFilter = ({countries,newFilter}) => {
  let countriesToShow =
      (newFilter.length>0)
      ? countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()) )
      : countries

      if (countriesToShow.length==1) { 
        return (
          <div>
            <h2> {countriesToShow[0].name.common} ({countriesToShow[0].cca2}) </h2>
            <p>capital: {countriesToShow[0].capital}</p>
            <p>area: {countriesToShow[0].area}</p>
            <h4>languages</h4>
            <Languages languages = {countriesToShow[0].languages}/>
            <Flag imagelink = {countriesToShow[0].flags.png}/>
            <Weather 
              city={countriesToShow[0].capital}
              countryCode={countriesToShow[0].cca2}
            />         
          </div>
        )
      }

      if (countriesToShow.length>10 && newFilter.length>0) {
        let countriesToShow = 'Too many matches, specify another filter'
        return (
          <li key={countriesToShow}>
            {countriesToShow}</li>)
      } else {
        return (
          countriesToShow.map( country => 
          <li key={country.ccn3+country.cioc}>
            {country.name.common} {country.cca2} </li>)
        )
      }
}

export default CountriesWithFilter