import React from 'react';
import { connect } from 'react-redux';
import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

export const ExpensesSummary = ({expenseCount, expensesTotal}) => {
    const expenseWord = expenseCount > 1 ? 'expenses' : 'expense';
    const formattedExpenseTotal = numeral(expensesTotal).format('$0,0.00');
    return (
        <div className="page-header">
            <div className="content-container">
            {             
                <h1 className="page-header__title">                    
                    Viewing <span>{expenseCount}</span> {expenseWord} totalling: <span>{formattedExpenseTotal}</span>                    
                </h1>            
            }
            <div className="page-header__actions">
                <Link className="button" to="/create">Add Expense</Link>
            </div>
            </div>            
        </div>
    );
}

const mapStateToProps = (state) => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: getExpensesTotal(visibleExpenses)/100
    }
}

export default connect(mapStateToProps)(ExpensesSummary);