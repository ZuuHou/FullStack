let token = null

const setToken = (props) => {
    token = props
}
const blogs = [
    {
        title: 'Jampan blogi',
        author: 'Jamppa',
        url: 'www.jamppa.fi',
        likes: 42,
        user: {
            name: 'Jamppa',
            username: 'Jamppa'
        },
        _id: 1
    },
    {
        title: 'Tuomiojan blogi',
        author: 'EiErkki',
        url: 'www.eki.com',
        likes: 55,
        user: {
            name: 'Erkki',
            username: 'Eki'
        },
        _id: 2
    },
    {
        title: 'NoNyt',
        author: 'Tunkki',
        url: 'www.parasmesta.eu',
        likes: 2,
        user: {
            name: 'Jamppa',
            username: 'Jampesteri'
        },
        _id: 3
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default {
    blogs, getAll, setToken
}