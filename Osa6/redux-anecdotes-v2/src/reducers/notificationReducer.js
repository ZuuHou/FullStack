const notificationReducer = (store = '', action) => {
    switch (action.type) {
        case 'ANECVOTED':
            return `"${action.message}" voted`
        case 'ANECCREATED':
            return `new anecdote "${action.message}" created`
        case 'RESET':
            return ''
        default:
            return store
    }
}

export const setVotedNotification = (message) => {
    return {
        type: 'ANECVOTED',
        message: message
    }
}

export const setCreatedNotification = (message) => {
    return {
        type: 'ANECCREATED',
        message: message
    }
}

export const resetNotification = (message) => {
    return {
        type: 'RESET'
    }
}

export default notificationReducer