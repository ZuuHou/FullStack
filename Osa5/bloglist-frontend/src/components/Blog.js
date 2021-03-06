import React from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

class Blog extends React.Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      allVisible: false,
      blog: this.props.blog,
      comment: ''
    }
  }

  toggleVisible = () => {
    this.setState({
      allVisible: this.state.allVisible === true ? false : true
    })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = async () => {

    console.log('submitted')
    const blog = this.state.blog
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      comments: blog.comments.concat(this.state.comment)
    }

    const updatedBlog = await blogService.update(blog._id, blogObject)
    console.log(this.state.comment)
    this.props.newComment(this.state.comment)
    this.setState({
      blog: updatedBlog,
      comment: ''
    })
  }

  handleLike = async () => {
    const blog = this.state.blog
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    const updatedBlog = await blogService.update(blog._id, blogObject)
    this.setState({
      blog: updatedBlog
    })
  }

  handleDelete = async () => {
    if (window.confirm(`Poista kirjoittajan ${this.state.blog.author} blogi ${this.state.blog.title}?`)) {
      await blogService.remove(this.state.blog, this.props.user)
      this.props.remove(this.state.blog)
    }

  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const hideWhenVisible = { display: this.state.allVisible ? 'none' : '' }
    const showWhenVisible = { display: this.state.allVisible ? '' : 'none' }

    const user = this.props.user
    const blogUser = this.props.blog.user
    const addedBy = blogUser === null ? 'Ei tiedossa' : blogUser.name === undefined ? blogUser.username : blogUser.name
    //    const deleteButton = this.props.blog.user.username === user.username ? <button onClick={this.handleDelete}>Poista</button> : this.props.blog.user === null ? <button onClick={this.handleDelete}>delete</button> : null

    return (
      <div className="content" style={blogStyle}>
        <div className="defaultContent" style={hideWhenVisible}>
          <p className="title" onClick={this.toggleVisible}>{this.state.blog.title} {this.state.blog.author}</p>
        </div>
        <div className="extendedContent" style={showWhenVisible}>
          <p onClick={this.toggleVisible}>{this.state.blog.title} {this.state.blog.author}</p>
          <a href={this.state.blog.url}>{this.state.blog.url}</a>
          <p>{this.state.blog.likes}
            <button onClick={this.handleLike}>Like</button>
          </p>
          <p>Lisännyt: {addedBy}</p>
          <h4>comments</h4>
          {this.state.blog.comments.map(comment => <p>{comment}</p>)}
          <form onSubmit={this.handleSubmit}>
            <input name='comment' value={this.state.comment} onChange={this.handleChange} />
            <button type="submit">Kommentoi</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Blog