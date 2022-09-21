import axios from "axios";
import React, {useContext, useEffect, useRef, useState} from "react";
import Select from 'react-select'
import $ from 'jquery';
import Sidebar from "../Sidebar";
import NavB from "../Nav";
import Footer from "../Footer";
import {decrypt} from "../Helper";
import Modal from "react-bootstrap/Modal";
import DataLoadingSpinner from "../DataLoadingSpinner";
import ReactPaginate from "react-paginate";
import Member from "./Member";
import {Accordion, AccordionContext, Card, useAccordionButton} from "react-bootstrap";
import * as PropTypes from "prop-types";
window.$ = $;

class ContextAwareToggle extends React.Component {
    render() {
        return null;
    }
}

ContextAwareToggle.propTypes = {
    eventKey: PropTypes.string,
    children: PropTypes.node
};
const Group = ( ) => {
    const [groups, setGroups] = useState([ ]);
    const [name,setName]= useState('');
    const [id,setId]= useState('');
    const [action,setAction]= useState('');
    const [members,setMembers]= useState('');
    const [members_select, setMembersSelect] = useState([]);
    const [responsable_select, setResponsableSelect] = useState([]);
    const [original_select, setOriginalSelect] = useState([]);
    const [the_selected_member, setTheSelectedMember] = useState([]);
    const [the_selected_responsable, setTheSelectedResponsable] = useState([]);
    const [updateMember, setUdateMember] = useState([]);
    const [updateResponsable, setUpdateResponsable] = useState([]);
    const [responsables,setResponsables]= useState('');
    const [show, setShow] = useState(false);
    const [showView, setShowView] = useState(false);

    let id_user = decrypt(localStorage.getItem('userId'));

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentItems, setCurrentItems] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [selected_group_name, setSelectedGroupName] = useState('');
    const [member_of_selected_group, setMemberOfSelectedGroup] = useState([]);
    const [loader, setLoader] = useState(true);

    const [pageCountView, setPageCountView] = useState(0);
    const [itemOffsetView, setItemOffsetView] = useState(0);
    const [itemsPerPageView, setItemsPerPageView] = useState(10);
    const [currentItemsView, setCurrentItemsView] = useState([]);
    const [loaderView, setLoaderView] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseView = () => setShowView(false);
    const handleShowView = () => setShowView(true);

    useEffect(() => {

        // const script = document.createElement("script");
        // script.src = '../assets/js/groups.js';
        // document.body.appendChild(script);
        //
        // const script1 = document.createElement("script");
        // script1.src = '../assets/js/groups2.js';
        // document.body.appendChild(script1);

         getGroups();
         getMembersForSelect();

        $('body').on('click', '.edit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            //var key = $(this).data('key');
            $('#exampleModalLabel1').html("Editer un groupe");
            getOneGroup($(this).data('group'),'edit')
        });

        $('body').on('click','.delete',function(e){
            e.preventDefault();
            e.stopPropagation();
            var Item_id = $(this).data('id');
            const ky = $(this).data('k');
            window.Swal.fire({
                title: 'Are you sure?',
                text: "Voulez vous vraiment supprimer ce groupe ?!",
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
                        .delete(process.env.REACT_APP_API_BASE_URL+'groups/'+Item_id,{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                        .then(response => {
                            if(response.data.success === true){
                                getGroups();
                                window['showSuccessToast']('Suppression réussie')
                            }
                        }).catch(err => {
                            console.log('Error:', err);
                            window['showErrorToast']('Erreur de la suppression');
                        }
                    );
                }
            });
        })

        $('body').on('click','.view',function(e){
            e.preventDefault()
            e.stopPropagation()
            $('#modal_title_view').html('Detail du groupe')
            getOneGroup($(this).data('id'),'view')
        })

        $('body').on('click','.removefromgroup',function(e){
            e.preventDefault()
            e.stopPropagation()
            var Item_id = $(this).data('id');
            var Item_id_group = $(this).data('group');
            window.Swal.fire({
                title: 'Are you sure?',
                text: "Voulez vous vraiment supprimer ce membre du groupe ?!",
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
                        .delete(process.env.REACT_APP_API_BASE_URL+'groupsmembers/'+Item_id,{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                        .then(response => {
                            if(response.data.success === true){
                                getGroupMember(Item_id_group,'delete');
                                window['showSuccessToast']('Suppression réussie')
                            }
                        }).catch(err => {
                            console.log('Error:', err);
                            window['showErrorToast']('Erreur de la suppression');
                        }
                    );
                }
            });
        })

    }, [itemOffset, itemsPerPage])

    function  getGroupMember(Item_id,act){
        $.ajax({
            url: process.env.REACT_APP_API_BASE_URL+"groups/members/" + Item_id,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            headers: {"Authorization": 'Bearer ' + localStorage.getItem('token')},
            statusCode: {
                419: function(responseObject, textStatus, jqXHR) {
                    window['error_419']();
                },
                403: function(responseObject, textStatus, jqXHR) {
                    window['showErrorToast']('Action non authorisée');
                },
                500:function(responseObject, textStatus, jqXHR) {
                    window['showErrorToast']('Erreur serveur');
                },
            },
            success: function(data) {
                if (data.success === true) {
                    var m = [];
                    var r = [];
                    $.each(data.data, function( index, value ) {
                        if(value.members[0].role==='Membre'){
                            m.push({value:value.members[0].id,label:value.members[0].name})
                        }
                        else{
                            r.push({value:value.members[0].id,label:value.members[0].name})
                        }
                    });
                    setUdateMember(m);
                    setUpdateResponsable(r);
                    if(act ==='edit'){
                        handleShow()
                    }
                    else{
                        setSelectedGroupName(data.data[0].groups[0].name)
                        setMemberOfSelectedGroup(data.data)

                        const endOffsetView = itemOffsetView + parseInt(itemsPerPageView);
                        setCurrentItemsView(data.data.slice(itemOffsetView, endOffsetView));

                        setPageCountView(Math.ceil(data.data.length / itemsPerPageView));
                        setLoaderView(false);
                        if(act ==='view'){
                            handleShowView()
                        }
                    }

                } else {
                    window['showErrorToast']('Cet element n\'existe pas');
                }
            },
            error: function(error) {
                console.log(error)
                $('#display_error').text('Error de récupération des données')
                $('#display_error').removeClass('d-none');

            }
        });

    }

    function getOneGroup(Item_id,act){
        $.ajax({
            url: process.env.REACT_APP_API_BASE_URL+"groups/" + Item_id,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            headers: {"Authorization": 'Bearer ' + localStorage.getItem('token')},
            statusCode: {
                419: function(responseObject, textStatus, jqXHR) {
                    window['error_419']();
                },
                403: function(responseObject, textStatus, jqXHR) {
                    window['showErrorToast']('Action non authorisée');
                },
                500:function(responseObject, textStatus, jqXHR) {
                    window['showErrorToast']('Erreur serveur');
                },
            },
            success: function(data) {
                if (data.success === true) {
                    setName(data.data.name);
                    setAction('edit');
                    setId(Item_id);
                    //$('#key').val(key);
                } else {
                    window['showErrorToast']('Cet element n\'existe pas');
                }
            },
            error: function(error) {
                console.log(error)
                $('#display_error').text('Error de récupération des données')
                $('#display_error').removeClass('d-none');

            }
        });
        getGroupMember(Item_id,act);
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
                    const endOffset = itemOffset + parseInt(itemsPerPage);
                    setCurrentItems(response.data.data.slice(itemOffset, endOffset));
                    setGroups(response.data.data);
                    setPageCount(Math.ceil(response.data.data.length / itemsPerPage));
                    setLoader(false);
                }
            });
    }

    function getMembersForSelect(){
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'members/'+id_user+'/user',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success === true){
                    var a = [];
                    $.each(response.data.data, function( index, value ) {
                        a.push({value:value.id,label:value.name})
                    });
                    setOriginalSelect(a);
                    setMembersSelect(a);
                    setResponsableSelect(a);
                }
            });


    }

    const initialState =() =>{
       // setGroups([]);
        setMembers('');
        setResponsables('');
        setName('');
        setId('');
    }

    const setUpAddElement = (e)=>{
        setId('');
        setAction('add');
        $('#k').val('');
        $('#add_group_form').trigger("reset");
        initialState();
        // window.tagify.removeAllTags.bind(window.tagify)
        // window.tagify1.removeAllTags.bind(window.tagify1)
        $('#exampleModalLabel1').html("Nouveau groupe");
        handleShow();

    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        var k= $('#key').val();
        console.log($('#members').val())
        window['startspinner']();
        axios
            .post(process.env.REACT_APP_API_BASE_URL+'groups', {
                name: name,
                id: id,
                action: action,
                members: JSON.stringify(the_selected_member) ,
                responsables: JSON.stringify(the_selected_responsable)
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {

                if(response.data.success === true){
                    window['endspinner']();
                    $('#add_group_form').trigger("reset");
                    getGroups();
                    initialState();
                    handleClose()
                    window['showSuccessToast']('Opération réussie !!')
                }
                else{
                    console.log('error');
                }
            });
    };

    const editItem = (e)=>{
        e.preventDefault();
       // const Item_id = e.target.dataset.group;
       // const Item_id = e.target.closest("[data-group]");
       // const ky = e.target.closest("[data-key]");
       // const ky = e.target.dataset.k;
        const removeId = e.target.getAttribute("data-group");
       // console.log(e.target.dataset);
        console.log(removeId);
        //$('#exampleModalLabel1').html("Editer un group");
        /*axios
            .get('/esignature/groups/'+Item_id)
            .then(response => {
                if(response.data.success === true){
                    const arr = response.data.data;
                    setName(arr.name);
                    $('#add_group_modal').modal('show');
                }
            });*/
    }

    const removeFromResponsable= (v)=>{
        var i =0;
        $.each(window.membersList, function( index, data ) {
            if(data.value==v){
                i= index;
            }
        });
        window.responsableList.splice(i, 1);
        window.tagify.settings.whitelist = window.responsableList;
    }

    const tagMemberChange = (e)=>{
        const old_members =members;
        setMembers(e);
        const obj = JSON.parse(e);
        const length = obj.length;
         if(old_members.length < e.length){
             removeFromResponsable(obj[length-1].value);
         }
         else{
             // addToResponsable(obj[length-1]);
             //window.responsableList.push(value);
             console.log(window.responsableList);
             window.tagify.settings.whitelist = window.responsableList;
         }
        /*axios
            .get('/esignature/groups/'+Item_id)
            .then(response => {
                if(response.data.success === true){
                    const arr = response.data.data;
                    setName(arr.name);
                    $('#add_group_modal').modal('show');
                }
            });*/
    }

    const memberSelectChange=(value, actionMeta)=>{
        switch (actionMeta.action) {
            case "select-option":
                var old = responsable_select;
                var new_a = old.filter(n => !value.includes(n))
                setResponsableSelect(new_a)
                setTheSelectedMember(value);
                break;
            case "remove-value":
                var or = original_select;
                var new_a = or.filter(n => !value.includes(n))
                setResponsableSelect(new_a)
                setTheSelectedMember(value);
                break;
            case "clear":
                setResponsableSelect(original_select)
                setTheSelectedMember([]);
                break;
            default:
                console.log("Other events caught");
        }
    }

    const responsableSelectChange=(value, actionMeta)=>{
        switch (actionMeta.action) {
            case "select-option":
                var old = members_select;
                var new_a = old.filter(n => !value.includes(n))
                setMembersSelect(new_a)
                setTheSelectedResponsable(value);
                break;
            case "remove-value":
                var or = original_select;
                var new_a = or.filter(n => !value.includes(n))
                setMembersSelect(new_a)
                setTheSelectedResponsable(value);
                break;
            case "clear":
                setMembersSelect(original_select)
                setTheSelectedResponsable(value);
                break;
            default:
                console.log("Other events caught");
        }
    }

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % groups.length;
        setItemOffset(newOffset);
    };

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
                            <h4 className="fw-bold py-1 d-flex justify-content-between">
                                <span className="text-muted fw-light">Gestion des groupes</span>
                                <button type="button" className="btn btn-primary" id="add_group_button" onClick={setUpAddElement}>
                                    Nouveau groupe
                                </button>
                            </h4>
                            <Modal id="add_group_modal" show={show} onHide={handleClose} size="lg">
                                <Modal.Header closeButton>
                                    <Modal.Title id="modal_title">Ajout d'un contact</Modal.Title>
                                    <div className="alert alert-danger alert-dismissible m-4 d-none " role="alert" id="serveur_side_error_alert">
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
                                        </button>
                                    </div>
                                </Modal.Header>
                                <form id='add_group_form' onSubmit={handleSubmit}>
                                    <Modal.Body>
                                        <ul id="serveur_side_error" className="text-danger"></ul>
                                        <input type="hidden" name="id" id="id" value={id} onChange ={e => setId(e.target.value)}/>
                                        <input type="hidden" name="action" id="action" value={action} onChange ={e => setAction(e.target.value)}/>
                                        <input type="hidden" name="key" id="key" value=''/>
                                        <div className="row">
                                            <div className="col mb-3">
                                                <label htmlFor="name" className="form-label">Nom</label>
                                                <input type="text" id="name" name="name" className="form-control" placeholder="Entrer le nom" value={name} onChange ={e => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="row g-2">
                                            <div className="col mb-0">
                                                <label htmlFor="members" className="form-label">Membres</label>
                                                {/*<input id="members" name="members" className="form-control"*/}
                                                {/*       placeholder=""   value={members} onChange ={e => tagMemberChange(e.target.value)}  />*/}
                                                <Select id="members"
                                                    closeMenuOnSelect={false}
                                                    isMulti
                                                    name="members"
                                                    options={members_select}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={memberSelectChange}
                                                    defaultValue={updateMember}
                                                />
                                            </div>
                                            <div className="col mb-0">
                                                <label htmlFor="responsables" className="form-label">Responsables</label>
                                                <Select id="responsables"
                                                        closeMenuOnSelect={false}
                                                        isMulti
                                                        name="responsable"
                                                        options={responsable_select}
                                                        className="basic-multi-select"
                                                        classNamePrefix="select"
                                                        onChange={responsableSelectChange}
                                                        defaultValue={updateResponsable}
                                                />
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button type="button" className="btn btn-label-secondary"
                                                onClick={handleClose}>Fermer
                                        </button>
                                        <button className="btn btn-primary" type="submit" id="sbt_btn">
                                            <span className="spinner-border d-none" role="status" aria-hidden="true"
                                                  id="spinner_btn"></span>
                                            Enregistrer
                                        </button>

                                    </Modal.Footer>
                                </form>
                            </Modal>

                            <Modal show={showView} fullscreen={true} onHide={() => setShowView(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title id="modal_title_view">Detail du groupe</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="d-flex justify-content-between">
                                                <h5 className="card-title">Membre du groupe {selected_group_name}</h5>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive text-nowrap">
                                                <DataLoadingSpinner loader={loaderView}/>
                                                <table className="table table-bordered">
                                                    <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Role</th>
                                                        <th>Date d'ajout</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {loaderView===false && member_of_selected_group.length === 0 &&
                                                    <h5 className="text-center mt-2">
                                                        Vous n'avez aucun membre.
                                                    </h5>
                                                    }
                                                    {currentItemsView.map((l, k) =>  <tr key={k}>
                                                            <td><span className="me-1">{itemOffsetView + k + 1}</span>
                                                            </td>
                                                            <td>
                                                                <strong>{l.members[0].name}</strong></td>
                                                            <td>{l.members[0].email}</td>
                                                            <td>
                                                                {l.members[0].role==='Membre'?
                                                                    <span className="badge bg-label-danger me-1">Membre</span>
                                                                    :
                                                                    <span className="badge bg-label-success me-1">Responsable</span>
                                                                }
                                                            </td>
                                                            <td>
                                                                {l.created_at}
                                                            </td>
                                                            <td>
                                                                <a href="#" className="removefromgroup" data-id={l.id} data-group={l.groups[0].id}><span className="text-danger fa fa-trash"></span> <i className="text-danger">Retirer du groupe</i></a>
                                                            </td>
                                                        </tr>
                                                    )}

                                                    </tbody>
                                                </table>
                                            </div>
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
                                </Modal.Body>
                            </Modal>
                            <div className="row">
                                <div className="col-lg-1"></div>
                                <div className="col-lg-10 justify-content-md-center">
                                    <div className="demo-inline-spacing mt-3">
                                        <ul className="list-group">
                                            <li className="list-group-item d-flex justify-content-between align-items-center bg-primary">
                                                <b className="text-white" >Groupes</b>
                                                <span className="badge ">Membres</span>
                                                <span className="badge ">Actions</span>
                                            </li>
                                            <DataLoadingSpinner loader={loader}/>
                                            {loader===false && groups.length === 0 &&
                                            <h5 className="text-center mt-2">
                                                Vous n'avez aucun groupe.
                                            </h5>
                                            }
                                            {currentItems.map((l, k) => <li key={k} className="list-group-item d-flex justify-content-between align-items-center">
                                                    {l.name}
                                                    <span className="badge bg-success">{l.nbre_member}</span>
                                                    <div>
                                                        <a  data-id={l.id} className="view m-2"><span className="fa fa-eye"/></a>
                                                        <a  data-group={l.id} data-key={k}  className="edit m-2"  ><span className="fa fa-pen-alt"></span></a>
                                                        <a  data-id={l.id} data-k={k} className="text-danger delete m-2"><span className="fa fa-trash"></span></a>
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
                                <div className="col-lg-1"></div>
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

export default Group;


