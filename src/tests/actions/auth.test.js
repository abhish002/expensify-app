import React from 'react';
import thunk from 'redux-thunk';
import { login, logout } from '../../actions/auth';

test('should setup logged-in user action object', () => {
    const uid = 'abcdefg';
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});

test('should setup logged-out user action object', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});
