import React from 'react';
import { shallow } from 'enzyme';
import  PageNotFound from '../../components/PageNotFound';

test('should render page not found component', () => {
    const wrapper = shallow(<PageNotFound />);
    expect(wrapper).toMatchSnapshot();
});