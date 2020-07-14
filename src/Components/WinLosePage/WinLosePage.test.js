import React from 'react';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import WinLosePage from './WinLosePage';
import BlackBurnContext from '../../Context/BlackburnContext';

describe(`Renders win lose page to dom without crashing`, () => {
    it('renders checkpoint win crashing', () => {
        const wrapper = shallow(
        <BlackBurnContext.Provider>
            <WinLosePage condition = {'checkpoint'} />
        </BlackBurnContext.Provider>
    )
    .find('.results-victory')
    expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders level win crashing', () => {
        const wrapper = shallow(
        <BlackBurnContext.Provider>
            <WinLosePage condition = {'level_beaten'} />
        </BlackBurnContext.Provider>
    )
    .find('.results victory')
    expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders level lose crashing', () => {
        const wrapper = shallow(
        <BlackBurnContext.Provider>
            <WinLosePage condition = {'lose'} />
        </BlackBurnContext.Provider>
    )
    .find(".results defeat")
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})