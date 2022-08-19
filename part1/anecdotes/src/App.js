// ANECDOTES //
import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.title}
      </h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({anecdotes,points,index}) => {
  return (
    <div>
      <p>{anecdotes[index]}</p>
      <p>has {points[index]} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const max=anecdotes.length-1

  const [selected, setSelected] = useState(0)
    const setToSelected = () => { 
    const randomNumber = Math.floor(Math.random() * max)
    console.log('index: ',randomNumber)
    setSelected(randomNumber)
  }
  
  /* array for voting*/
  const pointsAtBegin = Array(max).fill(0)  
  const [points, setPoints] = useState(pointsAtBegin)

  const setToVoted = (selected) =>{
    const copy = [...points]
    copy[selected]+= 1
    setPoints(copy)
    console.log('voted index: ',selected,points)
  } 

  const maxVotes =  (points) =>{
    console.log('maxVotes array=',points)
    const copy = [...points]
    return copy.indexOf(Math.max(...copy))
  }

  const title= 'Anecdote of the day'
  const title2= 'Anecdote with the most votes'
  
  return (
    <div>
      <Header title={title} />
      <Anecdote anecdotes={anecdotes} points={points} index={selected} />
      <Button handleClick={() => setToSelected()} text='next anecdote' />
      <Button handleClick={() => setToVoted(selected)} text='vote' />
      <Header title={title2} />
      <Anecdote anecdotes={anecdotes} points={points} index={maxVotes(points)} />   
    </div>

    
  )
}

export default App