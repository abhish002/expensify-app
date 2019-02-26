// Set Filter Text Action
export const setTextFilter = (text='') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// Sortby Amount Filter Action
export const sortByAmount = () => ({
    type:'SORT_BY_AMOUNT_FILTER'
});

// Sortby Date Filter Action
export const sortByDate = () => ({
    type:'SORT_BY_DATE_FILTER'
});

// Set Start Date Action
export const setStartDate = (date = undefined) => ({
    type: 'SET_START_DATE',
    date
});

// Set End Date Action
export const setEndDate = (date = undefined) => ({
    type: 'SET_END_DATE',
    date
});