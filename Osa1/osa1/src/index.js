import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const name = 'Jamppa'
    const age = 42
    return(
  <div>
    <h1>Greetings </h1>
    <Hello name="Kullervo" age={26 + 10}/>
    <Hello name={name} age={age}/>
  </div>
)}

const Hello = (props) => {
    return (
    <div>
        <p>Hello {props.name} you are {props.age} years old</p>
        </div>
    )}

ReactDOM.render(<App />, document.getElementById('root'))