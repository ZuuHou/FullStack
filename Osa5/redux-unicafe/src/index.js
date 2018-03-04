import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'

const Statistiikka = () => {
    const palautteet = store.getState()
    const palautteita = palautteet.good + palautteet.ok + palautteet.bad
    if (palautteita === 0) {
        return (
            <div>
                <h2>statistiikka</h2>
                <div>ei yhtään palautetta annettu</div>
            </div>
        )
    }

    const summa = palautteet.good + palautteet.bad * -1
    const karvo = summa / palautteita

    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                    <tr>
                        <td>hyvä</td>
                        <td>{palautteet.good}</td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td>{palautteet.ok}</td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td>{palautteet.bad}</td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td>{karvo}</td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td>{(palautteet.good / palautteita) * 100}%</td>
                    </tr>
                </tbody>
            </table>

            <button onClick={e => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
        </div >
    )
}

class App extends React.Component {
    klik = (nappi) => () => {
        store.dispatch({ type: nappi })
    }

    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={this.klik('GOOD')}>hyvä</button>
                <button onClick={this.klik('OK')}>neutraali</button>
                <button onClick={this.klik('BAD')}>huono</button>
                <Statistiikka />
            </div>
        )
    }
}

const render = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)