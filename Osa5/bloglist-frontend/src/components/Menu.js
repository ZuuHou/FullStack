import React from 'react'
import { NavLink } from 'react-router-dom'

const menuStyle = {
    fontSize: 25,
    top: 20,
    padding: 15,
    margin: 10,
    backgroundColor: 'lightblue',
    borderRadius: 10
};

const activeStyle = {
    backgroundColor: 'blue',
    borderRadius: 5
}

const Menu = (props) => {
    return (
        <div style={menuStyle}>
            <NavLink exact to="/" activeStyle={activeStyle}>home</NavLink> &nbsp;
    <NavLink to="/users" activeStyle={activeStyle}>users</NavLink> &nbsp;
                {props.user.name} logged in
          <button onClick={props.logout}>Ulostaudu</button>
        </div>
    )
}

export default Menu