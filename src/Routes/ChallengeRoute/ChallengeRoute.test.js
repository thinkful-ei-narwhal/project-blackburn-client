import React from 'react';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import BlackBurnContext from '../../Context/BlackburnContext';
import ChallengeRoute from './ChallengeRoute';

describe(`Renders challenge page to dom without crashing`, () => {
    it('renders checkpoint win crashing', () => {
        const wrapper = shallow(
        <BlackBurnContext.Provider>
            <ChallengeRoute />
        </BlackBurnContext.Provider>
    )
    .find('.game-container')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})