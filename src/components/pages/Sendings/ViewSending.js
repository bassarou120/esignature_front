import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, useParams} from "react-router-dom";
import Sidebar from "../../Sidebar";
import NavB from "../../Nav";
import Footer from "../../Footer";
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import {OverlayTrigger} from "react-bootstrap";
import './customStyle.css';


const ViewSending = ( ) => {
    const  { id } = useParams();
    const [sendingData, setSendingData] = useState([ ]);
    const [sendingStatutBySignataire, setSendingStatutBySignataire] = useState([]);
    const [sendingStatutByValidataire, setSendingStatutByValidataire] = useState([]);
    const [cc, setCc] = useState([ ]);
    const [folder, setFolder] = useState('');
    const [display_detail, setDisplayDetail] = useState(false);
    const [docIsSigned, setDocIsSigned] = useState(false);
    const [haveProofFile, setHaveProofFile] = useState(false);
    const [fileName, setFileName] = useState('');
    var indents = [];
    const [loader, setLoader] = useState(true);


    useEffect(() => {
        getSendingDetail();
        getCc();
        getSignataireAndStatus();
        getValidataireStatus();
        const interval = setInterval(() => {
            getSignataireAndStatus();
            getSendingDetail();
        },45*1000);
        return () => clearInterval(interval);

    }, [docIsSigned])


    const getSendingDetail = (e) => {
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'sendings/'+id,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success === true){
                    if(response.data.data.is_config){
                        setDisplayDetail(true);
                        setSendingData(response.data.data);
                        var f =response.data.data['document']?.[0]?.preview;
                        const myArray = f.split("/");
                        setFolder(myArray[0]);
                        setLoader(false);
                        var n =response.data.data['document']?.[0]?.file
                        setFileName(n.split('.pdf')[0]);
                        if(response.data.data.statut[0].name ==='FINIR'){
                            console.log('here');
                            setDocIsSigned(true)
                            if(response.data.data.type_signature[0].type !=='recommandes'){
                                setHaveProofFile(true)
                            }
                        }

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
            .get(process.env.REACT_APP_API_BASE_URL+'sendings/get/all/signataire/laststatut/'+id,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success === true){
                    setSendingStatutBySignataire(response.data.data);
                }
            });
    }

    const getCc = (e) => {
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'sendings/get/all/cc/'+id,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success === true){
                    setCc(response.data.data);
                }
            });
    }

    const getValidataireStatus = (e)=>{
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'sendings/get/all/validataire/laststatut/'+id,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success === true){
                    setSendingStatutByValidataire(response.data.data);
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
        indents.push(<div key={i} className="list-group-item"><img className="d-flex justify-content-between w-100" src={process.env.REACT_APP_BACKEND_ASSET_BASE_URL+"previews/"+folder+'/'+i+'.jpeg'} width="115"/></div>);
    }

    function displayCollapse(){
        var signataireCollapse =[];
        if(loader===false && Object.keys(sendingStatutBySignataire).length !==0) {
            for (var i = 0; i < Object.keys(sendingStatutBySignataire).length; i++) {
                var list_statut=[];
                var date=[];
                if(sendingStatutBySignataire[Object.keys(sendingStatutBySignataire)[i]].length){
                    for (var y=0; y<sendingStatutBySignataire[Object.keys(sendingStatutBySignataire)[i]].length;y++){
                        list_statut.push(sendingStatutBySignataire[Object.keys(sendingStatutBySignataire)[i]][y].statut)
                        date.push( sendingStatutBySignataire[Object.keys(sendingStatutBySignataire)[i]][y].date)
                    }
                }
                else{
                    list_statut.push(sendingStatutBySignataire[Object.keys(sendingStatutBySignataire)[i]].statut)
                }
                var dte ='';

                signataireCollapse.push(
                    <div key={i} className="card accordion-item active">
                        <h2 className="accordion-header" id="headingOne">
                            <button type="button" className="accordion-button" data-bs-toggle="collapse"
                                    data-bs-target={'#accordion'+i} aria-expanded="true" aria-controls={'accordion'+i}>
                                {Object.keys(sendingStatutBySignataire)[i]}
                            </button>
                        </h2>
                        <div id={'accordion'+i} className="accordion-collapse collapse show"
                             data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div className="row">
                                    <div className="col-md-1"></div>
                                    {/*{list_statut.includes('MAIL_ENVOYER')==true ? dte = date[list_statut.indexOf('MAIL_ENVOYER')]  : ''}*/}
                                    <div className="col-md-2">
                                        <OverlayTrigger trigger="click" placement="right" overlay={popover(list_statut.includes('ENVOYER'),'ENVOYER',date[list_statut.indexOf('ENVOYER')])}>
                                            <a className="nav-link dropdown-toggle hide-arrow" href="#"
                                               data-bs-toggle="dropdown">
                                                <div className={`avatar ${list_statut.includes('ENVOYER') ? "avatar-online" : "avatar-offline"}`}>
                                                    <img src="/assets/img/icons/esignature/paper-plane.png" alt=""
                                                         className="w-px-40 h-auto rounded-circle"/>
                                                </div>
                                            </a>
                                        </OverlayTrigger>

                                    </div>
                                    <div className="col-md-2">
                                        {/*{list_statut.includes('MAIL_REMIS')==true ? dte = date[list_statut.indexOf('MAIL_REMIS')]  : ''}*/}
                                        <OverlayTrigger trigger="click" placement="right" overlay={popover(list_statut.includes('MAIL_REMIT'),'MAIL_REMIT',date[list_statut.indexOf('MAIL_REMIT')])}>
                                        <a className="nav-link dropdown-toggle hide-arrow" href="#"
                                           data-bs-toggle="dropdown">
                                            <div className={`avatar ${list_statut.includes('MAIL_REMIT') ? "avatar-online" : "avatar-offline"}`}>
                                                <img src="/assets/img/icons/esignature/mail.png" alt=""
                                                     className="w-px-40 h-auto rounded-circle"/>
                                            </div>
                                        </a>
                                        </OverlayTrigger>
                                    </div>
                                    <div className="col-md-2">
                                        <OverlayTrigger trigger="click" placement="right" overlay={popover(list_statut.includes('OPENED_EMAIL_MESSAGE'),'OPENED_EMAIL_MESSAGE',date[list_statut.indexOf('OPENED_EMAIL_MESSAGE')])}>
                                        <a className="nav-link dropdown-toggle hide-arrow" href="#"
                                           data-bs-toggle="dropdown">
                                            <div className={`avatar ${list_statut.includes('OPENED_EMAIL_MESSAGE') ? "avatar-online" : "avatar-offline"}`}>
                                                <img src="/assets/img/icons/esignature/open.png" alt=""
                                                     className="w-px-40 h-auto rounded-circle"/>
                                            </div>
                                        </a>
                                        </OverlayTrigger>
                                    </div>
                                    <div className="col-md-2">
                                        <OverlayTrigger trigger="click" placement="right" overlay={popover(list_statut.includes('OUVRIR'),'OUVRIR',date[list_statut.indexOf('OUVRIR')])}>
                                        <a className="nav-link dropdown-toggle hide-arrow" href="#"
                                           data-bs-toggle="dropdown">
                                            <div className={`avatar ${list_statut.includes('OUVRIR') ? "avatar-online" : "avatar-offline"}`}>
                                                <img src="/assets/img/icons/esignature/folder.png" alt=""
                                                     className="w-px-40 h-auto rounded-circle"/>
                                            </div>
                                        </a>
                                        </OverlayTrigger>
                                    </div>
                                    <div className="col-md-2">
                                        <OverlayTrigger trigger="click" placement="right" overlay={popover(list_statut.includes('SIGNER'),'SIGNER',dte = date[list_statut.indexOf('SIGNER')])}>
                                        <a className="nav-link dropdown-toggle hide-arrow" href="#"
                                           data-bs-toggle="dropdown">
                                            <div className={`avatar ${list_statut.includes('SIGNER') ? "avatar-online" : "avatar-offline"}`}>
                                                <img src="/assets/img/icons/esignature/contract.png" alt=""
                                                     className="w-px-40 h-auto rounded-circle"/>
                                            </div>
                                        </a>
                                        </OverlayTrigger>
                                    </div>

                                    <div className="col-md-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
            return signataireCollapse;
        }
        else{
            signataireCollapse.push(
                <div key="0" className="card accordion-item active">
                    <h2 className="accordion-header" id="headingOne">
                        <button type="button" className="accordion-button" data-bs-toggle="collapse"
                                data-bs-target="#accordion0" aria-expanded="true" aria-controls="accordion0">
                           Signataire
                        </button>
                    </h2>
                    <div id="accordion0" className="accordion-collapse collapse show"
                         data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-2">
                                        <a className="nav-link dropdown-toggle hide-arrow" href="#"
                                           data-bs-toggle="dropdown">
                                            <div className="avatar avatar-offline">
                                                <img src="/assets/img/icons/esignature/paper-plane.png" alt=""
                                                     className="w-px-40 h-auto rounded-circle"/>
                                            </div>
                                        </a>
                                </div>
                                <div className="col-md-2">
                                        <a className="nav-link dropdown-toggle hide-arrow" href="#"
                                           data-bs-toggle="dropdown">
                                            <div className="avatar avatar-offline">
                                                <img src="/assets/img/icons/esignature/mail.png" alt=""
                                                     className="w-px-40 h-auto rounded-circle"/>
                                            </div>
                                        </a>
                                </div>
                                <div className="col-md-2">
                                        <a className="nav-link dropdown-toggle hide-arrow" href="#"
                                           data-bs-toggle="dropdown">
                                            <div className="avatar avatar-offline">
                                                <img src="/assets/img/icons/esignature/open.png" alt=""
                                                     className="w-px-40 h-auto rounded-circle"/>
                                            </div>
                                        </a>
                                </div>
                                <div className="col-md-2">
                                        <a className="nav-link dropdown-toggle hide-arrow" href="#"
                                           data-bs-toggle="dropdown">
                                            <div className="avatar avatar-offline">
                                                <img src="/assets/img/icons/esignature/folder.png" alt=""
                                                     className="w-px-40 h-auto rounded-circle"/>
                                            </div>
                                        </a>
                                </div>
                                <div className="col-md-2">
                                        <a className="nav-link dropdown-toggle hide-arrow" href="#"
                                           data-bs-toggle="dropdown">
                                            <div className="avatar avatar-offline">
                                                <img src="/assets/img/icons/esignature/contract.png" alt=""
                                                     className="w-px-40 h-auto rounded-circle"/>
                                            </div>
                                        </a>
                                </div>

                                <div className="col-md-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
            return signataireCollapse;
        }
    }

    const getTheMessage=(has_error,el,dte)=>{
        var rtn ='';
        if(has_error===false){
            switch(el) {
                case 'ENVOYER':
                    rtn ='Erreur de l\'envois du mail. Veuillez vérifier l\'adresse mail que vous avez renseigner';
                    break;
                case 'MAIL_REMIT':
                    rtn ='Le mail n\'a pas pu atteindre son destinataire';
                    break;
                case 'OPENED_EMAIL_MESSAGE':
                    rtn ='Mail non ouvert';
                    break;
                case 'OUVRIR':
                    rtn ='Document non ouvert';
                    break;
                case 'SIGNER':
                    rtn ='Document non signer';
                    break;
                default:
                // code block
            }
        }
        else{
            switch(el) {
                case 'ENVOYER':
                    rtn ='Mail envoyer avec succes le '+dte+'';
                    break;
                case 'MAIL_REMIT':
                    rtn ='Mail reçu le '+dte+'';
                    break;
                case 'OPENED_EMAIL_MESSAGE':
                    rtn ='Mail ouvert le '+dte+'';
                    break;
                case 'OUVRIR':
                    rtn ='Document ouvert le '+dte+'';
                    break;
                case 'SIGNER':
                    rtn ='Document signer le '+dte+'';
                    break;
                default:
                // code block
            }
        }
       return rtn ;
    }

    const popover=(has_error,el,dte) => (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Detail</Popover.Header>
            <Popover.Body>
                {getTheMessage(has_error, el,dte)}
            </Popover.Body>
        </Popover>
    );

    const downloadSigned =()=>{
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'sendings/download/signed/document/'+id,{
                headers: {
                    'Content-Type': 'application/pdf',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {

            }).catch(function (error) {
            if (error.response) {
            }
        });
    }
    const downloadOriginal =()=>{
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'sendings/download/original/document/'+id,{
                headers: {
                    'Content-Type': 'application/pdf',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {

            }).catch(function (error) {
            if (error.response) {
            }
        });
    }
    const downloadProof =()=>{
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'sendings/download/proof/document/'+id,{
                headers: {
                    'Content-Type': 'application/pdf',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(response => {

            }).catch(function (error) {
            if (error.response) {
            }
        });
    }

    if(loader===true){
        return (<div className="d-flex justify-content-center">
            <div className={`spinner-grow text-primary text-center ${loader ? "" : "d-none"}`}  role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>)
    }
    else{
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
                                            <h6 className="text-muted">Statut de l'opération de signature </h6>
                                            <div className="accordion mt-3" id="accordionExample">
                                                {displayCollapse()}
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
                                                                    <button className="btn btn-icon btn-outline-danger "><i className="fa fa-trash"></i></button>
                                                                </div>
                                                            </li>)}

                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2 row">
                                                {sendingStatutByValidataire.length !== 0 &&  <div>
                                                    <small className="text-light fw-semibold">Validataires</small>
                                                    <div className="card h-100">
                                                        <div className="card-body">
                                                            <ul className="p-0 m-0">
                                                                {sendingStatutByValidataire.map((l, k) => <li key={k} className="d-flex mb-4 pb-1">
                                                                    <div className="avatar flex-shrink-0 me-3">
                                                                        <img
                                                                            src="/assets/img/icons/esignature/stamp.png"
                                                                            alt="User" className="rounded"/>
                                                                    </div>
                                                                    <div
                                                                        className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                                                        <div className="me-2">
                                                                            <small
                                                                                className="text-muted d-block mb-1">{l.signataires[0].email}</small>
                                                                            <h6 className="mb-0">{l.signataires[0].name}</h6>
                                                                        </div>
                                                                        <div
                                                                            className="user-progress d-flex align-items-center gap-1">
                                                                            <h6 className="mb-0">{l.created_at}</h6>
                                                                        </div>
                                                                    </div>
                                                                </li>)}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>}
                                            </div>
                                            <div className="mt-3 row">
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
                                                            <a className={`btn btn-primary m-1  ${docIsSigned ? "" : "disabled"}`} href={process.env.REACT_APP_BACKEND_ASSET_BASE_URL+'documents/'+fileName+'_signer.pdf'} download={fileName+'_signer'} target="_blank">
                                                                <span className="fa fa-download"></span>
                                                                Document signer
                                                            </a>
                                                            <a className="btn btn-primary m-1" href={process.env.REACT_APP_BACKEND_ASSET_BASE_URL+'documents/'+sendingData.document[0].file} download={fileName} target="_blank"  type="application/pdf">
                                                                <span className="fa fa-download"></span>
                                                                Document original
                                                            </a>
                                                            <a className={`btn btn-primary m-1  ${haveProofFile ? "" : "disabled"}`} href={process.env.REACT_APP_BACKEND_ASSET_BASE_URL+'documents/'+fileName+'_proof.pdf'} download={fileName+'_proof'} target="_blank">
                                                                <span className="fa fa-download"></span>
                                                                Document probant
                                                            </a>
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
}

export default ViewSending;


