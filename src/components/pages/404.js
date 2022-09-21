import axios from "axios";
import React from "react";
import $ from 'jquery';
import {Link} from "react-router-dom";
window.$ = $;


const NoFound_error = ( ) => {

    return (
        <div className="container-xxl container-p-y">
            <div className="misc-wrapper">
                <h2 className="mb-2 mx-2">Page non trouvé :( </h2>
                <p className="mb-4 mx-2">Oops! 😖 L'url que vous avez demander n'a pas été trouvé.</p>
                <Link to="/home" className="btn btn-primary">Retournez au tableau de bord </Link>
                <div className="mt-3">
                    <img src="assets/img/illustrations/page-misc-error-light.png" alt="page-misc-error-light" width="500"
                         className="img-fluid" data-app-dark-img="illustrations/page-misc-error-dark.png"
                         data-app-light-img="illustrations/page-misc-error-light.png"/>
                </div>
            </div>
        </div>
    );
}

export default NoFound_error;



