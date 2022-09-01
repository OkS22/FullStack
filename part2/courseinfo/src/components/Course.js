import React from 'react'

const Course = ({course}) => {
    console.log('Course: ',course)
    return (
      <div>
        <Header title={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts} />          
      </div>
    )
  }
  
  const Header = ({title}) => {
   // console.log(courseName)
    return (
      <div>
        <h1>
          {title}
        </h1>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    //console.log('Content: ',parts)
    return (
      <div>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
      </div>
    )
  }
  
  const Part = ({ part }) => {
    //console.log('Part: ',part)
    return (
      <div>
        <p>
          {part.id}. {part.name}: {part.exercises} exercises
        </p>
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    const arrayExercises = parts.map(part => part.exercises)
    const total = arrayExercises.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    //console.log('Total: ',total)
    return (
      <div>
        <p>
          Total of exercises {total}
        </p>
      </div>
    )
  }
  
export default Course