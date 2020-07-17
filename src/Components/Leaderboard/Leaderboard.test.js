import React from 'react';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import BlackBurnContext from '../../Context/BlackburnContext';
import Leaderboard from './Leaderboard';

describe(`Adds leaderboard to dom without crashing`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(
        <BlackBurnContext.Provider>
            <Leaderboard />
        </BlackBurnContext.Provider>
    )
    .find('.leaderboard')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})