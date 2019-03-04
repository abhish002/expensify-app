import React from 'react';
import ExpenseList from '../components/ExpenseList';
import ExpensesSummary from './ExpensesSummary';

const ExpenseDashboardPage = () => (
    <div>
        <ExpensesSummary />    
        <ExpenseList />
    </div>    
);

export default ExpenseDashboardPage;