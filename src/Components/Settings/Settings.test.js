import React from 'react';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import Settings from './Settings';
import BlackBurnContext from '../../Context/BlackburnContext';

describe(`Adds account info to dom without crashing`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(
        <BlackBurnContext.Provider>
            <Settings />
        </BlackBurnContext.Provider>
    )
    .find('.accountInfo')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})