import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { connect } from 'react-redux';

export const Header = ({ startLogout }) => (
    <header className="header">
    <div className="content-container">
        <div className="header__content">
            <Link className="header__title" to="/dashboard">
                <h1>Expensify</h1>
            </Link>
            {/*<NavLink to="/create" activeClassName="is-active">Add Expense</NavLink>*/}
            {/* <NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink> */}
            {/*<NavLink to="/help" activeClassName="is-active">Help</NavLink>*/}
            <button className="button button--link" onClick = { startLogout }>Logout</button>
        </div>        
    </div>        
    </header>
);

const mapDispatchToProps = (dispatch) => ({    
    startLogout: () => dispatch(startLogout())    
});

export default connect(undefined, mapDispatchToProps)(Header);