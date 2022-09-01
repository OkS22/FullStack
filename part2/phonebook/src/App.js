import { useState, useEffect } from 'react'

import Person from './components/Person'
import Filter from './components/Filter'
import AddNewRecord from './components/AddNewRecord'
import Notification from './components/Notification'

import noteService from './services/notes'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
 
  useEffect(() => {
    noteService
      .getAll()
      .then(allNotes => {
        setPersons(allNotes)
      })
  }, [])
  
  const [errorMessage, setErrorMessage] = useState(['some error happened...','red'])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => { setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setNewFilter(event.target.value)}

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    // check for existing
    let checkAll = false
    let foundPerson
    
    persons.forEach(person => {
      if (objectsEqual(person.name, personObject.name)) {
        //alert(`${newName} is already added to phonebook, look at ${person.name}`)
        checkAll = true
        foundPerson = person
        console.log('found',foundPerson)
      }
    })

    console.log('checkAll', checkAll)
    if (!checkAll) { // not found, adding new  
      noteService
        .create(personObject)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))
          setNewName('')
          setNewNumber('')
          setErrorMessage(
            [`Added '${returnedNote.name}' `,'green']
          )
          setTimeout(() => {
            setErrorMessage([null,''])
          }, 5000) // 5 sec
      })   
    }else { //found
      if (window.confirm(`'${foundPerson.name}' is already added to phonebook,
        replace the old number with a new one?`)) {       
        noteService
          .update(foundPerson.id, personObject)
          .then(returnedNote => {
            const newList = persons.map(n => 
              (n.id !== returnedNote.id) 
              ? n 
              : returnedNote)
            setPersons(newList)
            setNewName('')
            setNewNumber('')
            setErrorMessage(
              [` '${returnedNote.name}'- phonenumber is changed to '${returnedNote.number}' `,'green']
            )
            setTimeout(() => {
              setErrorMessage([null,''])
            }, 5000) 
          })
          .catch(error => {
            setErrorMessage(
              [`Information of '${foundPerson.name}' has already been removed from server`,'red']
            )
            setTimeout(() => {
              setErrorMessage([null,''])
            }, 5000) 
            setPersons(persons.filter(n => n.id !== foundPerson.id))
          })
        }
    }
  }

  const deletePerson = id => {
    const person = persons.find(n => n.id === id) 
    if (window.confirm(`Delete '${person.name}'?`)) {       
      noteService
        .remove(id)
        .then(response => {
          setErrorMessage(
            [`Information of '${person.name}' has removed from server`,'red']
          )
          setTimeout(() => {
            setErrorMessage([null,''])
          }, 5000) 
          setPersons(persons.filter(n => n.id !== id))
        })
        .catch(error => {
          setErrorMessage(
            [`Information of '${person.name}' has already been removed from server`,'red']
          )
          setTimeout(() => {
            setErrorMessage([null,''])
          }, 5000)
        })
      }
  }

  // checking for ...already exist
  // https://www.joshbritz.co/posts/why-its-so-hard-to-check-object-equality/
  const objectsEqual = (first, second)=> {
      //console.log(first,second);
      const f=first.toLowerCase().trim()
      const s=second.toLowerCase().trim()
      if (f === s) {
        return true
      }
    }
    
  const  personsToShow =
    (newFilter.length>0)
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()) )
    : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new record</h2>
      <AddNewRecord addPerson={addPerson} 
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>      
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <Person
            key={person.id}
            person ={person}
            deletePerson={() => deletePerson(person.id)}
          />  
        )}
      </ul>  
    </div>   
  )
}

export default App