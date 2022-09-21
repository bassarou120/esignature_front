import React from "react";
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";


const ProfileUlHeader = ( ) => {

    return (
        <ul className="nav nav-pills flex-column flex-md-row mb-3">
            <li className="nav-item">
                <Link className="nav-link active" to="/profile"><i  className="bx bx-user me-1"/> Compte</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/usersetting"><i className="bx bx-cog me-1"/> Paramétrage</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/userbilling"><i className="bx bx-wallet-alt me-1"/> Facturation</Link>
            </li>
        </ul>
    );
}

export default ProfileUlHeader;
