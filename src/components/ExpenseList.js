import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import visibleExpenses from '../selectors/expenses';
import ExpenseFilters from './ExpenseFilters';

export const ExpenseList = (props) => (
    <div>
        <h2>Expenses List</h2>
        <ExpenseFilters />   
        {
            props.expenses.length !== 0 ?                     
            props.expenses.map((expense)=>{
                return (
                    <ExpenseListItem
                        key={expense.id} 
                        {...expense}
                    />
                )
            }) :
            <p>No expenses to list.</p>
        }
    </div>
);

const mapStateToProps = (state)=>{
    return{
        expenses: visibleExpenses(state.expenses, state.filters)
    }
}

export default connect(mapStateToProps)(ExpenseList);