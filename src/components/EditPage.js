import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { editExpense, startRemoveExpense } from '../actions/expenses';

const EditPage = (props) => (
    <div>
        <h1>Edit page.</h1>
        <ExpenseForm 
            expense={props.expense}
            onSubmit={(editProps)=>{                
                props.dispatch(editExpense(props.expense.id, editProps))
                props.history.push('/');
            }}
        />
        <button onClick={()=>{
            const id = props.expense.id;
            props.dispatch(startRemoveExpense({ id }));            
            props.history.push('/');
        }}
        >
        Remove
        </button>        
    </div>
);
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find(expense => expense.id === props.match.params.id) 
    }
}

export default connect(mapStateToProps)(EditPage);