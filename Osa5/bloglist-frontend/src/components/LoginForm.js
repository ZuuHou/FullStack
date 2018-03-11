import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => (
  <div>
    <h2>Kirjaudu</h2>

    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </Form.Field>
      <Button type="submit">Kirjaudu</Button>
    </Form>
  </div>
)

export default LoginForm