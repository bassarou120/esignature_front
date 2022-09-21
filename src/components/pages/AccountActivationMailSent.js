import axios from "axios";
import React from "react";
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import $ from 'jquery';
window.$ = $;


const AccountActivationMailSent = (props) => {
    return (
        <div className="text-center container-xxl container-p-y">
            <div className="misc-wrapper card m-2">
                <div className="card-header">
                    <h3 className="mt-2 mb-2 mx-2">Compte créé avec succès &#128578;</h3>
                    <h4 className="mb-2 mx-2">Une dernière étape</h4>
                </div>
                 <div className="card-body">
                     <p className="mb-4 mx-2">Nous avons envoyé un lien de confirmation à l'adresse mail <strong>{props.location.state.email}</strong><br/>
                         Utilisez ce lien pour activer votre compte</p>
                     <div className="mt-1">
                         <img src="assets/img/illustrations/Mail sent-rafiki.png" alt="page-misc-error-light" width="350"
                              className="img-fluid" data-app-dark-img="illustrations/page-misc-error-dark.png"
                              data-app-light-img="illustrations/page-misc-error-light.png"/>
                     </div>
                 </div>

            </div>
        </div>
    );
}

export default AccountActivationMailSent;

