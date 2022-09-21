import axios from "axios";
import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Sidebar from "../Sidebar";
import NavB from "../Nav";
import {Link} from "react-router-dom";
import Footer from "../Footer";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import {decrypt} from "../Helper";
import Modal from 'react-bootstrap/Modal';
import DataLoadingSpinner from "../DataLoadingSpinner";
import ReactPaginate from "react-paginate";

window.$ = $;

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [show, setShow] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [activity, setActivity] = useState('');

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentItems, setCurrentItems] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [loader, setLoader] = useState(true);


    let id_user = decrypt(localStorage.getItem('userId'));


    useEffect(() => {

        const script = document.createElement("script");
        script.src = '../assets/js/validation/contact.js';
        document.body.appendChild(script);
        getContacts();

        $('#add_contact_button').click(function () {
            $('#Item_id').val('');
            $('#action').val('add');
            $('#add_contact_form').trigger("reset");
            $('#modal_title').html('Nouveau contact');
            handleShow()
        });

        $('body').on('click', '.delete', function (e) {
            e.stopPropagation();
            var Item_id = $(this).data("id");
            window.Swal.fire({
                title: 'Are you sure?',
                text: "Voulez vous vraiment supprimer cet contact ?!",
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
            }).then(function (result) {
                if (result.value) {
                    axios
                        .delete(process.env.REACT_APP_API_BASE_URL + 'contacts/' + Item_id, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                        .then(response => {
                            if (response.data.success === true) {
                                getContacts()
                                window['showSuccessToast']('Suppression réussie')
                            } else {
                                window['showErrorToast']('Erreur de la suppression')
                            }
                        }).catch(error => {
                        console.log(error)
                    });
                }
            });

        });

        // $('body').on('click', '.edit', function(e) {
        //     e.stopPropagation();
        //     var Item_id = $(this).data('id');
        //     $('#exampleModalLabel1').html("Editer un contact");
        //     axios
        //         .get( process.env.REACT_APP_API_BASE_URL+'contacts/'+Item_id,{
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': 'Bearer ' + localStorage.getItem('token')
        //             }
        //         })
        //         .then(response => {
        //             if(response.data.success === true){
        //                 setName(response.data.name)
        //                 setActivity(response.data.activity)
        //                 setEmail(response.data.email)
        //                 $('#action').val("edit");
        //                 setId(Item_id)
        //                 setTimeout(function(){
        //                     console.log(email)
        //                     handleShow()
        //                 } ,10000);
        //
        //             }
        //             else{
        //                 window['showErrorToast']('Cet element n\'existe pas');
        //             }
        //         }).catch(error=>{
        //             console.log(error)
        //         $('#display_error').text('Error de récupération des données')
        //         $('#display_error').removeClass('d-none');
        //     });
        // });
    }, [itemOffset, itemsPerPage, searchVal])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function getContacts() {
        axios
            .get(process.env.REACT_APP_API_BASE_URL + 'contacts/' + id_user + '/user', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                params: {
                    search_val: searchVal
                }
            })
            .then(response => {
                if (response.data.success === true) {
                    const endOffset = itemOffset + parseInt(itemsPerPage);
                    setCurrentItems(response.data.data.slice(itemOffset, endOffset));
                    setContacts(response.data.data);
                    setPageCount(Math.ceil(response.data.data.length / itemsPerPage));
                    setLoader(false);
                }
            });
    }

    const addNewContact = (e) => {
        e.preventDefault()
        $('#spinner_btn').removeClass('d-none');
        $('#sbt_btn').prop("disabled", true);
        axios
            .post(process.env.REACT_APP_API_BASE_URL + 'contacts', {
                id:id,
                name: name,
                email: email,
                activity: activity,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if (response.data.success === true) {
                    $('#add_contact_form').trigger("reset");
                    window['showSuccessToast']('Enregistrement réussi !!')
                    handleClose();
                    setName('')
                    setActivity('')
                    setEmail('')
                    setId('')
                    getContacts()

                } else {
                }
            }).catch(error => {
            if (error.response.status === 400) {
                window['server_side_alert_error'](error.response.data.data)
                $('#add_contact_modal').animate({scrollTop: 0}, 'slow');
            }
            console.log(error)
        }).finally(function(){
            setTimeout(function(){
                $('#spinner_btn').addClass('d-none')
                $('#sbt_btn').prop("disabled", false);
            } ,200);
        });
    }

    const edit = (e, id) => {
        e.preventDefault()
        var Item_id = id;
        $('#exampleModalLabel1').html("Editer un contact");
        axios
            .get(process.env.REACT_APP_API_BASE_URL + 'contacts/' + Item_id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if (response.data.success === true) {
                    setName(response.data.data.name)
                    setActivity(response.data.data.activity)
                    setEmail(response.data.data.email)
                    setId(Item_id)
                    $('#modal_title').html('Modifier un contact');
                    handleShow()

                } else {
                    window['showErrorToast']('Cet element n\'existe pas');
                }
            }).catch(error => {
            console.log(error)
            $('#display_error').text('Error de récupération des données')
            $('#display_error').removeClass('d-none');
        });
    }

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % contacts.length;
        setItemOffset(newOffset);
    };

    const search = (value) => {
        setSearchVal(value);
    }

    const searchIconAction = (e) => {
        if (searchVal !== '') {
            setSearchVal('');
        }
    }

    function getColor() {
        var color = ['bg-label-success', 'bg-label-danger', 'bg-label-warning', 'bg-label-primary', 'bg-label-second'];
        var i = Math.floor(Math.random() * 5);
        return color[i];
    }

    return (
        <div className='layout-wrapper layout-content-navbar'>
            <div className="layout-container">
                <Sidebar/>
                <div className="layout-page">
                    <NavB/>
                    <div className="mx-5 mt-2" id="general_error"></div>
                    <div className="content-wrapper">
                        {/* Start Content*/}
                        <div className="container-xxl flex-grow-1 container-p-y">

                            <div className="d-flex justify-content-between">
                                <div className="">
                                    <h4>Contact</h4>
                                </div>
                                <div className="">
                                    <div className="head-label text-center"></div>
                                    <div className="dt-action-buttons text-end pt-3 pt-md-0">
                                        <div className="dt-buttons">
                                            <button
                                                className="dt-button buttons-collection btn btn-label-primary dropdown-toggle me-2"
                                                tabIndex="0" aria-controls="DataTables_Table_0" type="button"
                                                aria-haspopup="true" aria-expanded="false"><span><i
                                                className="bx bx-export me-sm-2"/> <span
                                                className="d-none d-sm-inline-block">Export</span></span></button>
                                            <button className="dt-button create-new btn btn-primary" tabIndex="0"
                                                    aria-controls="DataTables_Table_0" type="button"
                                                    id="add_contact_button">
                                       <span><i
                                           className="bx bx-plus me-sm-2"/>
                                       <span className="d-none d-sm-inline-block"> Contact</span>
                                           </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Modal id="add_contact_modal" show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title id="modal_title">Ajout d'un contact</Modal.Title>
                                    {/*<div className="alert alert-danger alert-dismissible m-4 d-none " role="alert" id="serveur_side_error_alert">*/}
                                    {/*    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">*/}
                                    {/*    </button>*/}
                                    {/*</div>*/}
                                </Modal.Header>
                                <form id='add_contact_form' onSubmit={addNewContact}>
                                    <Modal.Body>
                                        <div className="">
                                            <ul id="serveur_side_error" className="text-danger"></ul>
                                            <input type="hidden" id="id" name="id" value={id}
                                                   onChange={e => setId(e.target.value)}/>
                                            <input type="hidden" id="action" name="action"/>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label htmlFor="name" className="form-label">Nom </label>
                                                    <input type="text" id="name" name="name" className="form-control"
                                                           value={name}
                                                           onChange={e => setName(e.target.value)}
                                                           placeholder="Enter Name"/>
                                                </div>
                                            </div>
                                            <div className="row g-2">
                                                <div className="col mb-0">
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <input type="text" id="email" name="email" value={email}
                                                           className="form-control" onChange={e => setEmail(e.target.value)}
                                                           placeholder="xxxx@xxx.xx"/>
                                                </div>
                                                <div className="col mb-0">
                                                    <label htmlFor="activity" className="form-label">Activité</label>
                                                    <input type="text" id="activity" name="activity"
                                                           className="form-control" value={activity}
                                                           onChange={e => setActivity(e.target.value)} placeholder=""/>
                                                </div>
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

                            <div className="card mt-1">
                                <div className="card-header d-flex justify-content-between">
                                    <div className="">
                                        <h5 className="">Liste de vos contacts </h5>
                                    </div>
                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <select id="paginate_field" value={itemsPerPage}
                                                    onChange={e => setItemsPerPage(e.target.value)}
                                                    className="form-select" aria-label="Default select example">
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-group input-group-merge">
                                                <input type="text" id="search" className="form-control"
                                                       value={searchVal} placeholder='Rechercher'
                                                       onChange={e => search(e.target.value)}/>
                                                <span id="remove" className="input-group-text cursor-pointer"
                                                      onClick={searchIconAction}>
                                                    {searchVal !== '' ? <i className=" text-danger fa fa-remove"></i> :
                                                        <i className="bx bx-search"></i>}
                                            </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="text-nowrap m-1">
                                        <DataLoadingSpinner loader={loader}/>
                                        <table style={{width: '100%'}} className="table table-borderless"
                                               id="contact_table">
                                            <thead>
                                            <tr>
                                                <th style={{width: '5%'}}>#</th>
                                                <th style={{width: '35%'}}>Name</th>
                                                <th style={{width: '30%'}}>Email</th>
                                                <th style={{width: '20%'}}>Date d'ajout</th>
                                                <th style={{width: '10%'}}>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {loader === false && contacts &&
                                            currentItems.map((l, k) => <tr key={k}>
                                                <td>{itemOffset + k + 1}</td>
                                                <td>
                                                    <div className="d-flex justify-content-start align-items-center">
                                                        <div className="avatar-wrapper">
                                                            <div className="avatar me-2"><span
                                                                className={"avatar-initial rounded-circle  " + getColor()}>{l.name.charAt(0).toUpperCase()}</span>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-column">
                                                            <span className="emp_name text-truncate">{l.name}</span>
                                                            <small
                                                                className="emp_post text-truncate text-muted">{l.activity}</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{l.email}</td>
                                                <td>{l.created_at}</td>
                                                <td>
                                                    <div className="d-flex justify-content-center">
                                                        <a className="dropdown-item edit" href="#" data-id={l.id}
                                                           onClick={e => {
                                                               edit(e, l.id)
                                                           }}><i className="bx bx-edit-alt me-1"></i></a>
                                                        <a className="dropdown-item delete text-danger" href="#"
                                                           data-id={l.id}><i className="bx bx-trash me-1"></i> </a>
                                                    </div>

                                                </td>
                                            </tr>)}
                                            </tbody>
                                        </table>
                                    </div>
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

export default Contacts;


