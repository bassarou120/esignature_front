import axios from "axios";
import React, {useEffect} from "react";
import ReactDOM from 'react-dom';
import ModelList from "../ModelList";
import DCertificatedList from "../DCertificatedList";
import Sidebar from "../Sidebar";
import NavB from "../Nav";
import ProfileUlHeader from "../Sample/ProfileUlHeader";
import Footer from "../Footer";


const CDocument = ( ) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = '../assets/js/cdocument.js';
        document.body.appendChild(script);

    }, [])
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

                            <div className=" d-flex justify-content-between mb-3">
                                <h4 className="fw-bold py-1 ">
                                    <span className="text-muted fw-light">Documents certifiés</span>
                                </h4>

                                <div className="">
                                    <div className="demo-inline-spacing">
                                        <div className="btn-group me-3">
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-primary dropdown-toggle"
                                                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="bx bx-filter-alt"/>
                                                    Filtrer
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-end w-px-350" >
                                                    <form className="p-3" onSubmit={console.log('here')}>
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleDropdownFormEmail1" className="form-label">Date</label>
                                                            <div className="row mb-1">
                                                                <div className="col-md-6">
                                                                    <div className="form-check mt-3">
                                                                        <input name="default-radio-1" className="form-check-input"
                                                                               type="radio" value="" id="defaultRadio1"/>
                                                                        <label className="form-check-label" htmlFor="defaultRadio1">
                                                                            Aucun
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-check ">
                                                                        <input name="default-radio-1" className="form-check-input"
                                                                               type="radio" value="" id="defaultRadio1"/>
                                                                        <label className="form-check-label" htmlFor="defaultRadio1">
                                                                            Aujourd'hui
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mb-1">
                                                                <div className="col-md-6">
                                                                    <div className="form-check mt-3">
                                                                        <input name="default-radio-1" className="form-check-input"
                                                                               type="radio" value="" id="defaultRadio1"/>
                                                                        <label className="form-check-label" htmlFor="defaultRadio1">
                                                                            Cette Semaine
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-check ">
                                                                        <input name="default-radio-1" className="form-check-input"
                                                                               type="radio" value="" id="defaultRadio1"/>
                                                                        <label className="form-check-label" htmlFor="defaultRadio1">
                                                                            Ce mois
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mb-1">
                                                                <div className="col-md-6">
                                                                    <div className="form-check mt-3">
                                                                        <input name="default-radio-1" className="form-check-input"
                                                                               type="radio" value="" id="defaultRadio1"/>
                                                                        <label className="form-check-label" htmlFor="defaultRadio1">
                                                                            Cette année
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-check ">
                                                                        <input name="default-radio-1" className="form-check-input"
                                                                               type="radio" value="" id="defaultRadio6"/>
                                                                        <label className="form-check-label" htmlFor="defaultRadio1">
                                                                            Personnalisée
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <div className="mb-3">
                                                                <label htmlFor="select2Basic" className="form-label">Membre</label>
                                                                <select id="select2Basic" className="select2 form-select form-select-lg"
                                                                        data-allow-clear="true">
                                                                    <option value="">Tout</option>
                                                                    <option value="AK">Alaska</option>
                                                                    <option value="HI">Hawaii</option>
                                                                    <option value="CA">California</option>
                                                                    <option value="NV">Nevada</option>
                                                                    <option value="OR">Oregon</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="dropdown-divider"/>
                                                        <div className="d-flex justify-content-between">
                                                            <button type="button" className="btn btn-label-secondary">Annuler</button>
                                                            <button type="submit" className="btn btn-label-success">Appliquer</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DCertificatedList/>
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

export default CDocument;


