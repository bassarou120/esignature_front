import axios from "axios";
import React from "react";
import ReactDOM from 'react-dom';
import Decompte from "./DCircleSignature";
import {Link, useLocation} from "react-router-dom";
import strings from "./Translation/Translation";
import ApexChart from "./ApexChart";


const NavB = ( ) => {
    const logout = (e) =>{
        e.preventDefault();
        axios
            .post('/logout', {})
            .then(response => {
                if(response.status===204){
                    window.location.href='/'
                }
            });
    };

    // if (splitLocation[1] !=='sending' && !pathname.includes('/more/configuration')) {
        return (
            <nav
                className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                id="layout-navbar">

                <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0   d-xl-none ">
                    <a className="nav-item nav-link px-0 me-xl-4" href="#">
                        <i className="bx bx-menu bx-sm"/>
                    </a>
                </div>

                <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">

                    <div className="navbar-nav">
                        {/*<Decompte size="75%" label="75" serie="75"/>*/}
                        {/*<Decompte size="50%" label="50" serie="50"/>*/}
                        {/*<Decompte size="15%" label="15" serie="15"/>*/}

                    </div>

                    <ul className="navbar-nav flex-row align-items-center ms-auto">

                        {/*<li className="nav-item dropdown-language dropdown me-2 me-xl-0">
                            <a className="nav-link dropdown-toggle hide-arrow" href="#"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="text-center">Francais</i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a className="dropdown-item selected" href="#" data-language="en">
                                        <i className="flag-icon flag-icon-us flag-icon-squared rounded-circle fs-4 me-1"/>
                                        <span className="align-middle">Anglais</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item selected" href="#" data-language="en">
                                        <i className="flag-icon flag-icon-us flag-icon-squared rounded-circle fs-4 me-1"/>
                                        <span className="align-middle">Francais</span>
                                    </a>
                                </li>
                            </ul>
                        </li>*/}

                        {/* <li className="nav-item me-2 me-xl-0">
                            <a className="nav-link style-switcher-toggle hide-arrow" href=""
                               data-bs-original-title="" title="">
                                <i className="bx bx-sm bx-moon"/>
                            </a>
                        </li> */}

                        {/* <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1">
                            <a className="nav-link dropdown-toggle hide-arrow" href="#"
                               data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                <i className="bx bx-bell bx-sm"/>
                                <span className="badge bg-danger rounded-pill badge-notifications">5</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end py-0">
                                <li className="dropdown-menu-header border-bottom">
                                    <div className="dropdown-header d-flex align-items-center py-3">
                                        <h5 className="text-body mb-0 me-auto">Notification</h5>
                                        <a href="#" className="dropdown-notifications-all text-body"
                                           data-bs-toggle="tooltip" data-bs-placement="top" title=""
                                           data-bs-original-title="Mark all as read" aria-label="Mark all as read">
                                            <i className="bx fs-4 bx-envelope-open"/></a>
                                    </div>
                                </li>
                                <li className="dropdown-notifications-list scrollable-container ps">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item list-group-item-action dropdown-notifications-item">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-3">
                                                    <div className="avatar">
                                                        <img src="assets/img/avatars/1.png" alt=""
                                                             className="w-px-40 h-auto rounded-circle" />
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1">Congratulation Lettie 🎉</h6>
                                                    <p className="mb-0">Won the monthly best seller gold badge</p>
                                                    <small className="text-muted">1h ago</small>
                                                </div>
                                                <div className="flex-shrink-0 dropdown-notifications-actions">
                                                    <a href="#" className="dropdown-notifications-read">
                                                        <span className="badge badge-dot"/></a>
                                                    <a href="#" className="dropdown-notifications-archive">
                                                        <span className="bx bx-x"/></a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="ps__rail-x" style={{left: 0,bottom: 0}}>
                                        <div className="ps__thumb-x" tabIndex="0" style={{left: 0, width: 0}} />
                                    </div>
                                    <div className="ps__rail-y" style={{top: 0, right: 0}}>
                                        <div className="ps__thumb-y" tabIndex="0" style={{top: 0, height: 0}}/>
                                    </div>
                                </li>
                                <li className="dropdown-menu-footer border-top">
                                    <a href="#"
                                       className="dropdown-item d-flex justify-content-center p-3">
                                        View all notifications
                                    </a>
                                </li>
                            </ul>
                        </li> */}

                        <li className="nav-item me-2 me-xl-0">
                            <Link className="nav-link  hide-arrow" to="/profile"
                               data-bs-original-title="" title="">
                                <div className="avatar avatar-online">
                                    <img src="../assets/img/avatars/1.png" alt=""
                                         className="w-px-40 h-auto rounded-circle"/>
                                </div>
                            </Link>
                       </li>
                       {/* <li className="nav-item navbar-dropdown dropdown-user dropdown">
                            <a className="nav-link dropdown-toggle hide-arrow" href="#"
                               data-bs-toggle="dropdown">
                                <div className="avatar avatar-online">
                                    <img src="../assets/img/avatars/1.png" alt=""
                                         className="w-px-40 h-auto rounded-circle"/>
                                </div>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <div className="avatar avatar-online">
                                                    <img src="../assets/img/avatars/1.png" alt=""
                                                         className="w-px-40 h-auto rounded-circle"/>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <span className="fw-semibold d-block">John Doe</span>
                                                <small className="text-muted">Admin</small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <div className="dropdown-divider"/>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/profile">
                                        <i className="bx bx-user me-2"/>
                                        <span className="align-middle">Mon profile</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/usersetting">
                                        <i className="bx bx-cog me-2"/>
                                        <span className="align-middle">{strings.setting}</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/userbilling">
                                  <span className="d-flex align-items-center align-middle">
                                    <i className="flex-shrink-0 bx bx-credit-card me-2"/>
                                    <span className="flex-grow-1 align-middle">{strings.billing}</span>
                                    <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                                  </span>
                                    </Link>
                                </li>
                                <li>
                                    <div className="dropdown-divider"/>
                                </li>
                                <li>
                                <a className="dropdown-item" href="pages-help-center-landing.html">
                                    <i className="bx bx-support me-2"/>
                                    <span className="align-middle">Help</span>
                                </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="pages-faq.html">
                                        <i className="bx bx-help-circle me-2"/>
                                        <span className="align-middle">FAQ</span>
                                    </a>
                                </li>
                                <li>
                                    <div className="dropdown-divider"/>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="!#" onClick={logout}>
                                        <i className="bx bx-power-off me-2"/>
                                        <span className="align-middle">{strings.logout}</span>
                                    </a>
                                </li>
                            </ul>
                        </li> */}

                    </ul>
                </div>
            </nav>
        );
    // }
    // else{
    //     return null;
    // }

}

export default NavB;


