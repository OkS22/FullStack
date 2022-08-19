//***UNICAFE***
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

const StatisticLine = (props) => {
  return (
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td>
      </tr>
  )
}

const Statistics = (props) => {
  const all = props.good+props.neutral+props.bad
  const average = (props.good+0*props.neutral-props.bad)/all
  const positive = props.good/all*100
  if (props.good+props.neutral+props.bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
    <table>
      <tbody>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={average} />
      <StatisticLine text="% positive " value ={positive} />
      </tbody>
    </table>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => {setGood(good+1)}
  const setToNeutral = () => {setNeutral(neutral+1)}
  const setToBad = () => {setBad(bad+1)}

  const title = 'Give feedback'

  return (
    <div>
      <Header title={title} />      
      <div>
        <Button handleClick={() => setToGood()} text='good' />
        <Button handleClick={() => setToNeutral()} text='neutral' />
        <Button handleClick={() => setToBad()} text='bad' />
      </div>
      <Header title={"Statistics"} />  
      <Statistics good={good} neutral={neutral} bad={bad} />  
    </div>
  )
}

export default App