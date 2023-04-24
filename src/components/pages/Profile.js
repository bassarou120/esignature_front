import axios from "axios";
import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import ProfileUlHeader from "../Sample/ProfileUlHeader";
import $ from 'jquery';
import Sidebar from "../Sidebar";
import NavB from "../Nav";
import Footer from "../Footer";
import {decrypt} from "../Helper";

window.$ = $;
var CryptoJS = require("crypto-js");

const Profile = ( ) => {
    const [name, setName] = useState('');
    const [entreprise, setEntreprise] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profileImg, setProfileImg] = useState([]);

    const [agree, setAgree] = useState(false);

    var loading = false ;
    var spinner_delete_account = false ;

    let id_user=decrypt(localStorage.getItem('userId'));
    let user=decrypt(localStorage.getItem('userData'));
    const encrypt = (string) => {
        return CryptoJS.AES.encrypt(JSON.stringify(string), 'esign-DINE-07').toString();
    }

    useEffect(() => {
        const script = document.createElement("script");
        script.src = '../assets/js/pages-account-settings-account.js';
        document.body.appendChild(script);

        if(user.entreprise!=null){
            setEntreprise(user.entreprise);
        }
        if(user.phone_number!=null){
            setPhoneNumber(user.phone_number);
        }
        setName(user.name);

    }, [])

    const updateProfile =(e)=>{
        e.preventDefault()
        loading = true ;
        const data = new FormData()

        data.append('profile', profileImg)
        data.append('entreprise', entreprise)
        data.append('phone_number', phoneNumber)
        data.append('name', name)
        data.append('id', id_user)

        axios
            .post( process.env.REACT_APP_API_BASE_URL+'users',data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
            .then(response => {
                if(response.data.success === true){
                    $('#server_errors').html('');
                    $('#alert_error').addClass('d-none');
                    localStorage.setItem('userData',encrypt(response.data.data) );
                    window['showSuccessToast']('Opération réussie !!');
                }
            }).catch(error=>{
            if(error.response.status===400){
                $('#server_errors').html('');
                $('#alert_error').removeClass('d-none');
                $.each( error.response.data.data, function( key, value ) {
                    $.each( value, function( k, v ) {
                        $('#server_errors').append('<li>'+v+'</li>')
                    });
                });
                $('#top').animate({ scrollTop: 0 }, 'slow');
            }
            else{
                window['showErrorToast']('Erreur de la mise à jour !!');
            }
        }).finally(function(){
            setTimeout(function(){
                loading = false ;
            } ,200);

        });
    }

    const changeAgree =(e)=>{
        setAgree(!agree);
    }

    const deleteAccount =(e)=>{
        e.preventDefault()
        spinner_delete_account = true ;
        axios
            .delete( process.env.REACT_APP_API_BASE_URL+'users/'+id_user,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
            .then(response => {
                if(response.data.success === true){
                    window['showSuccessToast']('Opération réussie !!');
                }
            }).catch(error=>{
            window['showErrorToast']('Erreur de la supression !!');

        }).finally(function(){
            setTimeout(function(){
                spinner_delete_account = false ;
            } ,200);

        });
    }

    const handleChange = (e) => {
        setProfileImg(e.target.files[0])
    }
    return (
        <div className='layout-wrapper layout-content-navbar'  id="top">
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
                                        <h5 className="card-header">Détail du profil</h5>
                                        <form id="formAccountSettings"  onSubmit={updateProfile}  encType="multipart/form-data">
                                            <div className="d-flex justify-content-center ">
                                                <div className="col-md-10">
                                                    <div className="alert alert-danger alert-dismissible d-none" id="alert_error" role="alert" >
                                                        <h6 className="alert-heading d-flex align-items-center fw-bold mb-1">Erreur !!</h6>
                                                        <ul id="server_errors"></ul>
                                                        <button type="button" className="btn-close" data-bs-dismiss="alert"
                                                                aria-label="Close">
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="d-flex align-items-start align-items-sm-center gap-4">
                                                    <img src="../assets/img/avatars/1.png" alt="user-avatar" className="d-block rounded"
                                                         height="100" width="100" id="uploadedAvatar"/>
                                                    <div className="button-wrapper">
                                                        <label htmlFor="upload" className="btn btn-primary me-2 mb-4" tabIndex="0">
                                                            <span className="d-none d-sm-block">Ajouter/Changer photo de profile</span>
                                                            <i className="bx bx-upload d-block d-sm-none"/>
                                                            <input type="file" id="upload" name="profile" className="account-file-input" hidden=""
                                                                   accept="image/png, image/jpeg" onChange={handleChange}/>
                                                        </label>
                                                        <button type="button"
                                                                className="btn btn-outline-secondary account-image-reset mb-4">
                                                            <i className="bx bx-reset d-block d-sm-none"/>
                                                            <span className="d-none d-sm-block">Vider</span>
                                                        </button>
                                                        <p className="text-muted mb-0">Image JPG, GIF or PNG. Taille maximal 1Mo</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-0"/>
                                            <div className="card-body">
                                                    <div className="row">
                                                        <div className="mb-3 col-md-6">
                                                            <label htmlFor="name" className="form-label">Nom et prénom</label>
                                                            <input className="form-control" type="text" id="name" name="name" value={name} onChange={e => {setName(e.target.value)}} autoFocus=""/>
                                                        </div>
                                                        <div className="mb-3 col-md-6">
                                                            <label htmlFor="entreprise" className="form-label">Entreprise</label>
                                                            <input type="text" className="form-control" id="entreprise"  name="entreprise" value={entreprise} onChange={e => {setEntreprise(e.target.value)}} />
                                                        </div>
                                                        <div className="mb-3 col-md-6">
                                                            <label className="form-label" htmlFor="phoneNumber">Numero de téléphone</label>
                                                            <div className="input-group input-group-merge">
                                                                <span className="input-group-text">Bj(+229)</span>
                                                                <input type="text" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={e => {setPhoneNumber(e.target.value)}}
                                                                       className="form-control" placeholder="97 00 00 00"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <button type="submit" className="btn btn-primary me-2" id="sbt_btn" >
                                                            <span id="spinner_btn" className={`spinner-border ${loading ? "" : "d-none"}`}  role="status" aria-hidden="true"/>
                                                            Enregistrer
                                                        </button>
                                                    </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card">
                                        <h5 className="card-header">Supprimer mon compte</h5>
                                        <div className="card-body">
                                            <div className="mb-3 col-12 mb-0">
                                                <div className="alert alert-warning">
                                                    <h6 className="alert-heading fw-bold mb-1">Êtes vous sûr de vouloir supprimer votre compte ?</h6>
                                                    <p className="mb-0">Vous ne pourriez pas revenir en arrière.</p>
                                                </div>
                                            </div>
                                            <form id="formAccountDeactivation" onSubmit={deleteAccount}>
                                                <div className="form-check mb-3">
                                                    <input className="form-check-input" type="checkbox" name="accountActivation"
                                                           id="accountActivation" onChange={changeAgree} />
                                                    <label className="form-check-label" htmlFor="accountActivation">Je confirme la suppression</label>
                                                </div>
                                                <button type="submit"  className={`btn btn-danger deactivate-account ${agree ? "" : "disabled"}`} >
                                                    <span id="spinner_btn" className={`spinner-border ${spinner_delete_account ? "" : "d-none"}`}  role="status" aria-hidden="true"/>
                                                    Supprimer
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


