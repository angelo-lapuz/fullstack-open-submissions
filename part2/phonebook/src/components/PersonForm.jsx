import PhoneBookInput from "./PhoneBookInput"

const PersonForm = (props) => {
    return (
      <form onSubmit={props.onSubmit}>
            <PhoneBookInput          
                text={'name:'}
                value={props.newName}
                onChange={props.handleNameChange}
            />
            <PhoneBookInput 
                text={'number:'}
                value={props.newNumber}
                onChange={props.handleNumberChange}
            />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm