import axios from "axios";
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Link, Route} from "react-router-dom";
import {decrypt} from '../Helper'
import $ from 'jquery';
import Sidebar from "../Sidebar";
import NavB from "../Nav";
import Footer from "../Footer";
window.$ = $;

function Dashboard(props) {
    const [pendingSending, setPendingSending] = useState([ ]);

    useEffect(() => {
        getSending();
    }, [])

    let id_user=decrypt(localStorage.getItem('userId'));

    function getSending(){
            axios
                .get(process.env.REACT_APP_API_BASE_URL+'sendings/get/top/'+id_user+'/user',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    params:{
                        rows:6
                    }
                })
                .then(response => {
                    if(response.data.success === true){
                        setPendingSending(response.data.data);
                    }
                });
    }

    function imagerender(type){
        if(type==='Signature avancée'){
            return '<span class="avatar-initial rounded-circle success"><i class="bx bx-certification"></i></span>'
        }
        else if(type==='Signature Simple'){
            return '<span className="avatar-initial rounded-circle primary"><i className="fa fa-mouse-pointer"></i></span>'
        }
        else if(type==='Envois recommandés'){
            return '<span className="avatar-initial rounded-circle danger"><i className="bx bxs-envelope"></i></span>'
        }

    }

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
                            <div className="row">

                                <div className="col-lg-6 mb-4 order-0">
                                    <div className="card">
                                        <div className="d-flex align-items-end row">
                                            <div className="col-sm-7">
                                                <div className="card-body">
                                                    <h5 className="card-title text-primary">Bienvenu {props.userinfo.name} 👋 </h5>
                                                    <p className="mb-4">
                                                        Nous sommes heureux de vous retrouver. Votre tableau de bord reste à jour.
                                                    </p>
                                                    {/*<a href="#" className="btn btn-sm btn-outline-primary">View Badges</a>*/}
                                                </div>
                                            </div>
                                            <div className="col-sm-5 text-center text-sm-left">
                                                <div className="card-body pb-0 px-0 px-md-4">
                                                    <img
                                                        src="../assets/img/illustrations/man-with-laptop-light.png"
                                                        height="140"
                                                        alt="View Badge User"
                                                        data-app-dark-img="illustrations/man-with-laptop-dark.png"
                                                        data-app-light-img="illustrations/man-with-laptop-light.png"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-4 order-1">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-12 col-4 mb-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-title d-flex align-items-start justify-content-between">
                                                        <div className="avatar flex-shrink-0">
                                                            <span className="avatar-initial rounded-circle bg-success"><i className="bx bx-certification"></i></span>
                                                        </div>
                                                        <div className="dropdown">
                                                            <button
                                                                className="btn p-0"
                                                                type="button"
                                                                id="cardOpt3"
                                                                data-bs-toggle="dropdown"
                                                                aria-haspopup="true"
                                                                aria-expanded="false"
                                                            >
                                                                <i className="bx bx-dots-vertical-rounded"></i>
                                                            </button>
                                                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                                                                <a className="dropdown-item" href="#">View More</a>
                                                                <a className="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="fw-semibold d-block mb-1">Signature Avancée</span>
                                                    <h3 className="card-title mb-2">12</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-12 col-4 mb-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-title d-flex align-items-start justify-content-between">
                                                        <div className="avatar flex-shrink-0">
                                                            <span className="avatar-initial rounded-circle bg-primary"><i className="fa fa-mouse-pointer"></i></span>
                                                        </div>
                                                        <div className="dropdown">
                                                            <button
                                                                className="btn p-0"
                                                                type="button"
                                                                id="cardOpt6"
                                                                data-bs-toggle="dropdown"
                                                                aria-haspopup="true"
                                                                aria-expanded="false"
                                                            >
                                                                <i className="bx bx-dots-vertical-rounded"/>
                                                            </button>
                                                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                                                                <a className="dropdown-item" href="#">View More</a>
                                                                <a className="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span>Signature simple</span>
                                                    <h3 className="card-title text-nowrap mb-1">4</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-12 col-4 mb-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-title d-flex align-items-start justify-content-between">
                                                        <div className="avatar flex-shrink-0">
                                                            <span className="avatar-initial rounded-circle bg-danger"><i className="bx bxs-envelope"></i></span>
                                                        </div>
                                                        <div className="dropdown">
                                                            <button
                                                                className="btn p-0"
                                                                type="button"
                                                                id="cardOpt6"
                                                                data-bs-toggle="dropdown"
                                                                aria-haspopup="true"
                                                                aria-expanded="false"
                                                            >
                                                                <i className="bx bx-dots-vertical-rounded"/>
                                                            </button>
                                                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                                                                <a className="dropdown-item" href="#">View More</a>
                                                                <a className="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span>Envois Recommandé</span>
                                                    <h3 className="card-title text-nowrap mb-1">4</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-12 col-lg-12 order-2 mb-4">
                                    <div className="card h-100">

                                        <div className="card-header d-flex align-items-center justify-content-between">
                                            <h5 className="card-title m-0 me-2">Envois en cours</h5>
                                              <div className="">
                                                <Link to='/listingsending/pending' className="btn btn-primary text-white" >
                                                   Plus
                                                </Link>
                                              </div>
                                        </div>
                                        <div className="card-body">
                                            <ul className="p-0 m-0">
                                                {pendingSending.length===0 && <h5 className="text-center mt-2">
                                                    Aucun envoi en cours.
                                                </h5>}
                                                {pendingSending.map((l, k) =>
                                                    <li key={k} className="d-flex mb-4 pb-1">
                                                        <Link to={"/detail/sending/"+l.id}>
                                                            <div className="avatar flex-shrink-0 me-3">
                                                                {
                                                                    l.type_signature[0].name==='Signature avancée'
                                                                        ?
                                                                        <span className="avatar-initial rounded-circle bg-success"><i className="bx bx-certification"></i></span>
                                                                        :
                                                                        l.type_signature[0].name==='Signature simple'
                                                                            ?
                                                                            <span className="avatar-initial rounded-circle bg-primary"><i className="fa fa-mouse-pointer"></i></span>
                                                                            :
                                                                            l.type_signature[0].name === 'Envois recommandés'
                                                                                ?
                                                                                <span className="avatar-initial rounded-circle bg-danger"><i className="bx bxs-envelope"></i></span>
                                                                                :
                                                                                <p> ... </p>
                                                                }

                                                            </div>
                                                        </Link>
                                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                                            <div className="me-2">
                                                                <small className="text-muted d-block mb-1">{l.type_signature[0].name}</small>
                                                                <h6 className="mb-0">{l.document[0].title}</h6>
                                                            </div>
                                                            <div className="user-progress d-flex align-items-center gap-1">
                                                                <h6 className="mb-0"></h6> <span className="text-muted">{l.created_at}</span>
                                                            </div>
                                                        </div>

                                                    </li>
                                                )}
                                            </ul>
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

export default Dashboard;

if (document.getElementById('example')) {
    ReactDOM.render(<Dashboard />, document.getElementById('example'));
}
