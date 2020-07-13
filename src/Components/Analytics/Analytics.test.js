import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { BlackBurnProvider } from '../../context/PotluckContext'
import Analytics from './Analytics';

describe(`Adds analytics to dom without crashing`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(
        <BlackBurnProvider>
            <Analytics />
        </BlackBurnProvider>
    )
    .find('.analytics-container')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})