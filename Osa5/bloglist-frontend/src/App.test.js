import React from 'react'
import { mount } from 'enzyme'
import App from './App'

import blogService from './services/blogs'

describe('<App />', () => {

    describe('when user is not logged', () => {
        let app
        beforeEach(() => {
            app = mount(<App />)
        })

        it('only login button is rendered', () => {
            app.update()
            const content = app.find('.loginContent')
            console.log(content.debug())
            expect(content.text()).toContain('Kirjaudu')
            expect(content.text()).not.toContain('NoNyt')
        })
    })

    describe('when user is logged', () => {
        let app
        beforeEach(() => {
            const user = {
                username: 'Jamppa',
                name: 'Jamppa',
                token: '7839501274593'
            }

            localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            app = mount(<App />)
        })

        it('all notes are rendered', () => {
            app.update()
            const content = app.find('.appContent')
            expect(content.text()).toContain('NoNyt')
            expect(content.text()).toContain('Jampan blogi')
            expect(content.text()).toContain('Tuomiojan blogi')
        })
    })
})