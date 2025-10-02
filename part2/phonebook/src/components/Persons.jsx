const PersonRow = ({ personId, name, number, onDelete }) => {
  return (
    <p>
      {name} {number} 
      <button onClick={() => onDelete(personId, name)}>Delete</button>
    </p>
  )
}

const Person = ({ persons, onDelete }) => {
    return (

            persons.map(person =>
            <PersonRow 
              key={person.id} 
              name={person.name} 
              number={person.number} 
              personId={person.id}
              onDelete={onDelete}  
            />
            )


    )
}

export default Person
      
