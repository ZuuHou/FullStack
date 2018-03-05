import React from 'react'
import { connect } from 'react-redux'
import { setVotedNotification, resetNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'

class AnecdoteList extends React.Component {
  handleVote = (props) => () => {
    this.props.voteAnecdote(props)
    this.props.setVotedNotification(props.content)
    setTimeout(() => {
      this.props.resetNotification()
    }, 5000)
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
  return {
    visibleAnecdotes: showAnecdotes(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setVotedNotification,
  resetNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
