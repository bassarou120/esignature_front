import axios from "axios";
import React from "react";
import ReactDOM from 'react-dom';
import {Link, useLocation} from 'react-router-dom';
import $ from 'jquery';
window.$ = $;


const Log_nav = ( ) => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
            <Link className="navbar-brand" to="/">
                {process.env.REACT_APP_NAME}
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto">

                </ul>
                <ul className="navbar-nav ms-auto">
  
                            <li className={`nav-item ${ splitLocation[1] === 'login' ? `active` : ''}`}>
                                <Link className="nav-link " to="/login">Login</Link>
                            </li>

                            <li  className={`nav-item ${ splitLocation[1] === 'register' ? `active` : ''}`}>
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
               
                  
                </ul>
            </div>
        </div>
    </nav>

    );
}

export default Log_nav;