import React from 'react';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import LineChart from './LineChart';
import BlackBurnContext from '../../../Context/BlackburnContext';

describe(`Adds line chart to dom without crashing`, () => {
    test('renders without crashing', () => {
        const wrapper = shallow(
        <BlackBurnContext.Provider>
            <LineChart />
        </BlackBurnContext.Provider>
    )
    .find('.graphs')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})