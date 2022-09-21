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
    let id_user=decrypt(localStorage.getItem('userId'));
    const [smShow, setSmShow] = useState(false);
    const [loader, setLoader] = useState(true);


    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentItems, setCurrentItems] = useState([]);

    const [isSearchable, setIsSearchable] = useState(true);

    const handleClose = () => setSmShow(false);
    const handleShow = () => setSmShow(true);

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

    const send=()=>{

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
                    <Modal  size="sm" show={smShow} onHide={() => setSmShow(false)} backdrop="static"
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
                            <button type="button" onClick={send()} className="btn btn-primary">Partager
                            </button>
                        </Modal.Footer>
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
                                        <button type="button" onClick={send(l.id)} className="btn btn-label-primary m-2">Envoyer</button>
                                        {/*<button type="button" onClick={share(l.id)} className="btn btn-label-secondary m-2">Partager</button>*/}
                                        <button type="button" className="btn btn-label-secondary m-2" onClick={handleShow}>
                                            Partager
                                        </button>
                                        <div className="dropdown m-2">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"><i className="bx bx-dots-vertical-rounded"/>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item duplicate" data-id={l.id} href="!#">
                                                    <i className="fa fa-paste me-1"/>
                                                    Dupliquer
                                                </a>
                                                <a className="dropdown-item delete text-danger" data-id={l.id} href="!#">
                                                    <i className="bx bx-trash me-1"/>
                                                    Supprimer
                                                </a>
                                            </div>
                                        </div>
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
