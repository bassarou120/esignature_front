import axios from "axios";
import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import TableList from "../../TableList";
import {Link, Router, useParams} from 'react-router-dom'
import store from "../../../store";
import {changeModal} from "../../../actions";
import $ from 'jquery';
import Sidebar from "../../Sidebar";
import NavB from "../../Nav";
import Footer from "../../Footer";
import {decrypt} from "../../Helper";
import ReactPaginate from 'react-paginate';
import DataLoadingSpinner from "../../DataLoadingSpinner";

window.$ = $;

const ListingSending = () => {
    const {statut} = useParams()
    const [type_signature, setTypeSignature] = useState(1);
    const [data, setData] = useState([]);

    let badgeSpanConst = badgeSpan()
    let id_user = decrypt(localStorage.getItem('userId'));

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentItems, setCurrentItems] = useState([]);


    const [searchVal, setSearchVal] = useState('');
    const [loader, setLoader] = useState(true);

    function badgeSpan() {

        if (statut == 'pending') {
            return ['bg-warning', 'En cours'];
        } else if (statut == 'ended') {
            return ['bg-success', 'Finir'];
        } else if (statut == 'all') {
            return ['bg-info', 'Tout'];
        } else {
            return ['bg-danger', 'Archivé'];
        }
    }

    useEffect(() => {

            getDataTableInfo();

           $('#add_member_button').click(function() {
               $('#id').val('');
               $('#action').val('add');
               $('#add_member_form').trigger("reset");
               $('#exampleModalLabel1').html("Nouveau membre");
               $('#add_member_modal').modal('show');
           });

           $('body').on('click', '.delete', function(e) {
               e.preventDefault()
               e.stopPropagation()
               var Item_id = $(this).data("id");
               window.Swal.fire({
                   title: 'Are you sure?',
                   text: "Voulez vous vraiment supprimer cette ligne ?!",
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
                           .delete(process.env.REACT_APP_API_BASE_URL+'sendings/'+Item_id,{
                               headers: {
                                   'Content-Type': 'application/json',
                                   'Authorization': 'Bearer ' + localStorage.getItem('token')
                               }
                           })
                           .then(response => {
                               if (response.data.success === true) {
                                   getDataTableInfo()
                                   window['showSuccessToast']('Action reussie')
                               } else {
                                   window['showErrorToast']('Action non effectuée')
                               }
                           }).catch(function(error) {
                          console.log(error)
                       });

                   }
               });

           });

           $('body').on('click', '.type', function(e) {
               e.preventDefault();
               e.stopPropagation();
               $(".type").each(function(index) {
                   if ($(this).hasClass('active')) {
                       $(this).removeClass('active')
                   }
               });
               $(this).addClass('active');
               getDataTableInfo();
               setTypeSignature($(this).data('id'));
           });

           $('body').on('click', '.archive', function(e) {
               e.preventDefault();
               e.stopPropagation();
               const data = new FormData()
               data.append('id', $(this).data("id"))
               axios
                   .post(process.env.REACT_APP_API_BASE_URL+'sendings/archived', data,{
                       headers: {
                           'Content-Type': 'application/json',
                           'Authorization': 'Bearer ' + localStorage.getItem('token')
                       }
                   })
                   .then(response => {
                       if (response.data.success === true) {
                           getDataTableInfo()
                           window['showSuccessToast']('Action reussie')
                       } else {
                           window['showErrorToast']('Action non effectuée')
                       }
                   }).catch(function(error) {
                       if (error.response) {
                           if (error.response.status === 400) {
                               $('#modal_error_ul').html('');
                               $('#modal_error').removeClass('d-none');
                               $.each(error.response.data.data, function(key, value) {
                                   $('#modal_error_ul').append('<li class="list-group-item">' + value + '</li>');
                               });
                           }
                           window['endspinner']();
                       }
                   });

           });


            }, [statut,itemOffset, itemsPerPage,searchVal])

    function getDataTableInfo() {
        setLoader(true) ;
        var url = ''
        if($('.type.active').data('id')===0){
             url = process.env.REACT_APP_API_BASE_URL + 'sendings/' + id_user + '/user'
        }
        else{
             url =process.env.REACT_APP_API_BASE_URL + 'sendings/' + id_user + '/user/'+ $('.type.active').data('id')
        }

        var param={
            statut:statut
        }

        if(searchVal !==''){
            param['search_val']=searchVal;
        }

        axios
            .get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                params:param
            })
            .then(response => {
                if (response.data.success === true) {
                    const endOffset = itemOffset + parseInt(itemsPerPage);
                    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
                        setCurrentItems(response.data.data.slice(itemOffset, endOffset));
                        setData(response.data.data);
                        setPageCount(Math.ceil(response.data.data.length / itemsPerPage));
                        setLoader(false) ;
                }
            });

    }

    function Items({elementToDisplay}) {
        //console.log(elementToDisplay)
        return (
            <tbody>
            {elementToDisplay.length!==0 ? elementToDisplay.map((l,k) => <tr key={k}>
                <td>{itemOffset + k + 1}</td>
                <td>{l.document[0].title}</td>
                <td>{l.created_at}</td>
                <td>{l.nbre_signataire}</td>
                <td>{ renderSpanStatut(l.statut[0].name)}</td>
                <td><div className="dropdown">
                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow"
                            data-bs-toggle="dropdown"><i className="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item show" to={"/detail/sending/"+l.id} data-id={l.id}><i className="fa  fa-info-circle me-1"></i> Voir</Link>
                        <a className="dropdown-item edit" href="#" data-id={l.id}><i className="bx bx-edit-alt me-1"></i> Edit</a>
                        {l.statut[0].name!=='EN_COURS' &&
                        <a className="dropdown-item archive" href="#" data-id={l.id}><i className="bx bx-archive me-1"></i> Archiver</a>
                        }
                        <a className="dropdown-item delete text-danger" href="#" data-id={l.id}><i className="bx bx-trash me-1"></i> Supprimer</a>

                    </div>
                </div></td>
            </tr>) : <tr>
                <td colSpan="6" className="text-center">Aucun élément à afficher </td>
            </tr>}
            </tbody>
        );
    }

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % data.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    function openChoiceModal() {
        store.dispatch(changeModal({model: 0}));
        console.log(store.getState())
    }

    window.store = store;
    window.changeModal = changeModal;
    const s = store.getState();

    const renderSpanStatut =(name)=>{
        if (name === 'EN_COURS') {
            return <span className="badge bg-label-warning me-1">En attente</span>
        } else if (name === 'FINIR') {
            return <span className="badge bg-label-success me-1">Finir</span>
        } else if (name === 'ARCHIVER') {
           return <span className="badge bg-label-danger me-1">Archiver</span>
        }
    }

    const search = (value)=>{
      setSearchVal(value);
    }

    const searchIconAction=(e)=>{
       if(searchVal!==''){
          setSearchVal('');
       }
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

                            <h4 className="fw-bold py-1 ">
                                <span className="text-muted fw-light">Listing des envois</span>

                            </h4>
                            <span className={`badge rounded-pill ${badgeSpanConst[0]}`}>{badgeSpanConst[1]}</span>

                            <div className=" d-flex justify-content-between mb-3">
                                <ul className="nav nav-pills flex-column flex-md-row all-signature-type"
                                    style={{marginTop: '1px !important'}}>
                                    <li className="nav-item">
                                        <a className="nav-link type active" href="!#" data-id="0">
                                            <i className=" bx bx-certification me-1"/> Tous
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link type " href="!#" data-id="1">
                                            <i className=" bx bx-certification me-1"/> Avancée
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link type" href="" data-id="2">
                                            <i className="fa fa-mouse-pointer me-1"/> Simple
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link type" href="" data-id="3">
                                            <i className="bx bxs-envelope me-1"/> Envoi recommandé</a>
                                    </li>
                                </ul>
                                <div className="">
                                    <div className="demo-inline-spacing">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                                data-bs-target="#onboardingSlideModal" onClick={openChoiceModal}>
                                            <span className="tf-icons bx bx-plus"/>&nbsp; Nouvel envoi
                                        </button>
                                        <button type="button" className="btn btn-secondary">
                                            <span className="tf-icons bx bx-export"/>&nbsp; Exporter
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <div className="">
                                        <h5 className="">Listings de vos envois</h5>
                                    </div>
                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <select id="paginate_field" value={itemsPerPage} onChange={e=>setItemsPerPage(e.target.value)} className="form-select" aria-label="Default select example">
                                                <option  value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-group input-group-merge">
                                                <input type="text" id="search" className="form-control" value={searchVal} placeholder='Rechercher' onChange={e=>search(e.target.value)}/>
                                                <span id="remove" className="input-group-text cursor-pointer" onClick={searchIconAction}>
                                                    {searchVal!==''?<i className=" text-danger fa fa-remove"></i>:<i className="bx bx-search"></i>}
                                            </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="text-nowrap m-1">
                                        <DataLoadingSpinner loader={loader}/>
                                        <table className="table table-borderless" id="sending_table"
                                               style={{"width": "100%"}}>
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th style={{"width": "25%"}}>Document</th>
                                                <th style={{"width": "25%"}}>Date</th>
                                                <th style={{"width": "15%"}}>Signataire</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                           <Items elementToDisplay={currentItems} />
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

export default ListingSending;