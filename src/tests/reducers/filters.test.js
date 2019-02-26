import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text:'',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate:moment().endOf('month')
    });
});

test('should set state for sort by amount', ()=>{
    const state = filtersReducer(undefined, { type:'SORT_BY_AMOUNT_FILTER' });
    expect(state.sortBy).toBe('amount');
});

test('should set state for sort by date', ()=>{
    const currentState = {
        text:'',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const state = filtersReducer(currentState, { type:'SORT_BY_DATE_FILTER' });
    expect(state.sortBy).toBe('date');
});

test('should set text filter', ()=>{
    const state = filtersReducer(undefined, { type:'SET_TEXT_FILTER', text:'This is a test.' });
    expect(state.text).toBe('This is a test.');
});

test('should set start date', ()=>{
    const action = {
        type: 'SET_START_DATE',
        date: moment(0)
    }
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(moment(0));
});

test('should set end sate', ()=>{
    const action = {
        type: 'SET_END_DATE',
        date: moment(0)
    }
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(moment(0));
});

