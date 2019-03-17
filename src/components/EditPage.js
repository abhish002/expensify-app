import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

const EditPage = (props) => (
    <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Edit page.</h1>
            </div>
        </div>
        <div className="content-container">
            <ExpenseForm 
            expense={props.expense}
            onSubmit={(editProps)=>{                
                props.dispatch(startEditExpense(props.expense.id, editProps))
                props.history.push('/dashboard');
            }}
            />
            <button className="button button--secondary" onClick={()=>{
                const id = props.expense.id;
                props.dispatch(startRemoveExpense({ id }));            
                props.history.push('/dashboard');
            }}
            >Remove Expense</button> 
        </div>       
    </div>
);
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find(expense => expense.id === props.match.params.id) 
    }
}

export default connect(mapStateToProps)(EditPage);