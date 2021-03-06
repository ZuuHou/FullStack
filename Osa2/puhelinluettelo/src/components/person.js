import React from 'react'

const Person = ({ person, deletePerson }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
                <button onClick={() => deletePerson(person.name, person.id)}>Poista</button>
            </td>
        </tr>
    )
}

export default Person