import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import BlackBurnContext from '../../Context/BlackburnContext';
import StartRoute from './StartRoute';

describe(`Renders start page to dom without crashing`, () => {
    it('renders checkpoint win crashing', () => {
        const wrapper = shallow(
        <BlackBurnContext.Provider>
            <StartRoute />
        </BlackBurnContext.Provider>
    )
    .find('.start-container')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})