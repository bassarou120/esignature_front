import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import $ from 'jquery';
import Sidebar from "../../Sidebar";
import NavB from "../../Nav";
import ProfileUlHeader from "../../Sample/ProfileUlHeader";
import Footer from "../../Footer";
import Modal from "react-bootstrap/Modal";


window.$ = $;


const AddMoreConfig = (props) => {

    const [objet, setObjet] = useState('');
    const [message, setMessage] = useState('');
    const [expiration, setExpiration] = useState('Aucun');
    const [rappel, setRappel] = useState('Aucun');
    const location = useLocation();
    const [display_detail, setDisplayDetail] = useState(false);
    const [widget, setWidget] = useState('');
    const [sending, setSending] = useState([]);
   // const signataires = getStateVal(location).length === 0 ? JSON.parse(localStorage.getItem('signataires')) : getStateVal(location);
    const signataires = JSON.parse(localStorage.getItem('signataires'));
   // console.log(signataires);
    const [signataireAndValidataire, setSignataireAndValidataire] = useState([])
    //const [cc, setCc] = useState([{ name: "", email : ""}])
    const [cc, setCc] = useState([])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let handleChange = (i, e) => {
        let newFormValues = [...signataireAndValidataire];
        if(sending.type_signature[0].type==='avanced'){
            if(e.target.name==='type' ){
                if(e.target.value==='Signataire'){
                    window['showErrorToast']('Vous ne pouvez pas changer le type de ce signataire')
                    newFormValues[i][e.target.name] ='Signataire';
                    return ;
                }
                else{
                    window['showErrorToast']('Le type de ce signataire ne peut etre changer')
                    newFormValues[i][e.target.name] ='Validataire';
                    return ;
                }
            }
            else{
                newFormValues[i][e.target.name] = e.target.value;
            }
        }
        else{
            newFormValues[i][e.target.name] = e.target.value;
        }
        setSignataireAndValidataire(newFormValues);
    }

    let addFormFields = () => {
        if(localStorage.getItem('type_signature') ==='avanced'){
            setSignataireAndValidataire([...signataireAndValidataire, { name: "", email: "",type:"Validataire" }])
        }
        else{
            setSignataireAndValidataire([...signataireAndValidataire, { name: "", email: "",type:"" }])
        }

    }

    let removeFormFields = (i) => {
        let newFormValues = [...signataireAndValidataire];
        newFormValues.splice(i, 1);
        setSignataireAndValidataire(newFormValues)
    }

    let handleChangeCc = (i, e) => {
        let newFormValues = [...cc];
        newFormValues[i][e.target.name] = e.target.value;
        setCc(newFormValues);
    }

    let addFormFieldsCc = () => {
        setCc([...cc, { name: "", email: "" }])
    }

    let removeFormFieldsCc = (i) => {
        let newFormValues = [...cc];
        newFormValues.splice(i, 1);
        setCc(newFormValues)
    }

    function getStateVal(ele) {
        if (typeof (ele.state) !== 'undefined') {
            try {
                return JSON.parse(ele.state);
            } catch (e) {
                var json = '[{"value":"' + ele.state + '"}]';
                return JSON.parse(json);
            }
        } else {
            return [];
        }
    }

    const history = useHistory();

    useEffect(() => {
        if(signataires.length !==0){
            var i =[];
            $.each(signataires, function( index, value ) {
                i.push({
                    name:value.value,
                    email:'',
                    type:'Signataire',
                })
            });
        }

        setSignataireAndValidataire(i);
        // $('body').on('click', '.new_row', function (e) {
        //     e.stopPropagation();
        //     return false;
        // })
        //
        // $('body').on('click', '.delete_row', function (e) {
        //     e.stopPropagation();
        //     return false;
        // })

        getSendingDetail();

    }, [])

    const { id } = useParams();

    const getSendingDetail = (e) => {
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'sendings/' + id,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if (response.data.success === true) {
                    if (response.data.data.is_config===0 || !response.data.data.is_config) {
                        setDisplayDetail(true);
                        setWidget(response.data.data.configuration);
                        setSending(response.data.data);
                    } else {
                        setDisplayDetail(false);
                    }
                }
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status === 404) {
                        setDisplayDetail(false);
                    }
                }
            });
    }

    const endSendingForm = (e) => {
        e.preventDefault();
        window['startspinner']();

        var data = new FormData(this)
        data.append('id', id)
        data.append('objet', objet)
        data.append('message', message)
        data.append('signataire', JSON.stringify(signataireAndValidataire))
        data.append('cc', JSON.stringify(cc))
        data.append('expiration', expiration)
        data.append('rappel', rappel)

        axios
            .put(process.env.REACT_APP_API_BASE_URL+'sendings/' + id, Object.fromEntries(data),{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {

                if (response.data.success === true) {
                    window['endspinner']();
                    $('#addMoreConfigForm').trigger("reset");
                    window['showSuccessToast']('Opération réussie !!')
                    // var id=  response.data.data.id;
                    // window.location = "/detail/sending/"+id;
                    localStorage.removeItem('widgets');
                    localStorage.removeItem('signataires');
                    history.push('/detail/sending/' + id);

                } else {
                    console.log('error');
                }
            });
    }

    const ExpirationInputChange = (e) => {
        if (e.target.value === 'Personnaliser') {
            $('#rappel_block').removeClass('d-none');
        } else {
            $('#rappel_block').addClass('d-none');
            setExpiration(e.target.value);
        }
    }

    const RappelInputChange = (e) => {

        if (e.target.value === 'Personnaliser') {
            $('#expiration_block').removeClass('d-none');
        } else {
            $('#expiration_block').addClass('d-none');
            setRappel(e.target.value);
        }
    }

    const UpdateSignataire = (e) => {
        var w = JSON.parse(widget);
        $.each(signataires, function (index, value) {
            if (value.value === $(e.target).data('oldvalue')) {
                signataires[index].value = e.target.value;

                $.each(w, function (i, v) {
                    if (v.signataire === $(e.target).data('oldvalue')) {
                        w[i].signataire = e.target.value;
                    }
                });
            }
        });

    }

    const cancelSending =(e)=>{
        e.preventDefault();
            axios
                .delete(process.env.REACT_APP_API_BASE_URL+'sendings/'+id,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    handleClose();
                    localStorage.removeItem('signataires');
                    localStorage.removeItem('widgets');
                    history.push('/listingsending/pending');
                }).catch(function (error) {
                if (error.response) {
                    console.log('error');
                }
            });
    }

    return (
        <div className='layout-wrapper layout-content-navbar layout-without-menu'>
            <div className="layout-container">
                <div className="layout-page">
                    <div className="mx-5 mt-2" id="general_error"></div>
                    <Modal
                        show={show} onHide={handleClose} animation={false}
                        size="sm"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Confirmation
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="text-center">Voulez-vous vraiment quitter cette page ?
                                <small>Vous perdrez vos configuration</small>
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-label-secondary btn-sm"
                                    onClick={handleClose}>Fermer
                            </button>
                            <button type="button" className="btn btn-primary btn-sm" onClick={cancelSending}>Ok</button>
                        </Modal.Footer>
                    </Modal>
                    <div className="content-wrapper">
                        {/* Start Content*/}
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <Link to={"/sending/"+id} href="#" className="btn btn-default" id="back">
                                <span className="fa fa-arrow-left mr-1"></span>
                                Retour
                            </Link>
                            <form id="addMoreConfigForm" onSubmit={endSendingForm}>
                                <div className=" d-flex justify-content-between mb-3">
                                    <h4 className="fw-bold py-1 ">
                                        <span className="text-muted fw-light">Configuration du mail à envoyer</span>
                                    </h4>
                                    <div className="">
                                        <div className="demo-inline-spacing">
                                            <button type="button" className="btn btn-danger" id="cancel_btn" onClick={handleShow}>
                                                Annuler
                                            </button>
                                            <button type="submit" className="btn btn-primary" id="sbt_btn">
                                                <span className="spinner-border d-none" role="status" aria-hidden="true" id="spinner_btn" />
                                                Envoyer
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title">
                                            Ajouter des signataires
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-repeater">
                                            {signataireAndValidataire.map((l, k) => <div key={k} >
                                                    <div className='si_class_map'>
                                                        <div className="row">
                                                            <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                                                                <label className="form-label" htmlFor="map-1-1" >Type</label>
                                                                <select id="map-1-1" name="type" value={l.type}  className="form-select" onChange={e => handleChange(k, e)}>
                                                                    <option value="Signataire" >Signataire</option>
                                                                    <option value="Validataire">Validataire</option>
                                                                </select>
                                                            </div>
                                                            <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                                                                <label className="form-label" htmlFor="map-1-2">Nom</label>
                                                                <input type="text" id="map-1-2" name="name" className="form-control" defaultValue={l.name}
                                                                       readOnly={l.type==='Signataire'}   placeholder="Signataire" data-oldvalue={l.name} onChange={e => handleChange(k, e)} />
                                                            </div>
                                                            <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                                                                <label className="form-label" htmlFor="map-1-3">Email</label>
                                                                <input type="email" id="map-1-3" name="email" required className="form-control" defaultValue={l.email} onChange={e => handleChange(k, e)}
                                                                       placeholder="signataire@gmail.com" />
                                                                {
                                                                    k && l.type !=='Signataire' ?
                                                                        <button type="button"  className="button remove" onClick={() => removeFormFields(k)}>Supprimer</button>
                                                                        : null
                                                                }
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            )}
                                                <div className="mb-0">
                                                    <button className="btn btn-primary new_row" type="button" onClick={() => addFormFields()} >
                                                        <i className="bx bx-plus"></i>
                                                        <span className="align-middle">Ajouter</span>
                                                    </button>
                                                </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-3">
                                    <div className="card-header">
                                        <h5 className="card-title">
                                            Écrire un message pour les destinataires
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="mb-3 col-lg-12 col-xl-6 col-12 mb-0">
                                                <label className="form-label" htmlFor="form-repeater-1-1">Objet</label>
                                                <input type="text" id="objet" name="objet" className="form-control" onChange={e => setObjet(e.target.value)}
                                                       placeholder="Objet" />
                                            </div>
                                            <div className="mb-3 col-lg-12 col-xl-6 col-12 mb-0">
                                                <label className="form-label" htmlFor="form-repeater-1-2">Message</label>
                                                <textarea className="form-control" id="message" name="message" onChange={e => setMessage(e.target.value)}
                                                          rows="3"></textarea>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="card mt-3">
                                    <div className="card-header">
                                        <h5 className="card-title">
                                            Ajouter les personnes qui recevront une copie des documents signés
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-repeater-cc">
                                            <div data-repeater-list="cc">
                                                <div className='cc_class' id="for_cc">
                                                    {cc.map((element, index) => (
                                                            <div className="row" key={index}>
                                                                <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                                                                    <label className="form-label" htmlFor="cc-1-1">Nom</label>
                                                                    <input type="text" id="cc-1-1" name="name" className="form-control"
                                                                           placeholder="Cc" />
                                                                </div>
                                                                <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                                                                    <label className="form-label" htmlFor="cc-1-2">Email</label>
                                                                    <input type="email" id="cc-1-2" name="email" required className="form-control"
                                                                           placeholder="cc@gmail.com" />
                                                                </div>
                                                                <div className="mb-3 col-lg-12 col-xl-2 col-12 d-flex align-items-center mb-0">
                                                                            <button className="btn btn-label-danger delete_row mt-4" onClick={() => removeFormFieldsCc(index)} >
                                                                                <i className="bx bx-x"></i>
                                                                                <span className="align-middle">Supprimer</span>
                                                                            </button>
                                                                </div>
                                                            </div>

                                                    ))}

                                                </div>
                                            </div>
                                            <div className="mb-0">
                                                <button className="btn btn-primary new_row" type="button" onClick={() => addFormFieldsCc()}>
                                                    <i className="bx bx-plus"></i>
                                                    <span className="align-middle">Ajouter</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-3">
                                    <div className="card-header">
                                        <h5 className="card-title">
                                            Rappels et délai d'expiration
                                        </h5>
                                    </div>
                                    <div className="card-body">

                                        <div className="row">
                                            <div className="mb-3 col-lg-6 col-xl-6 col-12 mb-0">
                                                <label className="form-label" htmlFor="form-repeater-1-3">Rappel</label>
                                                <select id="rappel" value={rappel} name="rappel" className="form-select" onChange={RappelInputChange}>
                                                    <option value="Aucun">Aucun</option>
                                                    <option value="Quotidien">Quotidien</option>
                                                    <option value="Hebdomadaire">Hebdomadaire</option>
                                                    <option value="Mensuel">Mensuel</option>
                                                    <option value="Personnaliser">Personnalisé</option>
                                                </select>
                                            </div>
                                            <div className="mb-3 col-lg-6 col-xl-6 col-12 mb-0">
                                                <label className="form-label" htmlFor="form-repeater-1-3">Expiration</label>
                                                <select id="expiration" value={expiration} name="expiration" className="form-select" onChange={ExpirationInputChange}>
                                                    <option value="Aucun">Aucun</option>
                                                    <option value="Personnaliser">Personnalisé</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-lg-6 col-xl-6 col-12 mb-0 d-none" id="rappel_block">
                                                <label className="form-label" htmlFor="form-repeater-1-3">Nombre de jours après l'envoi</label>
                                                <input type="number" className="form-control" name="remember_day" id="remember_day" onChange={e => setRappel(e.target.value)} />
                                            </div>
                                            <div className="mb-3 col-lg-6 col-xl-6 col-12 mb-0 d-none" id="expiration_block">
                                                <label className="form-label" htmlFor="form-repeater-1-3">Jours avant l'expiration</label>
                                                <input className="form-control" type="number" name="expiration_day" id="expiration_day" onChange={e => setExpiration(e.target.value)} />
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </form>
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

export default AddMoreConfig;

