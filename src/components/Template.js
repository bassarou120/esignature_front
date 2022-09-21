import React, {useEffect, useState} from "react";

import Sidebar from './components/Sidebar';
import NavB from "./components/Nav";
import Footer from "./components/Footer";
import './components/Styles/Style.css';

import Loader from "./components/Loader";
import ModalChoice from "./components/ModalChoice";

import $ from 'jquery';
import {useHistory} from "react-router-dom";
window.$ = $;

const Template = () => {

    const [loader, setLoader] = useState(true);
    const [userInfo, setUserInfo] = useState([]);
    const history = useHistory();
    console.log(history);
    const currentLocation = window.location.pathname;

    useEffect(() => {

        window.addEventListener('load', function () {
            setLoader(false);
        })
        checkUserIsLoggedIn();

    }, [])

    const checkUserIsLoggedIn =()=>{
        if (localStorage.getItem('token')){
            let object = JSON.parse( decrypt(localStorage.getItem('userData') || '{}'));
            setUserInfo({
                id:object.id,
                name:object.name,
                email:object.email,
                phone_number:object.phone_number,
                entreprise:object.entreprise,
            })
        }
        else{
            // history.push('/login');
            // return <Redirect to='/login'/>
            // window.location.href ='/login'
        }
    }

    const decrypt = (string) => {
        //  return JSON.parse(CryptoJS.AES.decrypt(string, 'e-sign').toString(CryptoJS.enc.Utf8));
        return JSON.parse(string);
    }

    const embedClasses=()=>{
        var can = canDisplaySideBarAndNav();
        if(can){
            return 'layout-wrapper layout-content-navbar';
        }
        else{
            return 'layout-wrapper layout-content-navbar layout-without-menu';
        }
    }

    const canDisplaySideBarAndNav=()=>{
        if(currentLocation.includes('detail/sending/')){
            return true ;
        }
        if(!currentLocation.includes('/sending/') && !currentLocation.includes('/more/configuration')){
            return true;
        }
        else{
            return false;
        }
    }

    return loader ? ( <Loader text="" /> ) :
        (
                <div className={embedClasses()}>
                    <ModalChoice/>
                    <div className="layout-container">

                            {canDisplaySideBarAndNav() ? <Sidebar /> : ''}
                            <div className="layout-page">
                                {canDisplaySideBarAndNav() ? <NavB/> : ''}

                                <div className="mx-5 mt-2" id="general_error"></div>
                                <div className="content-wrapper">
                                    {/* Start Content*/}

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

export default Template;

