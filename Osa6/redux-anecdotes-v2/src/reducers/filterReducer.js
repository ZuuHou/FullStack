const filterReducer = (store = '', action) => {
    switch (action.type) {
        case 'FILTER':
            return action.filter
        default:
            return store
    }
}

export const setFilter = (filter) => {
    return {
        type: 'FILTER',
        filter: filter
    }
}

export default filterReducer