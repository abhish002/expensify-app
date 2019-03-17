import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import visibleExpenses from '../selectors/expenses';
import ExpenseFilters from './ExpenseFilters';

export const ExpenseList = (props) => (
    <div>
        <ExpenseFilters />
        <div className="content-container">            
            <div className="list">
                <div className="list-header">
                    <div className="show-for-mobile">Expenses</div>
                    <div className="show-for-desktop">Expense</div>
                    <div className="show-for-desktop">Amount</div>
                </div>
                <div className="list-body">
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
                        <div className="list-item list-item__message">
                            <span>No expenses to list.</span>
                        </div>                        
                    }
                </div>                
            </div>                        
        </div>        
    </div>
);

const mapStateToProps = (state)=>{
    return{
        expenses: visibleExpenses(state.expenses, state.filters)
    }
}

export default connect(mapStateToProps)(ExpenseList);