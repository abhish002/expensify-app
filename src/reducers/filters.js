import moment from 'moment';

// Filters reducer
const filtersReducerDefaultState = {
    text:'',
    sortBy: 'date',
    startDate: moment().startOf('month'), // a value of zero refers to time at January 1st 1970 00:00am helps to create time zone independent dates
    endDate: moment().endOf('month')
}

export default (state = filtersReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };

        case 'SORT_BY_AMOUNT_FILTER':
            return {
                ...state,
                sortBy: 'amount'
            };

        case 'SORT_BY_DATE_FILTER':
            return {
                ...state,
                sortBy: 'date'
            };

        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            };

        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            };        

        default:
            return state;
    }
};