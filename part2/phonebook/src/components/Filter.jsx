import PhoneBookInput from "./PhoneBookInput"

const Filter = ({ text, value, onChange}) => (

    <PhoneBookInput 
        text={text}
        value={value}
        onChange={onChange}
    />
)

export default Filter