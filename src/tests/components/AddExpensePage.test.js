import React from 'react';
import { shallow } from 'enzyme';
import {AddExpensePage}  from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let startAddExpense, history, wrapper;

// Global jest function that will run
// before each test case in this file.
// Useful to run common code* 
beforeEach (() => {    
    startAddExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
});

test('should render add expense page', () => {    
    expect(wrapper).toMatchSnapshot();
});

test('should handle on submit', () => {    
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/dashboard');
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});