import React from 'react'
import { List, Segment } from 'semantic-ui-react'

class User extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state.user.name}</h2>
                <div>
                    <h4>Added blogs</h4>
                    <Segment inverted>
                        <List divided inverted relaxed>
                            {this.state.user.blogs.map(blog =>
                                <List.Item key={blog._id}>
                                    <List.Content>
                                        <List.Header>{blog.author}</List.Header>
                                        {blog.title}
                                    </List.Content>
                                </List.Item>
                            )}
                        </List>
                    </Segment>
                </div>
            </div>
        )
    }
}

export default User