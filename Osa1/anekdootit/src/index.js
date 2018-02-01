import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: [0, 0, 0, 0, 0, 0]
        }
    }

    rollAnecdote = () => {
        return () => {
            this.setState({ selected: Math.floor(Math.random() * 6) })
        }
    }

    addVote = (number) => {
        return () => {
            let copy = [...this.state.votes]
            copy[number] += 1
            this.setState({ votes: copy })
        }
    }

    findMostPopular = () => {
        let copy = [...this.state.votes]
        let found = 0
        let top = 0
        copy.forEach(function (item, index, array) {
            if (top < item) {
                top = item
                found = index
            }
        });
        return (
            found
        )
    }

    render() {
        return (
            <div>
                <p>{this.props.anecdotes[this.state.selected]}</p>
                <p>has {this.state.votes[this.state.selected]} votes</p>
                <Button
                    handleClick={this.addVote(this.state.selected)}
                    text='vote' />
                <Button
                    handleClick={this.rollAnecdote()}
                    text='next anecdote' />
                <Otsikko text='anecdote with most votes:' />
                <p>{this.props.anecdotes[this.findMostPopular()]}</p>
                <p>has {this.state.votes[this.findMostPopular()]} votes</p>
            </div>
        )
    }
}

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Otsikko = ({ text }) => {
    return (
        <h2>{text}</h2>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)