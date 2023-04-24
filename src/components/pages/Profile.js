import axios from "axios";
import React from "react";
import ReactDOM from 'react-dom';
import ProfileUlHeader from "../Sample/ProfileUlHeader";
import $ from 'jquery';
import Sidebar from "../Sidebar";
import NavB from "../Nav";
import Footer from "../Footer";
window.$ = $;


const Profile = ( ) => {

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

                            <h4 className="fw-bold py-3 mb-4">
                                <span className="text-muted fw-light">Paramètre du compte /</span> Compte
                            </h4>

                            <div className="row">
                                <div className="col-md-12">
                                    <ProfileUlHeader/>
                                    <div className="card mb-4">
                                        <h5 className="card-header">Détail du profile</h5>

                                        <div className="card-body">
                                            <div className="d-flex align-items-start align-items-sm-center gap-4">
                                                <img src="../assets/img/avatars/1.png" alt="user-avatar" className="d-block rounded"
                                                     height="100" width="100" id="uploadedAvatar"/>
                                                <div className="button-wrapper">
                                                    <label htmlFor="upload" className="btn btn-primary me-2 mb-4" tabIndex="0">
                                                        <span className="d-none d-sm-block">Ajouter/Changer photo de profile</span>
                                                        <i className="bx bx-upload d-block d-sm-none"/>
                                                        <input type="file" id="upload" className="account-file-input" hidden=""
                                                               accept="image/png, image/jpeg"/>
                                                    </label>
                                                    <button type="button"
                                                            className="btn btn-outline-secondary account-image-reset mb-4">
                                                        <i className="bx bx-reset d-block d-sm-none"/>
                                                        <span className="d-none d-sm-block">Vider</span>
                                                    </button>

                                                    <p className="text-muted mb-0">Image JPG, GIF or PNG. Taille maximal de 800K</p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="my-0"/>
                                        <div className="card-body">
                                            <form id="formAccountSettings" method="POST" onSubmit="return false">
                                                <div className="row">
                                                    <div className="mb-3 col-md-6">
                                                        <label htmlFor="firstName" className="form-label">Nom et prénom</label>
                                                        <input className="form-control" type="text" id="firstName" name="firstName"
                                                               value="John" autoFocus=""/>
                                                    </div>
                                                    <div className="mb-3 col-md-6">
                                                        <label htmlFor="organization" className="form-label">Entreprise</label>
                                                        <input type="text" className="form-control" id="organization"
                                                               name="organization" value="ThemeSelection"/>
                                                    </div>
                                                    <div className="mb-3 col-md-6">
                                                        <label className="form-label" htmlFor="phoneNumber">Numero de téléphone</label>
                                                        <div className="input-group input-group-merge">
                                                            <span className="input-group-text">US (+1)</span>
                                                            <input type="text" id="phoneNumber" name="phoneNumber"
                                                                   className="form-control" placeholder="202 555 0111"/>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className="mt-2">
                                                    <button type="submit" className="btn btn-primary me-2">Enregistrer</button>
                                                    <button type="reset" className="btn btn-outline-secondary">Annuler</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <h5 className="card-header">Supprimer mon compte</h5>
                                        <div className="card-body">
                                            <div className="mb-3 col-12 mb-0">
                                                <div className="alert alert-warning">
                                                    <h6 className="alert-heading fw-bold mb-1">Êtes vous sûr de vouloir supprimer votre compte ?</h6>
                                                    <p className="mb-0">Vous ne pouriez pas revenir en arrière.</p>
                                                </div>
                                            </div>
                                            <form id="formAccountDeactivation" onSubmit="return false">
                                                <div className="form-check mb-3">
                                                    <input className="form-check-input" type="checkbox" name="accountActivation"
                                                           id="accountActivation"/>
                                                    <label className="form-check-label" htmlFor="accountActivation">Je confirme la suppression</label>
                                                </div>
                                                <button type="submit" className="btn btn-danger deactivate-account">Supprimer
                                                </button>
                                            </form>
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

export default Profile;


