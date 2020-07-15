import React from 'react';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import GameplayScreen from './GameplayScreen';

describe(`Adds gameplay img to dom without crashing`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(
            <GameplayScreen />
    )
    .find('img')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})