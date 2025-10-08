import { useState, useEffect } from 'react'
// import axios from 'axios'
import Filter from './components/Filter'
import { Country, CountryRow } from './components/Countries'
import countryService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchedCountry, setSearchedCountry] = useState('')
  const [countryView, setCountryView] = useState('')
  const [countryViewToggle, setCountryViewToggle] = useState(false)

  // show countries depending on input given
  const countriesToShow = countries.filter((country) => country.name.common.toLowerCase().includes(searchedCountry.toLowerCase()))

  const countryViewToShow = countries.filter((country) => country.name.common.toLowerCase().includes(countryView.toLowerCase()))

  // get all data from server
  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response)
      })
      .catch(error => {
        console.log("error fetching countries: ", error)
      })
  }, [])

  const handleInputChange = (event) => {
    setCountryView('')
    setSearchedCountry(event.target.value)
  }

  const handleCountryViewOnClick = (name) => {
    setCountryView(name)
    setSearchedCountry('')
    console.log('country view: ', countryView)
  }

  const contentToShow = () => {
    if (searchedCountry === '' && countryView === '') {
      return <p></p>
    } else if (searchedCountry !== '' && countryView === '') {
      return <Country countries={countriesToShow} onClick={handleCountryViewOnClick} />
    } else if (countryView !== '') {
      return (
        <CountryRow 
                    name={countryViewToShow[0].name.common}
                    capital={countryViewToShow[0].capital}
                    area={countryViewToShow[0].area}
                    languages={countryViewToShow[0].languages}
                    flag={countryViewToShow[0].flags.png}
                    latlng={countryViewToShow[0].capitalInfo.latlng}
        />
      )
    }
  }

  return (
    <div>
      <Filter 
        text="find countries"
        value={searchedCountry}
        onChange={handleInputChange}
      />
      <div>
        {contentToShow()}
      </div>
    </div>
  )
}

        // {searchedCountry === ''
        //   ? <p>nothing</p>
        //   : <Country countries={countriesToShow} onClick={handleCountryViewOnClick} />
        // }
export default App
