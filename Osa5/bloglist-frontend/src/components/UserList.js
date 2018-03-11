import React from 'react'
import { NavLink } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const UserList = ({ users }) => (
    <div>
      <h2>Users</h2>
      <Table celled>
      <Table.Header>
      <Table.Row>
        <Table.HeaderCell>User</Table.HeaderCell>
        <Table.HeaderCell>Blogs</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
        <Table.Body>
          {users.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell>
                <NavLink to={`/users/${user.id}`}>{user.name}</NavLink>
              </Table.Cell>
              <Table.Cell>
                {user.blogs.length}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )

  export default UserList