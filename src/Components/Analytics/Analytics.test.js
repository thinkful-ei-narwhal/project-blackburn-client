import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ReactDOM from 'react-dom'
import  BlackburnContext  from '../../Context/BlackburnContext'
import Analytics from './Analytics';
import BlackBurnContext from '../../Context/BlackburnContext';

describe(`Adds analytics to dom without crashing`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(
        <BlackBurnContext.Provider>
            <Analytics />
        </BlackBurnContext.Provider>
    )
    .find('.analytics-container')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})