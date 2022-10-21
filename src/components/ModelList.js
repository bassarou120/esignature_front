import axios from "axios";
import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import {decrypt} from "./Helper";
import Modal from 'react-bootstrap/Modal';
import DataLoadingSpinner from "./DataLoadingSpinner";
import ReactPaginate from "react-paginate";
import Select from 'react-select';
window.$ = $;

const ModelList = ( ) => {
    const [models, setModels] = useState([ ]);
    const [groups, setGroups] = useState([ ]);
    const [members, setMembers] = useState([ ]);
    const [members_select, setMembersSelect] = useState([]);
    const [groups_select, setGroupsSelect] = useState([ ]);
    const [signataire, setSignataire] = useState([]);
    const [selectedModelInfo, setSelectedModelInfo] = useState([]);
    let id_user=decrypt(localStorage.getItem('userId'));
    const [smShow, setSmShow] = useState(false);
    const [loader, setLoader] = useState(true);
    const [objet, setObjet] = useState('');
    const [message, setMessage] = useState('');
    const [expiration, setExpiration] = useState('Aucun');
    const [rappel, setRappel] = useState('Aucun');

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentItems, setCurrentItems] = useState([]);

    const [isSearchable, setIsSearchable] = useState(true);

    const handleClose = () => setSmShow(false);
    const handleShow = () => setSmShow(true);

    const [fullscreen, setFullscreen] = useState(true);
    const [showSendModal, setShowSendModal] = useState(false);

    useEffect(() => {
        getModels();
        getGroups();
        getMembers();

        $('body').on('click', '.delete', function(e) {
            e.stopPropagation();
            e.preventDefault();
            var Item_id = $(this).data("id");
         
            window.Swal.fire({
                title: 'En êtes vous sûr ?',
                text: "Voulez vous vraiment supprimer ce model ?!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui',
                cancelButtonText: 'Annuler',
                customClass: {
                    confirmButton: 'btn btn-primary me-1',
                    cancelButton: 'btn btn-label-secondary'
                },
                buttonsStyling: false
            }).then(function(result) {
                if (result.value) {
                    axios
                        .delete(process.env.REACT_APP_API_BASE_URL+ 'sendings/'+Item_id,{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                        .then(response => {
                            if(response.data.success === true){
                                getModels();
                                window['showSuccessToast']('Suppression réussie !');
                            }
                            else{
                                window['showErrorToast']('Erreur de la suppression !');
                            }
                        });
                }
            });

        });

        $('body').on('click', '.duplicate', function(e) {
            e.stopPropagation();
            e.preventDefault();
            var Item_id = $(this).data("id");
            axios
                .post(process.env.REACT_APP_API_BASE_URL+'sendings/copy/'+Item_id,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    if(response.data.success === true){
                        getModels();
                        window['showSuccessToast']('Copie réussie !');
                    }
                    else{
                        window['showErrorToast']('Erreur de la copie !');
                    }
                });

        });

    }, [])

    function getModels(){
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'models/'+id_user+'/user',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success === true){
                    const endOffset = itemOffset + parseInt(itemsPerPage);
                    setCurrentItems(response.data.data.slice(itemOffset, endOffset));
                    setPageCount(Math.ceil(response.data.data.length / itemsPerPage));
                    setModels(response.data.data);
                    setLoader(false) ;
                }
            });
    }

    function getGroups(){
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'groups/'+id_user+'/user',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success === true){
                    setGroups(response.data.data);
                    var a = [];
                    $.each(response.data.data, function( index, value ) {
                        a.push({value:value.id,label:value.name})
                    });
                    setGroupsSelect(a);
                }
            });
    }

    function getMembers(){

        axios
            .get(process.env.REACT_APP_API_BASE_URL+'members/'+id_user+'/user',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data){
                    setMembers(response.data.data);
                    var a = [];
                    $.each(response.data.data, function( index, value ) {
                        a.push({value:value.id,label:value.name})
                    });
                    setMembersSelect(a);
                }
            });
    }

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % models.length;
        setItemOffset(newOffset);
    };

    const send=(e)=>{
        e.preventDefault();

        $('#spinner_btn').removeClass('d-none');
        $('#sbt_btn').prop("disabled", true);

        var data = new FormData(this)
        data.append('id', selectedModelInfo.id )
        data.append('objet', objet)
        data.append('message', message)
        data.append('signataire', JSON.stringify(signataire))
        data.append('expiration', expiration)
        data.append('rappel', rappel)

        axios
            .post(process.env.REACT_APP_API_BASE_URL+'sendings/sendmodeltosignataire', Object.fromEntries(data),{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(response => {
            if (response.data.success === true) {
                window['showSuccessToast']('Envois réussi! Rendez vous sur l\'envois en cours pour suivre l\'evolution de votre demande de signataure')
                $('#spinner_btn').addClass('d-none')
                $('#sbt_btn').prop("disabled", false);
                setShowSendModal(false)
            } else {
                $('#spinner_btn').addClass('d-none')
                $('#sbt_btn').prop("disabled", false);
            }
        }).catch(function (error) {
            if (error.response) {
                if(error.response.status===400){
                    $('#modal_error_ul').html('');
                    $('#modal_error').removeClass('d-none');
                    $.each(error.response.data.data, function (key, value) {
                        $('#modal_error_ul').append('<li class="list-group-item">' + value + '</li>');
                    });
                }
                $('#spinner_btn').addClass('d-none')
                $('#sbt_btn').prop("disabled", false);
            }
        });
    }

    const share=(e)=>{
        e.preventDefault();

        $('#spinner_btn').removeClass('d-none');
        $('#sbt_btn').prop("disabled", true);

        var data = new FormData(this)
        data.append('id', selectedModelInfo.id )
        data.append('id_group', selectedModelInfo.id)
        data.append('id_membre', selectedModelInfo.id)

        axios
            .post(process.env.REACT_APP_API_BASE_URL+'sendings/sharemodel', Object.fromEntries(data),{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(response => {
            if (response.data.success === true) {
                window['showSuccessToast']('Opération réussie !!')
                setShowSendModal(false)
            } else {
                $('#spinner_btn').addClass('d-none')
                $('#sbt_btn').prop("disabled", false);
            }
        }).catch(function (error) {
            if (error.response) {
                if(error.response.status===400){
                    $('#modal_error_ul').html('');
                    $('#modal_error').removeClass('d-none');
                    $.each(error.response.data.data, function (key, value) {
                        $('#modal_error_ul').append('<li class="list-group-item">' + value + '</li>');
                    });
                }
                $('#spinner_btn').addClass('d-none')
                $('#sbt_btn').prop("disabled", false);
            }
        });
    }

    const handleShowSendModal = (e) => {
        var selected_model =e.target.dataset.id;
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'sendings/get/all/signataire/'+selected_model,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success === true){
                    var ar= [];
                    $.each(response.data.data, function( index, value ) {
                        ar.push({
                             id: value.id,
                             name: value.name,
                             email: value.email,
                             type: value.type,
                             is_cc: false,
                        })
                    });
                  setSignataire(ar);
                }
            });
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'sendings/'+selected_model,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success === true){
                    setSelectedModelInfo(response.data.data);
                }
            });
        setShowSendModal(true);
    };

    let addFormFields = () => {
        if(selectedModelInfo.type_signature[0].type ==='avanced'){
            setSignataire([...signataire, { name: "", email: "",type:"Validataire",is_cc:false }])
        }
        else{
            setSignataire([...signataire, { name: "", email: "",type:"",is_cc:false }])
        }
    }

    let removeFormFields = (i) => {
        let newFormValues = [...signataire];
        newFormValues.splice(i, 1);
        setSignataire(newFormValues)
    }

    let handleChange = (i, e) => {
        let newFormValues = [...signataire];
        if(selectedModelInfo.type_signature[0].type==='avanced'){
            if(e.target.name==='type' ){
                if(newFormValues[i][e.target.name]==='Signataire'){
                    window['showErrorToast']('Vous ne pouvez pas changer le type de ce signataire')
                    return;
                }
                if(newFormValues[i][e.target.name]==='Validataire'){
                    window['showErrorToast']('Nombre de widget signature insuffisant')
                    return;
                }
                // else{
                //     newFormValues[i][e.target.name] = e.target.value
                // }
               /* if(e.target.value==='Signataire'){
                    //newFormValues[i][e.target.name] ='Signataire';
                    window['showErrorToast']('Vous ne pouvez pas changer le type de ce signataire')
                    return ;
                }
                else{
                    window['showErrorToast']('Le type de ce signataire ne peut être changer')
                    newFormValues[i][e.target.name] ='Validataire';
                    return ;
                }*/

            }
            else{
                newFormValues[i][e.target.name] = e.target.value;
            }
        }
        else{
            newFormValues[i][e.target.name] = e.target.value;
        }
        setSignataire(newFormValues);
    }

    const ExpirationInputChange = (e) => {
        if(e.target.id!=='expiration_day'){
            if (e.target.value === 'Personnalisé') {
                $('#expiration_block').removeClass('d-none');
            } else {
                $('#expiration_block').addClass('d-none');
            }
        }
        setExpiration(e.target.value);
    }

    const RappelInputChange = (e) => {
        if(e.target.id!=='remember_day') {
            if (e.target.value === 'Personnalisé') {
                $('#rappel_block').removeClass('d-none');
            } else {
                $('#rappel_block').addClass('d-none');
            }
        }
        setRappel(e.target.value);
    }

    return (
        <div className="col-lg-12">
            <div className="demo-inline-spacing mt-3">
                <ul className="list-group">
                    <DataLoadingSpinner loader={loader}/>
                    {loader===false && models.length === 0 &&
                    <h5 className="text-center mt-2">
                        Vous n'avez aucun models.
                    </h5>
                    }
                    <Modal  size="md" show={smShow} onHide={() => setSmShow(false)} backdrop="static"
                            keyboard={false}  aria-labelledby="example-modal-sizes-title-sm">
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-sm">
                                Choisissez les membres
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="">
                                <ul className="nav nav-tabs nav-fill" role="tablist">
                                    <li className="nav-item">
                                        <button type="button" className="nav-link active" role="tab" data-bs-toggle="tab"
                                                data-bs-target="#navs-justified-home" aria-controls="navs-justified-home"
                                                aria-selected="true"> Groupes <span className="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger"></span>
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button type="button" className="nav-link" role="tab" data-bs-toggle="tab"
                                                data-bs-target="#navs-justified-profile"
                                                aria-controls="navs-justified-profile" aria-selected="false">
                                            Membres
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane fade active show" id="navs-justified-home" role="tabpanel">
                                        <div className="list-group">
                                            <div className="mb-3">
                                                <label htmlFor="select2Basic" className="form-label">Groupe</label>
                                                {groups.length !==0 ?
                                                    <Select options={groups_select} isSearchable={isSearchable} defaultValue={groups_select[0]} isClearable={isSearchable}> </Select>
                                                    : <div className="text-center">
                                                        <h4 className="text-center">Vous n'avez ajouter aucun groupe.</h4>
                                                        <Link to='/teams/groups' className="menu-link">
                                                            <div data-i18n="">Ajouter maintenant</div>
                                                        </Link>
                                                    </div> }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="navs-justified-profile" role="tabpanel">
                                        <div className="mb-3">
                                            <label htmlFor="select2Basic" className="form-label">Membres</label>
                                            {members.length !== 0 ?
                                                <Select options={members_select} isSearchable={isSearchable} defaultValue={members_select[0]} isClearable={isSearchable}> </Select>
                                               :
                                                <div className="text-center">
                                                <h4 className="text-center">Vous n'avez ajouter aucun membre.</h4>
                                                <Link to='/teams/members' className="menu-link">
                                                    <div data-i18n="">Ajouter maintenant</div>
                                                </Link>
                                            </div>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-outline-secondary" onClick={handleClose}>Fermer
                            </button>
                            <button type="button" onClick={share} className="btn btn-primary">Partager
                            </button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showSendModal} fullscreen={fullscreen} onHide={() => setShowSendModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Configurer l'envois </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex justify-content-end">
                                <div className="">
                                    <div className="demo-inline-spacing">
                                        <button type="submit" className="btn btn-primary btn-sm" id="sbt_btn" onClick={send}>
                                            <span className="spinner-border d-none" role="status" aria-hidden="true" id="spinner_btn"  />
                                            Envoyer
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="form-repeater">
                                    <h5 className="card-title">
                                        Ajouter des signataires
                                    </h5>
                                    {signataire.map((l, k) => <div key={k} >
                                            <div className='si_class_map'>
                                                <div className="row m-2">
                                                    <input type="hidden" value={l.id} />
                                                    <div className="mb-2 col-lg-6 col-xl-3 col-12">
                                                        <label className="form-label" htmlFor="map-1-1" >Type</label>
                                                        <select id="map-1-1" name="type" value={l.type}  className="form-select form-select-sm" onChange={e => handleChange(k, e)}>
                                                            <option value="Signataire" >Signataire</option>
                                                            <option value="Validataire">Validataire</option>
                                                            <option value="Cc">Recevoir une copie</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-2 col-lg-6 col-xl-4 col-12">
                                                        <label className="form-label" htmlFor="map-1-2">Nom</label>
                                                        <input type="text" id="map-1-2" name="name" className="form-control form-control-sm" defaultValue={l.name}
                                                               placeholder="Signataire" data-oldvalue={l.name} onChange={e => handleChange(k, e)} />
                                                    </div>
                                                    <div className="mb-2 col-lg-6 col-xl-4 col-12">
                                                        <label className="form-label" htmlFor="map-1-3">Email</label>
                                                        <input type="email" id="map-1-3" name="email" required className="form-control form-control-sm" defaultValue={l.email} onChange={e => handleChange(k, e)}
                                                               placeholder="signataire@gmail.com" />

                                                    </div>
                                                    {/*<div className="mb-2 col-lg-6 col-xl-2">*/}
                                                    {/*    <div className="col-md">*/}
                                                    {/*        <small className="text-light fw-semibold d-block">Reçevois une copie</small>*/}
                                                    {/*        <div className="form-check form-check-inline mt-3">*/}
                                                    {/*            <input className="form-check-input" type="checkbox"*/}
                                                    {/*                   id="is_also_cc" value={l.is_cc} checked={l.is_cc} onChange={e => handleChange(k, e)} />*/}
                                                    {/*            <label className="form-check-label"*/}
                                                    {/*                   htmlFor="inlineCheckbox1">oui</label>*/}
                                                    {/*        </div>*/}
                                                    {/*    </div>*/}
                                                    {/*</div>*/}
                                                    <div className="mb-2 col-lg-2 col-xl-1">
                                                        {
                                                            k && l.type !=='Signataire' ?
                                                                <button type="button" className="btn btn-icon me-2 btn-outline-danger" onClick={() => removeFormFields(k)}>
                                                                    <span className="fa fa-trash"></span>
                                                                </button>
                                                                : null
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                    <div className="mb-0">
                                        <button className="btn btn-primary new_row btn-sm" type="button" onClick={() => addFormFields()} >
                                            <i className="bx bx-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <h5 className="card-title">
                                        Ajouter un message
                                    </h5>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="form-repeater-1-1">Objet</label>
                                            <input type="text" id="objet" name="objet" className="form-control" onChange={e => setObjet(e.target.value)}
                                                   placeholder="Objet" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="form-repeater-1-2">Message</label>
                                            <textarea className="form-control" id="message" name="message" onChange={e => setMessage(e.target.value)}
                                                      rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-6 hr_left" >
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
                                                            <option value="Personnalisé">Personnalisé</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-3 col-lg-6 col-xl-6 col-12 mb-0">
                                                        <label className="form-label" htmlFor="form-repeater-1-3">Expiration</label>
                                                        <select id="expiration" value={expiration} name="expiration" className="form-select" onChange={ExpirationInputChange}>
                                                            <option value="Aucun">Aucun</option>
                                                            <option value="Personnalisé">Personnalisé</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="mb-3 col-lg-6 col-xl-6 col-12 mb-0 d-none" id="rappel_block">
                                                        <label className="form-label" htmlFor="form-repeater-1-3">Nombre de jours après l'envoi</label>
                                                        <input type="number" className="form-control" name="remember_day" id="remember_day" min="1" onChange={e => setRappel(e.target.value)} />
                                                    </div>
                                                    <div className="mb-3 col-lg-6 col-xl-6 col-12 mb-0 d-none" id="expiration_block">
                                                        <label className="form-label" htmlFor="form-repeater-1-3">Jours avant l'expiration</label>
                                                        <input className="form-control" type="number" name="expiration_day" id="expiration_day" min="1" onChange={e => setExpiration(e.target.value)} />
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {currentItems.map((l, k) => <li key={k} className="list-group-item">
                            <div className="d-flex justify-content-between p-2">
                                <div className="left">
                                    <Link to={"/sending/"+l.id}>
                                        <div className="d-flex justify-content-start align-items-center">
                                            <div className="avatar-wrapper">
                                                <div className="me-2 avatar" style={{position:'relative', width: '4rem' ,height: '5.375rem',cursor:'pointer'}}>
                                                    <img src={process.env.REACT_APP_BACKEND_ASSET_BASE_URL+"previews/"+l.document[0].preview} alt="Avatar" className=""/></div>
                                            </div>
                                            <div className="d-flex flex-column"><span className="emp_name text-truncate">{l.document[0].title}</span><small
                                                className="emp_post text-truncate text-muted">Crée par: {l.created_by[0].name} le {l.created_at}</small></div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="right">
                                    <div className="d-flex ">
                                        <button type="button" data-id={l.id} onClick={handleShowSendModal} className="btn btn-label-success btn-icon me-2"><span className="fa fa-paper-plane"></span></button>
                                        <button type="button" className="btn btn-label-primary btn-icon me-2" onClick={handleShow}>
                                            <span className="fa fa-share-alt"></span>
                                        </button>
                                        <a className="btn btn-label-secondary btn-icon me-2 duplicate" data-id={l.id} href="!#">
                                            <i className="fa fa-paste me-1"/>
                                        </a>
                                        <a className="btn btn-label-danger btn-icon me-2  delete" data-id={l.id} href="!#">
                                            <i className="bx bx-trash me-1"/>
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </li>
                    )}
                </ul>
            </div>
            <div className="m-2">
                <div className="d-flex flex-row-reverse bd-highlight mr-2">
                    <nav className="float-right" aria-label="...">
                        <ReactPaginate
                            nextLabel="Suivant >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={pageCount}
                            previousLabel="< Précedent"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default ModelList;
