

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.parts.name}</h1>
    </div>
  )
}


// const Content = (props) => {
//   console.log('In content')
//   console.log(props)
//   return (
//     <div>
//       {props.part.map(value => (
//         <p>{value.name} {value.exercises}</p>
//       ) )}
//     </div>
//   )
// }


const Content = (props) => {
  console.log('In content')
  console.log(props)
  return (
    <div>
      <p>{props.courseInfo.parts[0].name} {props.courseInfo.parts[0].exercises}</p>
      <p>{props.courseInfo.parts[1].name} {props.courseInfo.parts[1].exercises}</p>
      <p>{props.courseInfo.parts[2].name} {props.courseInfo.parts[2].exercises}</p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)

  return (
    <div>
      <p>Number of exercises {props.courseInfo.parts[0].exercises + props.courseInfo.parts[1].exercises + props.courseInfo.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'Start of a component',
        exercises: 14      
      }
    ]
  }


  return (
    <div>
      <Header parts={course} />
      <Content courseInfo={course} />  
      <Total courseInfo={course} />
    </div>
  )
}

export default App
