import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'
import RegistrationRoute from '../../Routes/RegistrationRoute/RegistrationRoute'
import LandingPageV2 from '../LandingPage/LandingpageV2'
import LoginRoute from '../../Routes/LoginRoute/LoginRoute'
import Dashboard from '../Dashboard/Dashboard'
describe('<App/>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('should render the correct routes', () => {
      const wrapper = mount(
          <MemoryRouter initialEntries = {['/registration']}>
              <App />
          </MemoryRouter>
      )
      expect(wrapper.find(LandingPageV2)).toHaveLength(0)
      expect(wrapper.find(RegistrationRoute)).toHaveLength(1)
  })
  it('should render the correct routes', () => {
    const wrapper = mount(
        <MemoryRouter initialEntries = {['/login']}>
            <App />
        </MemoryRouter>
    )
    expect(wrapper.find(LandingPageV2)).toHaveLength(0)
    expect(wrapper.find(LoginRoute)).toHaveLength(1)
})
it('renders login page when going to private route w/o auth', () => {
    const wrapper = mount(
        <MemoryRouter initialEntries = {['/dashboard']}>
            <App />
        </MemoryRouter>
    )
    expect(wrapper.find(LandingPageV2)).toHaveLength(0)
    expect(wrapper.find(Dashboard)).toHaveLength(0)
    expect(wrapper.find(LoginRoute)).toHaveLength(1)

})
});