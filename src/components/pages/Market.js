import axios from "axios";
import React from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Sidebar from "../Sidebar";
import NavB from "../Nav";
import Footer from "../Footer";
window.$ = $;


const Market = ( ) => {

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
                            <div className="pricing-plans">
                                <div className="text-center mb-3">
                                    <h3>Find the right plan for your site</h3>
                                    <p> Get started with us - it's perfect for individuals and teams. Choose a subscription plan that
                                        meets your needs. </p>
                                </div>
                                <div className="d-flex align-items-center justify-content-center flex-wrap gap-2 my-5 pt-sm-5">
                                    <label className="switch switch-primary ps-sm-5 mt-3 me-0">
                                        <span className="switch-label ps-0 ms-sm-5">Monthly</span>
                                        <input type="checkbox" className="switch-input price-duration-toggler" checked="" />
                                        <span className="switch-toggle-slider">
                <span className="switch-on"/>
                <span className="switch-off"/>
              </span>
                                        <span className="switch-label">Annual</span>
                                    </label>
                                    <div className="pricing-offer mt-n5 ms-n5 d-none d-sm-block">
                                        <img src="../../assets/img/pages/pricing-arrow-light.png" alt="arrow img"
                                             className="position-absolute scaleX-n1-rtl" data-app-dark-img="pages/pricing-arrow-dark.png"
                                             data-app-light-img="pages/pricing-arrow-light.png"/>
                                        <span className="badge badge-sm bg-label-primary ms-4 mt-2">Save upto 10%</span>
                                    </div>
                                </div>
                                <div className="row mx-0 gy-3">

                                    <div className="col-xl mb-lg-0 lg-4">
                                        <div className="card border shadow-none">
                                            <div className="card-body">
                                                <h3 className="fw-bold text-center text-uppercase mt-3">Starter</h3>
                                                <div className="my-4 py-2 text-center">
                                                    <img src="../../assets/img/icons/unicons/bookmark.png" alt="Starter Image"
                                                         height="80"/>
                                                </div>

                                                <div className="text-center mb-4">
                                                    <div className="mb-2 d-flex justify-content-center">
                                                        <sup className="h5 pricing-currency mt-3 mb-0 me-1">$</sup>
                                                        <h1 className="fw-bold h1 mb-0">0</h1>
                                                        <sub className="h5 pricing-duration mt-auto mb-2">/month</sub>
                                                    </div>
                                                </div>

                                                <ul className="ps-3 pt-4 pb-2 list-unstyled">
                                                    <li className="mb-2"><span
                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                        className="bx bx-check bx-xs"/></span> Rich landing pages
                                                    </li>
                                                    <li className="mb-2"><span
                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                        className="bx bx-check bx-xs"/></span> 100+ components
                                                    </li>
                                                    <li className="mb-2"><span
                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                        className="bx bx-check bx-xs"/></span> Basic support on Github
                                                    </li>
                                                </ul>

                                                <a href="auth-register-basic.html" className="btn btn-label-primary d-grid w-100">Get
                                                    started for free</a>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-xl mb-lg-0 lg-4">
                                        <div className="card border border-primary shadow-none">
                                            <div className="card-body">
                                                <div className="pricing-exclusive text-end m-n2">
                                                    <span className="badge bg-label-primary">Exclusive</span>
                                                </div>
                                                <h3 className="fw-bold text-center text-uppercase mt-2">Pro</h3>
                                                <div className="my-4 py-2 text-center">
                                                    <img src="../assets/img/icons/unicons/wallet-round.png" alt="Pro Image"
                                                         height="80"/>
                                                </div>
                                                <div className="text-center mb-4">
                                                    <div className="mb-2 d-flex justify-content-center">
                                                        <sup className="h5 pricing-currency mt-3 mb-0 me-1">$</sup>
                                                        <h1 className="price-toggle price-yearly fw-bold h1 mb-0">42</h1>
                                                        <h1 className="price-toggle price-monthly fw-bold h1 mb-0 d-none">49</h1>
                                                        <sub className="h5 pricing-duration mt-auto mb-2">/month</sub>
                                                    </div>
                                                    <small
                                                        className="position-absolute start-0 end-0 m-auto price-yearly price-yearly-toggle text-muted">$
                                                        499 / year</small>
                                                </div>

                                                <ul className="ps-3 pt-4 pb-2 list-unstyled">
                                                    <li className="mb-2"><span
                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                        className="bx bx-check bx-xs"/></span> Up to 5 users
                                                    </li>
                                                    <li className="mb-2"><span
                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                        className="bx bx-check bx-xs"/></span> 120+ components
                                                    </li>
                                                    <li className="mb-2"><span
                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                        className="bx bx-check bx-xs"/></span> Basic support on Github
                                                    </li>
                                                    <li className="mb-2"><span
                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                        className="bx bx-check bx-xs"/></span> Monthly updates
                                                    </li>
                                                    <li className="mb-2"><span
                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                        className="bx bx-check bx-xs"/></span> Integrations
                                                    </li>
                                                </ul>

                                                <a href="auth-register-basic.html" className="btn btn-primary d-grid w-100">Get
                                                    Started</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl">
                                        <div className="card border shadow-none">
                                            <div className="card-body">
                                                <h3 className="text-center text-uppercase fw-bold mt-3">Enterprise</h3>

                                                <div className="my-4 py-2 text-center">
                                                    <img src="../../assets/img/icons/unicons/briefcase-round.png" alt="Pro Image"
                                                         height="80"/>
                                                </div>

                                                <div className="text-center mb-4">
                                                    <div className="mb-2 d-flex justify-content-center">
                                                        <sup className="h5 pricing-currency mt-3 mb-0 me-1">$</sup>
                                                        <h1 className="price-toggle price-yearly fw-bold h1 mb-0">84</h1>
                                                        <h1 className="price-toggle price-monthly fw-bold h1 mb-0 d-none">99</h1>
                                                        <sub className="h5 pricing-duration mt-auto mb-2">/month</sub>
                                                    </div>
                                                    <small
                                                        className="position-absolute start-0 end-0 m-auto price-yearly price-yearly-toggle text-muted">$
                                                        999 / year</small>
                                                </div>

                                                <ul className="ps-3 pt-4 pb-2 list-unstyled">
                                                    <li className="mb-2"><span
                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                        className="bx bx-check bx-xs"/></span> Up to 10 users
                                                    </li>
                                                    <li className="mb-2"><span
                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                        className="bx bx-check bx-xs"/></span> 150+ components
                                                    </li>
                                                    <li className="mb-2"><span
                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                        className="bx bx-check bx-xs"/></span> Basic support on Github
                                                    </li>
                                                    <li className="mb-2"><span
                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                        className="bx bx-check bx-xs"/></span> Monthly updates
                                                    </li>
                                                    <li className="mb-2"><span
                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                        className="bx bx-check bx-xs"/></span> Integrations
                                                    </li>
                                                    <li className="mb-2"><span
                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                        className="bx bx-check bx-xs"/></span> Product Support
                                                    </li>
                                                    <li className="mb-2"><span
                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                        className="bx bx-check bx-xs"/></span> API access
                                                    </li>
                                                    <li className="mb-2"><span
                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                        className="bx bx-check bx-xs"/></span> Speedy build tooling
                                                    </li>
                                                </ul>

                                                <a href="auth-register-basic.html" className="btn btn-label-primary d-grid w-100">Get
                                                    Started</a>
                                            </div>
                                        </div>
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

export default Market;


