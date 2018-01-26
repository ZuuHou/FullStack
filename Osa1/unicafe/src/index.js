import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    kasvataYhdella = (props) => {
        if (props === 'hyva') {
            return () => {
                this.setState({
                    hyva: this.state.hyva + 1
                })
            }
        }
        if (props === 'neutraali') {
            return () => {
                this.setState({
                    neutraali: this.state.neutraali + 1
                })
            }
        }
        if (props === 'huono') {
            return () => {
                this.setState({
                    huono: this.state.huono + 1
                })
            }
        }
    }

    keskiarvo = () => {
        let arviot = this.state.hyva - this.state.huono
        let maara = this.state.hyva + this.state.huono + this.state.neutraali
        if (maara === 0) {
            return (
                ''
            )
        }
        return (
            arviot / maara
        )
    }
    positiivisia = () => {
        let maara = this.state.hyva + this.state.huono + this.state.neutraali
        if (maara === 0) {
            return (
                'ei yhtään palautetta annettu'
            )
        }
        return (
            this.state.hyva / maara * 100
        )
    }
    render() {
        return (
            <div>
                <Otsikko otsikko='anna palautetta' />
                <Button
                    handleClick={this.kasvataYhdella('hyva')}
                    text='hyvä' />
                <Button
                    handleClick={this.kasvataYhdella('neutraali')}
                    text='neutraali' />
                <Button
                    handleClick={this.kasvataYhdella('huono')}
                    text='huono' />
                <Otsikko otsikko='statistiikka' />
                <Statistics app={this} />
            </div>
        )
    }
}

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.otsikko}</h1>
        </div>
    )
}

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Statistics = (props) => {
    let maara = props.app.state.hyva + props.app.state.neutraali + props.app.state.huono
    if (maara === 0) {
        return (
            <div>
                <p>ei yhtään palautetta annettu</p>
            </div>
        )
    }
    return (
        <table>
            <tbody>
                <Statistic teksti='hyvä' numero={props.app.state.hyva} />
                <Statistic teksti='neutraali' numero={props.app.state.neutraali} />
                <Statistic teksti='huono' numero={props.app.state.huono} />
                <Statistic teksti='keskiarvo' numero={props.app.keskiarvo()} />
                <Statistic teksti='positiivisia' numero={props.app.positiivisia()} />
            </tbody>
        </table>
    )
}
const Statistic = (props) => (
    <tr>
        <td>{props.teksti}</td>
        <td>{props.numero}</td>
    </tr>
)
ReactDOM.render(<App />, document.getElementById('root'));
