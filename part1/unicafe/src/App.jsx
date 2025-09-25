import { useState } from 'react'

const Header = (props) => <h1>{props.title}</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={props.goodValue} />
        <StatisticsLine text="neutral" value={props.neutralValue} />
        <StatisticsLine text="bad" value={props.badValue} />
        <StatisticsLine text="all" value={props.total} />
        <StatisticsLine text="average" value={props.averageValue} />
        <StatisticsLine text="positive" value={props.positiveValue} />
      </tbody>
    </table>
  )
}

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)


  // if total = 0 return 0 if not return the average
  const average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total

  const positivePercentage = total === 0 ? 0 : (good / total) * 100
  
  const handleGoodButton = () => {
    // setting value here so we don't
    // update the state of 'good' directly
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(neutral + bad + updatedGood)
  }

  const handleNeutralButton = () => {
    // setting value here so we don't
    // update the state of 'neutral' directly
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + bad + updatedNeutral)
  }  

  const handleBadButton = () => {
    // setting value here so we don't
    // update the state of 'bad' directly
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good + neutral + updatedBad)
  }  

  return (
    <div>
      <Header title="give feedback" />
      <Button onClick={handleGoodButton} text="good" />
      <Button onClick={handleNeutralButton} text="neutral" />
      <Button onClick={handleBadButton} text="bad" />
      <Header title="statistics" />
      <Statistics text="good" goodValue={good} neutralValue={neutral} badValue={bad} total={total}  
      averageValue={average} positiveValue={`${positivePercentage} %`}/>

    </div>
  )
}

export default App
