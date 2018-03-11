import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => async () => {
    this.props.voteAnecdote(anecdote)
    this.props.setNotification(`You voted "${anecdote.content}"`, 5)
  }
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleVote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const showAnecdotes = (anecdotes, filter) => {
  return filter === '' ? anecdotes : anecdotes.filter(a => a.content.includes(filter))
}

const mapStateToProps = (state) => {
  console.log(state.anecdotes)
  return {
    visibleAnecdotes: showAnecdotes(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
