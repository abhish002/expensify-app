import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';

test('should render expense list for provided expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={ expenses }/>)
    expect(wrapper).toMatchSnapshot();
});

test('should render paragraph tag when no expenses are passed', () => {
    const wrapper = shallow(<ExpenseList expenses={ [] }/>)
    expect(wrapper).toMatchSnapshot();
});