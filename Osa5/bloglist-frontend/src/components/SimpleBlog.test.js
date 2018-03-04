import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    it('renders content', () => {
        const blog = {
            title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
            author: 'KANAKE',
            likes: 42
        }

        const blogComponent = shallow(<SimpleBlog blog={blog} />)
        const contentDiv = blogComponent.find('.content')

        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).toContain(blog.likes)
    })

    it('clicking the likebutton twice calls event handler twice', () => {
        const blog = {
            title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
            author: 'KANAKE',
            likes: 42
        }

        const mockHandler = jest.fn()

        const blogComponent = shallow(
            <SimpleBlog
                blog={blog}
                onClick={mockHandler}
            />)

        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})