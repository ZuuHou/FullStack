import React from 'react'
import Notification from './components/Notification'
import UserList from './components/UserList'
import Home from './components/Home'
import Blog from './components/Blog'
import Menu from './components/Menu'
import User from './components/User'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import userService from './services/users'
import blogService from './services/blogs'
import loginService from './services/login'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notification: null,
      error: false,
      user: null,
      users: [],
      blogs: [],
      username: '',
      password: ''
    }
  }

  async componentDidMount() {
    const users = await userService.getAll()
    this.setState({ users })

    const blogs = await blogService.getAll()
    blogs.sort(function (a, b) {
      return b.likes - a.likes
    })
    this.setState({ blogs })

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }
  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  logout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({
      user: null,
      notification: 'Loggasit ulos'
    })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)

  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({
        username: '',
        password: '',
        notification: 'Kirjauduit sisään onnistuneesti!',
        user
      })
      setTimeout(() => {
        this.setState({
          notification: null
        })
      }, 5000)

    } catch (exception) {
      this.setState({
        error: true,
        notification: 'käyttäjätunnus tai salasana virheellinen',
        password: ''
      })
      setTimeout(() => {
        this.setState({
          error: false,
          notification: null
        })
      }, 5000)
    }
  }

  newComment = async (props) => {
    const blogs = await blogService.getAll()
    this.setState({
      blogs,
      notification: `Lisäsit kommentin "${props.title}"`
    })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
  }

  newBlog = async (props) => {
    const blogs = await blogService.getAll()

    this.blogForm.toggleVisibility()

    this.setState({
      blogs,
      notification: `Lisätty blogi '${props.title}', kirjoittanut ${props.author}`
    })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
  }

  userById = (id) => (
    this.state.users.find(u => u.id === id))

  blogById = (id) => (
    this.state.blogs.find(b => b._id === id))

  render() {
    if (this.state.user === null) {
      return (
        <div className="loginContent">
          <Togglable buttonLabel='Kirjaudu'>
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleLoginFieldChange}
              handleSubmit={this.login}
            />
          </Togglable>
        </div>
      )
    }

    return (
      <div className="appContent">
        <Router>
          <div>
            <div>
              <Menu user={this.state.user} logout={this.logout} />
            </div>
            <h1>Blog App </h1>
            <Notification message={this.state.notification} error={this.state.error} />
            {this.state.user !== null &&
              <div>
                <Togglable buttonLabel='Uusi Blogi' ref={component => this.blogForm = component}>
                  <BlogForm newBlog={this.newBlog} />
                </Togglable>
              </div>
            }
            <Route exact path="/" render={() => <Home user={this.state.user} blogs={this.state.blogs} login={this.login} />} />
            <Route exact path="/users" render={() => <UserList users={this.state.users} />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={this.userById(match.params.id)} />
            } />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog blog={this.blogById(match.params.id)} newComment={this.newComment} />
            } />
          </div>

        </Router>
      </div>
    );
  }
}

export default App;
