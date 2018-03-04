import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
    let blog
    let user

    beforeEach(() => {
        blog = {
            title: 'Testiblogi',
            author: 'Testaaja',
            url: 'www.testi.fi',
            likes: 42,
            user: {
                name: 'Jalmari',
                username: 'Jamppa'
            }
        }
        user = {
            name: 'Jalmari',
            username: 'Jamppa'
        }
    })
    it('renders title and author as default', () => {
        const blogComponent = shallow(<Blog blog={blog} user={user} remove={function () { return null }} />)
        const defaultDiv = blogComponent.find('.defaultContent')
        const hiddenDiv = blogComponent.find('.extendedContent')

        expect(defaultDiv.getElement().props.style).toEqual({ display: '' })
        expect(hiddenDiv.getElement().props.style).toEqual({ display: 'none' })
    })

    it('renders all information after clicking blogname', () => {

        const blogComponent = shallow(<Blog blog={blog} user={user} remove={function () { return null }} />)
        const nameDiv = blogComponent.find('.title')
        nameDiv.simulate('click')
        const defaultDiv = blogComponent.find('.defaultContent')
        const hiddenDiv = blogComponent.find('.extendedContent')

        expect(defaultDiv.getElement().props.style).toEqual({ display: 'none' })
        expect(hiddenDiv.getElement().props.style).toEqual({ display: '' })
    })
})