import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Word from './Word';

describe(`Adds word to dom without crashing`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(
        <Word word = {'hello'} />
    )
    .find('.word')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})