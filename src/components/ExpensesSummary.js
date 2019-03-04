import React from 'react';
import { connect } from 'react-redux';
import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = ({expenseCount, expensesTotal}) => {
    const expenseWord = expenseCount > 1 ? 'expenses' : 'expense'
    return (
        <div>
        {             
            <h1>
                {
                    `Viewing ${expenseCount} ${expenseWord} totalling ${numeral(expensesTotal).format('$0,0.00')}`
                }
            </h1>            
        }        
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