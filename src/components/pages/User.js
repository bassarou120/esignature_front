import axios from "axios";
import React from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Sidebar from "../Sidebar";
import NavB from "../Nav";
import Footer from "../Footer";
window.$ = $;

const User = ( ) => {

    return (

        <div className='layout-wrapper layout-content-navbar'>
            <div className="layout-container">
                <Sidebar />
                <div className="layout-page">
                    <NavB/>
                    <div className="mx-5 mt-2" id="general_error"></div>
                    <div className="content-wrapper">
                        {/* Start Content*/}

                        {/* End Content*/}
                        <Footer/>
                        <div className="content-backdrop fade"></div>
                    </div>
                </div>
            </div>
            <div className="layout-overlay layout-menu-toggle"/>
            <div className="drag-target"/>
        </div>
    );
}

export default User;


