import React from 'react';
import ReactDOM from 'react-dom'
import Person from './components/person'
import Notification from './components/notification'
import personService from './services/persons'
import './index.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            notification: null

        }
    }

    componentDidMount() {
        personService
            .getAll()
            .then(response => {
                this.setState({ persons: response.data })
            })
    }

    personExists = (name) => {
        let copy = [...this.state.persons]
        let found = false
        copy.forEach(function (person) {
            if (person.name === name) {
                found = true
            }
        });
        return (found)
    }

    addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }
        if (!this.personExists(personObject.name)) {
            personService
                .create(personObject)
                .then(response => {
                    this.setState({
                        persons: this.state.persons.concat(response.data),
                        notification: `Henkilö ${personObject.name} lisätty!`
                    })
                })
        } else if (window.confirm(`Haluatko vaihtaa henkilön ${personObject.name} puhelinnumeron?`)) {
            const list = this.state.persons.filter(person => person.name.toLowerCase() === personObject.name.toLowerCase())
            const personToUpdate = list[0]
            console.log(personObject)
            personService
                .update(personToUpdate.id, personObject)
                .then(response => {
                    const filteredPersons = this.state.persons.filter(person => person.id !== personToUpdate.id)
                    this.setState({
                        persons: filteredPersons.concat(response.data),
                        notification: `Henkilön ${personObject.name} numero vaihdettu!`

                    })
                })
                .catch(error => {
                    this.setState({
                        notification: `Henkilö ${personObject.name} on poistettu tietokannasta!`
                    })
                })

        }
        setTimeout(() => {
            this.setState({
                notification: null,
                newName: '',
                newNumber: ''
            })
        }, 3000)
    }

    deletePerson = (name, id) => {
        if (window.confirm(`Poistetaanko henkilö ${name}`)) {
            personService.remove(id)
                .then(response => {
                    this.setState({
                        persons: this.state.persons.filter(person => person.id !== id),
                        notification: `Henkilö ${name} poistettu!`
                    })
                })
        }
        setTimeout(() => {
            this.setState({ notification: null })
        }, 3000)
    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }

    render() {
        const personsToShow =
            this.state.filter === '' ?
                this.state.persons :
                this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))
        return (
            <div>
                <h1>Puhelinluettelo</h1>
                <Notification note={this.state.notification} />
                <div>
                    rajaa näytettäviä: <input
                        value={this.state.filter}
                        onChange={this.handleFilterChange} />
                </div>
                <h2>Lisää uusi</h2>
                <form onSubmit={this.addPerson}>
                    <div>
                        nimi: <input
                            value={this.state.newName}
                            onChange={this.handleNameChange} />
                    </div>
                    <div>
                        numero: <input
                            value={this.state.newNumber}
                            onChange={this.handleNumberChange} />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <table>
                    <tbody>
                        {personsToShow.map(person => <Person key={person.name} person={person} deletePerson={this.deletePerson} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)

export default App