import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchNameValue, setNewSearchNameValue] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    let doesPersonExist = checkIfPersonExists()
    
    if (doesPersonExist) {
      console.log('does person exist', doesPersonExist)
      alert(`${newName} is already added to the phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1)
      }

      setPersons(persons.concat(personObject))
      setNewName('')
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
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
