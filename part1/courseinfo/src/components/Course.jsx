const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = (props) => (
  <div>
    {props.parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
  </div>
)

const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, part) => {
    console.log('what is happening', accumulator, part)
    return accumulator + part.exercises
  }, 0)

  return (
    <div>
      <p>Total of {sum} exercises</p>
    </div>
  )
}

const Course = ({ course }) => {
  const title = course.name
  const parts = course.parts
  return (
    <div>
      <Header name={title} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>

  )
}

export default Course