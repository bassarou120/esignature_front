import React from "react";
import ReactDOM from 'react-dom';


const DCertificatedList = ( ) => {

    return (
        <div className="row justify-content-md-center">
            <div className="col col-lg-1"/>
            <div className="col-lg-10">
                <div className="demo-inline-spacing mt-3">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <div className="d-flex justify-content-between p-1">
                                <div className="left">
                                    <div className="d-flex justify-content-start align-items-center">
                                        <span className="fa fa-file-signature fa-2x"/>
                                        <div className="ml-2 d-flex flex-column"><span className="emp_name text-truncate">document2.pdf</span><small
                                            className="emp_post text-truncate text-muted">Taille:356 ko</small></div>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="d-flex ">
                                        <div className="dropdown m-2">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"><i className="bx bx-dots-vertical-rounded"/>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="!#"><i className="bx bx-download me-1"/> Télécharger</a>
                                                <a className="dropdown-item" href="!#"><i className="bx bx-trash me-1"/> Supprimer</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </li>
                    </ul>
                </div>
            </div>
            <div className="col col-lg-1"/>
        </div>

    );
}

export default DCertificatedList;
