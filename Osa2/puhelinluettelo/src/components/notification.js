import React from 'react'

const Notification = ({ note }) => {
    if (note === null) {
        return null
    }
    return (
        <div className="notification">
            {note}
        </div>
    )
}

export default Notification