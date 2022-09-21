import axios from "axios";
import React from "react";
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import $ from 'jquery';
window.$ = $;


const SocialMediIcon = ( ) => {
    return (
        <div className="d-flex justify-content-center">
            <a href="#" className="btn btn-icon btn-label-facebook me-3">
                <i className="tf-icons bx bxl-facebook"></i>
            </a>

            <a href="#" className="btn btn-icon btn-label-google-plus me-3">
                <i className="tf-icons bx bxl-google-plus"></i>
            </a>

            <a href="#" className="btn btn-icon btn-label-twitter">
                <i className="tf-icons bx bxl-twitter"></i>
            </a>
        </div>
    );
}

export default SocialMediIcon;