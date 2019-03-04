import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

class ExpenseFilters extends React.Component{
    state = {
        focusedInput: null
    }

    onDatesChange = ({startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    }

    render(){
        return(
            <div>    
                <input 
                    type='text' 
                    value={this.props.filters.text} 
                    onChange={(e)=>{
                        this.props.dispatch(setTextFilter(e.target.value));            
                    }}
                />
                <select value={this.props.filters.sortBy} onChange={
                    (e) => {                
                        const selectedValue=e.target.value;
                        if(selectedValue==='amount'){
                            this.props.dispatch(sortByAmount());
                        }else if(selectedValue==='date'){
                            this.props.dispatch(sortByDate());
                        }                
                    }
                    }
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker 
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    showClearDates={true}
                    isDayHighlighted={()=>true}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        filters: state.filters
    }    
};

export default connect(mapStateToProps)(ExpenseFilters);