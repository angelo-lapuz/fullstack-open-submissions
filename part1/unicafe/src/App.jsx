import { useState } from 'react'

const Header = (props) => <h1>{props.title}</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Display = ({ text, total }) => <p>{text} {total}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodButton = () => {
    // setting value here so we don't
    // update the state of 'good' directly
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralButton = () => {
    // setting value here so we don't
    // update the state of 'neutral' directly
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }  

  const handleBadButton = () => {
    // setting value here so we don't
    // update the state of 'bad' directly
    const updatedBad = bad + 1
    setBad(updatedBad)
  }  

  return (
    <div>
      <Header title="give feedback" />
      <Button onClick={handleGoodButton} text="good" />
      <Button onClick={handleNeutralButton} text="neutral" />
      <Button onClick={handleBadButton} text="bad" />
      <Header title="statistics" />
      <Display text="good" total={good} />
      <Display text="neutral" total={neutral} />
      <Display text="bad" total={bad} />
    </div>
  )
}

export default App
