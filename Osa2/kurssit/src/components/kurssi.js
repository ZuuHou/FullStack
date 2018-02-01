import React from 'react'

const Osa = (props) => <p>{props.nimi} {props.tehtavia}</p>
const Otsikko = (props) => <h1>{props.nimi}</h1>
const reducer = (acc, val) => acc + val
const Yhteensa = (props) => {
    const luvut = []
    props.osat.forEach(function (osa) {
        luvut.push(osa.tehtavia);
    });
    return (
        <p>yhteensä {luvut.reduce(reducer)} tehtävää</p>
    )
}

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko nimi={kurssi.nimi} />
            {kurssi.osat.map(osa => <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />)}
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

export default Kurssi