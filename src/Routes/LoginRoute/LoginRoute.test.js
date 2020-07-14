import React from 'react';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import BlackBurnContext from '../../Context/BlackburnContext';
import LoginRoute from './LoginRoute';

describe(`Renders login page to dom without crashing`, () => {
    it('renders checkpoint win crashing', () => {
        const wrapper = shallow(
        <BlackBurnContext.Provider>
            <LoginRoute />
        </BlackBurnContext.Provider>
    )
    .find('.Login')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})