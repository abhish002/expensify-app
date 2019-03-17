import React from 'react'
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            description: props.expense ? props.expense.description : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            note: props.expense ? props.expense.note : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            isCalendarFocused: false,
            error: undefined
        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(()=>({ description }));
    }

    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(() => ({ amount }));
        }
    }

    onNoteChange = (e) => {
        const note = e.target.value;        
        this.setState(()=>({ note }))
    }

    onDateChange = (createdAt) => {
        if(createdAt){
            this.setState(()=>({ createdAt }));
        }        
    }

    onCalendarFocusChange = ({ focused }) => {
        this.setState(() => ({ isCalendarFocused: focused }));
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            const error = 'Please provide a Description and Amount'
            this.setState(()=>({ error }))
        }else{
            this.setState(() => ({ error:undefined }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100, // convert to a float number of base 10 and convert to cents
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    }

    render(){
        return(                                     
            <form className="form" onSubmit={this.onSubmit}>
                { this.state.error && <p className="form__error">{this.state.error}</p> }
                <input
                    className='text-input'
                    type='text'
                    placeholder='Description'
                    autoFocus
                    value={ this.state.description }
                    onChange={ this.onDescriptionChange }
                />
                <input
                    className='text-input' 
                    type='text'
                    placeholder='Amount'
                    value={ this.state.amount }
                    onChange={ this.onAmountChange }
                />
                <SingleDatePicker 
                    date={ this.state.createdAt } 
                    onDateChange={ this.onDateChange } 
                    focused={ this.state.isCalendarFocused } 
                    onFocusChange={ this.onCalendarFocusChange }
                    numberOfMonths = {1}
                    isOutsideRange = {() => false} 
                />
                <textarea
                    className='text-area'
                    placeholder='Enter a note for your expense (Optional)'
                    value={ this.state.note }
                    onChange={ this.onNoteChange }
                >
                </textarea>
                <div>
                    <button className="button">Save Expense</button>
                </div>
                
            </form>            
        )
    }
}


