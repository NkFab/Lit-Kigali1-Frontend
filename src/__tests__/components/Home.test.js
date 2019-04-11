import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../components/Home/Home';

describe('<Home />', () => {
  test('Should render the <Home />', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});