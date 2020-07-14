import React from 'react';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import Story from './Story';
import BlackBurnContext from '../../Context/BlackburnContext';

describe(`Adds a story to dom without crashing`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(
        <BlackBurnContext.Provider>
            <Story />
        </BlackBurnContext.Provider>
    )
    .find('.story-container')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})