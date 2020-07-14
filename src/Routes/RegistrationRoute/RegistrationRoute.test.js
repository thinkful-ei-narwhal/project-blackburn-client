import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import BlackBurnContext from '../../Context/BlackburnContext';
import RegistrationRoute from './RegistrationRoute';

describe(`Renders registration page to dom without crashing`, () => {
    it('renders checkpoint win crashing', () => {
        const wrapper = shallow(
        <BlackBurnContext.Provider>
            <RegistrationRoute />
        </BlackBurnContext.Provider>
    )
    .find('.Registration')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})