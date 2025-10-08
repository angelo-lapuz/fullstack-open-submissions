import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons/'

const Notification = ({ message, fontColour }) => {
  const errorStyle = {
    color: fontColour,
    backgroundColor: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null) {
    return null
  }

  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchNameValue, setNewSearchNameValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [fontColour, setFontColour] = useState('')

  // axios gets data from server
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let doesPersonExist = checkIfPersonExists()
    
    if (doesPersonExist) {
      console.log('does person exist', doesPersonExist)
      if (window.confirm(`${newName} is already added to phonebook,
        replace the old number with a new one?`)) {
        updatePerson(newName)
        setErrorMessage(
          `Changed number of ${newName}`
        )
        setFontColour('green')
        setTimeout(() => {
          setErrorMessage(null)
          setFontColour('')
        }, 5000)
      } 
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
        })

        setErrorMessage(
          `Added ${personObject.name}`
        )
        setFontColour('green')
        setTimeout(() => {
          setErrorMessage(null)
          setFontColour('')
        }, 5000)
    }

  }

  const updatePerson = (name) => {
    const personToUpdate = persons.find(person => person.name === name)
    const changedNumber = {...personToUpdate, number: newNumber}

    personService
      .update(personToUpdate.id, changedNumber)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id === personToUpdate.id ? returnedPerson : person))
      })
      .catch(error => {
        setErrorMessage(
          `Information of ${name} has already been removed from server`
        )
        setFontColour('red')
        setTimeout(() => {
          setErrorMessage(null)
          setFontColour('')
        }, 5000)
      })
  }

  const deletePerson = (id) => {
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        alert(`Could not delete person`)
      })
  }

  const confirmDeletingPerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      deletePerson(id)
    } 
  }

  const checkIfPersonExists = () => {
    let exists = false
    persons.map(person => {
      if (person.name === newName) {
        exists = true
      }
    })
    return exists
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNewSearchNameValueChange = (event) => {
    console.log(event.target.value)
    setNewSearchNameValue(event.target.value)
  }

  const personsToShow = newSearchNameValue === ''
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(newSearchNameValue.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} fontColour={fontColour}/>
      <div>
        <Filter 
          text='filter shown with'
          value={newSearchNameValue} 
          onChange={handleNewSearchNameValueChange}  
        />
      </div>
      <h2>Add a new entry</h2>
      <PersonForm 
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={confirmDeletingPerson}/>
    </div>
  )
}

export default App
