import { useState } from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Display = (props) => <div>has {props.votes} votes</div>

const Statistics = ({ anecdotes }) => {

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ] 

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))

  const getMostVotes = () => {
    const maxVotes = Math.max(...votes)
    console.log(maxVotes)
    return votes.indexOf(maxVotes)
  }

  const mostVotedIndex = getMostVotes()

  const handleVote = () => {
    console.log(selected)
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const getRandomAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * 6);
    setSelected(randomNumber)
  }

  return (
    <div>
      <Header title="Anecdote of the day" />
      {anecdotes[selected]}
      <Display votes={votes[selected]} />
      <div>
        <Button onClick={handleVote}  text="vote" />
        <Button onClick={getRandomAnecdote}  text="next anecdote" />
      </div>
      <div>
        <Header title="Anecdote with most votes" />
        {anecdotes[mostVotedIndex]}
        <Display votes={votes[mostVotedIndex]} />
      </div>
    </div>
  )

}

export default App
