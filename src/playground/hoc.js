// hoc is a component that renders another component
// Reuse code
// Render hijacking
// manipulation
// Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info =  (props) => {
    return(
        <div>
        <h1>Info</h1>
        <p>This is the info:{props.info}</p>
    </div>
    );    
}

const withAdminWarning = (WrappedComponent) => {
    return (props)=>(
        <div>
            <p>This is private info. Please don't share!</p>
            <WrappedComponent {...props}/>
        </div>        
    )
}

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAuthenticated ? <WrappedComponent {...props}></WrappedComponent> : 'Please login' }            
        </div>
    );
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info); 

//ReactDOM.render(<AdminInfo info='some info'/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info='some info'/>, document.getElementById('app'));