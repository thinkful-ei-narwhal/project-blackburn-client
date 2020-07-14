import React from 'react';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import Dashboard from './Dashboard';
import BlackBurnContext from '../../Context/BlackburnContext';

describe(`Adds dashboard to dom without crashing`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(
        <BlackBurnContext.Provider>
            <Dashboard />
        </BlackBurnContext.Provider>
    )
    .find('.dashboard-header-open')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})