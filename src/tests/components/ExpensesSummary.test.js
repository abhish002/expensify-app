import React from 'react';
import { shallow } from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render Expenses Summary page for single expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={12345} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Expenses Summary page for multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={3} expensesTotal={1234545}/>);
    expect(wrapper).toMatchSnapshot();
});