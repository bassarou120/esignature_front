import axios from "axios";
import React from "react";
import ReactDOM from 'react-dom';
import TableList from "../TableList";
import ModelList from "../ModelList";
import store from "../../store";
import {changeModal} from "../../actions";
import $ from 'jquery';
import Sidebar from "../Sidebar";
import NavB from "../Nav";
import {Link} from "react-router-dom";
import Footer from "../Footer";
window.$ = $;

const Models = () => {

    function openChoiceModal() {
        store.dispatch( changeModal({ model:  1}) );
    }

    window.store = store;
    window.changeModal = changeModal;
    const s= store.getState();

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
                            <div className="d-flex justify-content-between mb-3">
                                <h4 className="fw-bold py-1 ">
                                    <span className="text-muted fw-light">Modèles</span>
                                </h4>

                                <div className="">
                                    <div className="demo-inline-spacing">
                                        <button type="button"  className="btn btn-primary"  data-bs-toggle="modal"
                                                data-bs-target="#onboardingSlideModal" onClick={openChoiceModal}>
                                            <span className="tf-icons bx bx-plus"/>&nbsp;Modèle
                                        </button>
                                    </div>
                                </div>
                                {/*<ModalChoice/>*/}
                            </div>
                            <div className="card p-2">
                                <ModelList />
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

export default Models;


