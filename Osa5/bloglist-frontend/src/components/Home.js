import React from 'react'
import blogService from '../services/blogs'
import { NavLink } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newBlog: '',
            notification: null,
            error: false,
            users: []
        }
    }

    render() {
        return (
            <div>
                <h2> Blogs </h2>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Blog</Table.HeaderCell>
                            <Table.HeaderCell>Author</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.blogs.map(blog =>
                            <Table.Row>
                                <Table.Cell>
                                    <NavLink to={`/blogs/${blog._id}`}>
                                        {blog.title}
                                    </NavLink>
                                </Table.Cell>
                                <Table.Cell>{blog.author}</Table.Cell>
                            </Table.Row>
                        )
                        }
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default Home