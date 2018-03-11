import anecdoteService from '../services/anecdotes'

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      content: newAnecdote
    })

  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      id: updatedAnecdote.id
    })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })

  }
}

const anecdoteReducer = (store = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const old = store.filter(a => a.id !== action.id)
      const voted = store.find(a => a.id === action.id)
      return [...old, { ...voted, votes: voted.votes + 1 }]
    case 'CREATE':
      return [...store, { content: action.content.content, id: action.content.id, votes: 0 }]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return store
  }
}

export default anecdoteReducer