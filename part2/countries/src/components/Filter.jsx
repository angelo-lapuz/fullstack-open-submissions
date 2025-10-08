import CountryInput from "./CountryInput"

const Filter = ({ text, value, onChange }) => (
    <CountryInput 
        text={text}
        value={value}
        onChange={onChange}
    />
)

export default Filter