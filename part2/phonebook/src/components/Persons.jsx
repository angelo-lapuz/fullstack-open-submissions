const Number = ({ name, number }) => {
  return <p>{name} {number}</p>
}

const Person = ({ persons }) => {
    return (

            persons.map(person =>
            <Number key={person.id} name={person.name} number={person.number}/>
            )


    )
}

export default Person
      
