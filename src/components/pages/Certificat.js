import axios from "axios";
import React from "react";
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import Sidebar from "../Sidebar";
import NavB from "../Nav";
import DCertificatedList from "../DCertificatedList";
import Footer from "../Footer";


const Certificat = ( ) => {

    return (
        <div className='layout-wrapper layout-content-navbar'>
            <div className="layout-container">
                <Sidebar />
                <div className="layout-page">
                    <NavB/>
                    <div className="mx-5 mt-2" id="general_error"></div>
                    <div className="content-wrapper">
                        {/* Start Content*/}
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <h4 className="fw-bold py-1 d-flex justify-content-between">
                                <span className="text-muted fw-light">Gestion des certificats</span>
                                <Link to="/market" className="btn btn-primary">
                                    Nouveau certificat
                                </Link>
                            </h4>
                            <div className="row">
                                <div className="card text-center mb-3 col-md-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Title</h5>
                                        <p className="card-text">Descriptions</p>
                                        <a href="!#" className="btn btn-primary">Télécharger</a>
                                    </div>
                                </div>
                            </div>

                        </div>
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

export default Certificat;


