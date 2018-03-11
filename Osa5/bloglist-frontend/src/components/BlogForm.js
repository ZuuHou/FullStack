import React from 'react'
import blogService from '../services/blogs'
import { Form } from 'semantic-ui-react'

class BlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            author: '',
            url: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        const blogObject = {
            title: this.state.title,
            author: this.state.author,
            url: this.state.url,
        }
        this.setState({
            title: '',
            author: '',
            url: ''
        })

        const blog = await blogService.create(blogObject)
        this.props.newBlog(blog)
    }

    render() {
        return (
            <div>
                <h2>Luo uusi blogi</h2>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Title'
                            value={this.state.title}
                            onChange={this.handleChange}
                            name='title'
                        />
                        <Form.Input fluid label='Author'
                            value={this.state.author}
                            onChange={this.handleChange}
                            name='author'
                        />
                        <Form.Input fluid label='Url'
                            value={this.state.url}
                            onChange={this.handleChange}
                            name='url'
                        />
                        </Form.Group>
                    <Form.Button>Lisää</Form.Button>
                </Form>
            </div>
        )
    }
}

export default BlogForm