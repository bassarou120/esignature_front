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

const MemberList = ( ) => {

    const [members, setMembers] = useState([]);
    const [show, setShow] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentItems, setCurrentItems] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [loader, setLoader] = useState(true);

    let id_user = decrypt(localStorage.getItem('userId'));

    useEffect(() => {

        const script = document.createElement("script");
        script.src = '../assets/js/member.js';
        document.body.appendChild(script);

        getMembers();

        $('#add_contact_button').click(function () {
            $('#Item_id').val('');
            $('#action').val('add');
            $('#add_contact_form').trigger("reset");
            $('#modal_title').html('Nouveau membre');
            handleShow()
        });

        $('body').on('click', '.delete', function(e) {
            e.preventDefault()
            e.stopPropagation()
            var Item_id = $(this).data("id");
            window.Swal.fire({
                title: 'Are you sure?',
                text: "Voulez vous vraiment supprimer ce membre ?!",
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
                    $.ajax({
                        type: "DELETE",
                        headers: {"Authorization": 'Bearer ' + localStorage.getItem('token')},
                        statusCode: {
                            419: function(responseObject, textStatus, jqXHR) {
                                window['error_419']();
                            },
                            403: function(responseObject, textStatus, jqXHR) {
                                window['showErrorToast']('Action non authorisée');
                            },
                            500:function(responseObject, textStatus, jqXHR){
                                window['showErrorToast']('Erreur serveur');
                            }
                        },
                        url: process.env.REACT_APP_API_BASE_URL+"members/" +Item_id,
                        success: function(data) {
                            if (data.success === true) {
                                getMembers()
                                window['showSuccessToast']('Suppression réussie')
                            } else {
                                window['showErrorToast']('Erreur de la suppression');
                            }
                        },
                        error: function(data, xhr, textStatus) {
                            console.log('Error:', data);
                        }
                    });
                }
            });

        });

        $('body').on('click', '.edit', function(e) {
            e.preventDefault()
            e.stopPropagation()
            var Item_id = $(this).data('id');
            $('#modal_title').html("Editer un membre");
            $.ajax({
                url: process.env.REACT_APP_API_BASE_URL+"members/" + Item_id,
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
                        setName(data.data.name)
                        setEmail(data.data.email)
                        setRole(data.data.role)
                        setId(Item_id)
                        handleShow()
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
        });

    }, [itemOffset, itemsPerPage, searchVal])

    const getMembers=()=>{
        axios
            .get(process.env.REACT_APP_API_BASE_URL + 'members/' + id_user + '/user', {
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
                    setMembers(response.data.data);
                    setPageCount(Math.ceil(response.data.data.length / itemsPerPage));
                    setLoader(false);
                }
            });
    }

    const addNewMember = (e) => {
        e.preventDefault()
        $('#spinner_btn').removeClass('d-none');
        $('#sbt_btn').prop("disabled", true);
        axios
            .post(process.env.REACT_APP_API_BASE_URL + 'contacts', {
                id:id,
                name: name,
                email: email,
                role: role,
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
                    setRole('')
                    setEmail('')
                    setId('')
                    getMembers()

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

    $(document).ready(function() {
        $.ajax({
            url: process.env.REACT_APP_API_BASE_URL +"members/get/statistique",
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
                    $('#members_count').text(data.data.members);
                    $('#groups_count').text(data.data.groups);
                } else {
                    window['showErrorToast']('Erreur');
                }
            },
            error: function(error) {
                console.log(error)
            }
        });
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function getColor(){
        var color = ['bg-label-success','bg-label-danger','bg-label-warning','bg-label-primary','bg-label-second'];
        var i =Math.floor(Math.random() * 5);
        return color[i];
    }

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % members.length;
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

    const renderSpan =(e) =>{
        if(e==='Administrateur'){
            return <span className="badge bg-success">Admin</span>;
        }
        else{
            return <span className="badge bg-danger">Membre</span>;
        }
    }
   return(
       <div className="card">
           <div className="card-header d-flex justify-content-between">
               <div className="">
                   <h5 className="">Liste de vos membres </h5>
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
               <DataLoadingSpinner loader={loader}/>
               <table className="datatables-basic table border-top" id="members_table">
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
                   {loader === false && members &&
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
                       <td>{renderSpan(l.role)}</td>
                       <td>{l.created_at}</td>
                       <td>
                           <div className="d-flex justify-content-center">
                               <a className="dropdown-item edit" href="#" data-id={l.id} ><i className="bx bx-edit-alt me-1"></i></a>
                               <a className="dropdown-item delete text-danger" href="#"
                                  data-id={l.id}><i className="bx bx-trash me-1"></i> </a>
                           </div>

                       </td>
                   </tr>)}
                   </tbody>
               </table>
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

export default MemberList;
