import axios from "axios";
import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, useParams} from "react-router-dom";
import Sidebar from "../../Sidebar";
import NavB from "../../Nav";
import Footer from "../../Footer";



const ViewSending = ( ) => {
    const  { id } = useParams();
    const [sendingData, setSendingData] = useState([ ]);
    const [sendingStatutBySignataire, setSendingStatutBySignataire] = useState([ ]);
    const [cc, setCc] = useState([ ]);
    const [folder, setFolder] = useState('');
    const [display_detail, setDisplayDetail] = useState(false);
    var indents = [];
     /*const [numPages, setNumPages] = useState(null);
     const [pageNumber, setPageNumber] = useState(1);*/


    useEffect(() => {
        getSendingDetail();
        getSignataireAndStatus();
        getCc();

       // pdf && renderPage();
       // showPdf();
    }, [])

    const getSendingDetail = (e) => {
        axios
            .get('/esignature/sendings/'+id)
            .then(response => {
                if(response.data.success === true){
                    if(response.data.data.is_config){
                        setDisplayDetail(true);
                        setSendingData(response.data.data);
                        var f =response.data.data['document']?.[0]?.preview;
                        const myArray = f.split("/");
                        setFolder(myArray[0]);
                        // var n =response.data.data["document"]?.[0]?.nbre_page;
                        //
                        // for (var i = 1; i <= n; i++) {
                        //     indents.push(<div key={i} className="list-group-item"><img className="d-flex justify-content-between w-100" src={"/previews/"+folder+'/'+i+'.jpeg'} width="115"/></div>);
                        // }

                    }
                    else{
                        setDisplayDetail(false);
                    }

                }
            }).catch(function (error) {
            if (error.response) {
                if(error.response.status===404){
                   setDisplayDetail(false);
                }
            }
        });
    }

    const getSignataireAndStatus = (e) => {
        axios
            .get('/esignature/sendings/get/all/signataire/laststatut/'+id)
            .then(response => {
                if(response.data.success === true){
                    setSendingStatutBySignataire(response.data.data);
                }
            });
    }

    const getCc = (e) => {
        axios
            .get('/esignature/sendings/get/all/cc/'+id)
            .then(response => {
                if(response.data.success === true){
                    setCc(response.data.data);
                }
            });
    }

    const unknowSending = (e) => {
        return (
            <div className=" text-center container-xxl container-p-y">
            <div className="misc-wrapper">
            <h2 className="mb-2 mx-2">Impossible d'afficher cet element :(</h2>
            <p className="mb-4 mx-2">Oops! 😖 Elément inconnue du serveur.</p>
            <div className="mt-3">
                <img src="../../assets/img/illustrations/page-misc-error-light.png" alt="page-misc-error-light" width="500"
                     className="img-fluid" data-app-dark-img="illustrations/page-misc-error-dark.png"
                     data-app-light-img="illustrations/page-misc-error-light.png"/>
            </div>
            </div>
            </div>
        )
    }

    var n =sendingData["document"]?.[0]?.nbre_page;
    for (var i = 1; i <= n; i++) {
        indents.push(<div key={i} className="list-group-item"><img className="d-flex justify-content-between w-100" src={"/previews/"+folder+'/'+i+'.jpeg'} width="115"/></div>);
    }

    return !display_detail ? ( unknowSending() ) :
    (
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
                                    <span className="text-muted fw-light">Détail de l'envoi</span>
                                </h4>
                            </div>

                            <div className="row">
                                <div className="col-md-8">
                                    <h6 className="text-muted">Signataires et étape de votre document</h6>
                                    <div className="accordion mt-3" id="accordionExample">
                                        {sendingStatutBySignataire.map((l, k) => <div key={k} className="card accordion-item active">
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button type="button" className="accordion-button" data-bs-toggle="collapse"
                                                            data-bs-target={'#accordion'+k} aria-expanded="true" aria-controls={'accordion'+k}>
                                                        {l.signataires?.[0]?.name} ({l.signataires?.[0]?.email})
                                                    </button>
                                                </h2>
                                                <div id={'accordion'+k} className="accordion-collapse collapse show"
                                                     data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className="row">
                                                            <div className="col-md-1"></div>
                                                            <div className="col-md-2">
                                                                <p>
                                                                    <span className="fa fa-close text-danger"></span>
                                                                    <br/>
                                                                    E-mail envoyé
                                                                </p>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <span className="fa fa-close text-danger"></span>
                                                                <br/>
                                                                E-mail remis
                                                            </div>
                                                            <div className="col-md-2">
                                                                <span className="fa fa-close text-danger"></span>
                                                                <br/>
                                                                E-mail ouvert
                                                            </div>
                                                            <div className="col-md-2">
                                                                <span className="fa fa-close text-danger"></span>
                                                                <br/>
                                                                Document ouvert
                                                            </div>
                                                            <div className="col-md-2">
                                                                <span className="fa fa-close text-danger"></span>
                                                                <br/>
                                                                Document signé
                                                            </div>
                                                            <div className="col-md-1"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-2 row">
                                        <div className="col-lg-6">
                                            {cc.length!==0 && <small className="text-light fw-semibold">Personnes en copie du mail</small>}
                                            <div className="demo-inline-spacing mt-3">
                                                <ul className="list-group">
                                                    {cc.map((l, k) =><li key={k} className="list-group-item d-flex justify-content-between align-items-center">
                                                        {l?.name} <i className="m-2">{l.email}</i>
                                                        <div className="d-flex justify-content-end">
                                                            <button className="btn btn-icon btn-outline-primary ml-1"><i className="fa fa-pen"></i></button>
                                                            <button className="btn btn-icon btn-outline-danger "><i className=" fa fa-trash"></i></button>
                                                        </div>
                                                    </li>)}

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 row">
                                        <div className="col-lg-6">
                                            <small className="text-light fw-semibold">Messages</small>
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5>Message:</h5>
                                                    {sendingData['message']}
                                                    <h5>Objet</h5>
                                                    {sendingData['objet']}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="nav-align-top mb-4">
                                        <ul className="nav nav-tabs" role="tablist">
                                            <li className="nav-item">
                                                <button type="button" className="nav-link active" role="tab" data-bs-toggle="tab"
                                                        data-bs-target="#navs-top-home" aria-controls="navs-top-home" aria-selected="true">Document
                                                </button>
                                            </li>
                                            <li className="nav-item">
                                                <button type="button" className="nav-link" role="tab" data-bs-toggle="tab"
                                                        data-bs-target="#navs-top-profile" aria-controls="navs-top-profile"
                                                        aria-selected="false">Détails
                                                </button>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            <div className="tab-pane fade show active" id="navs-top-home" role="tabpanel">
                                                <div className="list-group text-center" style={{"height":"220px","width":"auto","overflowY":"auto"}} >
                                                    {indents}
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="navs-top-profile" role="tabpanel">
                                                <p> <b>Envoyer par: </b> {sendingData["created_by"]?.[0]?.name} </p>
                                                <p> <b>Envoyer le : </b> {sendingData["created_at"]} </p>
                                                <div className="text-center">
                                                    <button className="btn btn-primary m-1">
                                                        <span className="fa fa-download"></span>
                                                        Document signer
                                                    </button>
                                                    <button className="btn btn-primary m-1">
                                                        <span className="fa fa-download"></span>
                                                        Document original
                                                    </button>
                                                    <button className="btn btn-primary m-1">
                                                        <span className="fa fa-download"></span>
                                                        Document probant
                                                    </button>
                                                </div>
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

export default ViewSending;


