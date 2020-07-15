import React from 'react';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import LandingPageV2 from './LandingpageV2';

describe(`Adds landing page to dom without crashing`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(
           <LandingPageV2 />
    )
    .find('h1').text('Project Blackburn')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})