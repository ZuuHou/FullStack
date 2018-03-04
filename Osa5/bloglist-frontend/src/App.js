import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: '',
      notification: null,
      error: false,
      username: '',
      password: '',
      user: null,
    }
  }

  async componentDidMount() {
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

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
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

  deleteBlogFromBlogs = (props) => {
    this.setState({
      blogs: this.state.blogs.filter(blog => blog._id !== props._id),
      notification: `Kirjoittajan ${props.author} blogi "${props.title}" poistettu`
    })
    setTimeout(() => {
      this.setState({ notification: null, error: false })
    }, 5000)
  }

  render() {

    if (this.state.user === null) {
      return (
        <div className="loginContent">
          <Notification message={this.state.notification} error={this.state.error} />
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
        <h1> Blogs </h1>

        <Notification message={this.state.notification} error={this.state.error} />

        {this.state.user !== null &&
          <div>
            <p>{this.state.user.name} logged in
            <button onClick={this.logout}>Ulostaudu</button></p>
            <Togglable buttonLabel='Uusi Blogi' ref={component => this.blogForm = component}>
              <BlogForm newBlog={this.newBlog} />
            </Togglable>
          </div>
        }

        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} user={this.state.user} remove={this.deleteBlogFromBlogs} />
        )}
      </div>
    );
  }
}

export default App;
