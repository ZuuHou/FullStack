import React from 'react'
import blogService from '../services/blogs'
import { NavLink } from 'react-router-dom'

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

                {
                    this.props.blogs.map(blog =>
                        <div>
                        <NavLink to={`/blogs/${blog._id}`}>
                            {blog.title} by {blog.author}
                        </NavLink>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Home