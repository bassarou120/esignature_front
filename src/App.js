import React, {useEffect, useRef, useState} from "react";
import {BrowserRouter as Router, Route, Switch, Link, useHistory,useLocation,Redirect} from 'react-router-dom';

import Sidebar from './components/Sidebar';
import NavB from "./components/Nav";
import Footer from "./components/Footer";
import './components/Styles/Style.css';
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

import Sending from "./components/pages/Sendings/Sending";
import Dashboard from "./components/pages/Dashboard";
import ListingSending from "./components/pages/Sendings/ListingSending";
import Models from "./components/pages/Models";
import CDocument from "./components/pages/CDocument";
import Certificat from "./components/pages/Certificat";
import Loader from "./components/Loader";
import ModalChoice from "./components/ModalChoice";
import Profile from "./components/pages/Profile";
import Market from "./components/pages/Market";
import Group from "./components/pages/Groups";
import BillingUser from "./components/pages/BillingUser";
import SettingUser from "./components/pages/SettingUser";
import Member from "./components/pages/Member";
import Contacts from "./components/pages/Contacts";
import ViewSending from "./components/pages/Sendings/ViewSending";
import AddMoreConfig from "./components/pages/Sendings/AddMoreConfig";

import store from "./store";
import {changeModal} from "./actions";

import $ from 'jquery';
import ForgetPassword from "./components/pages/ForgetPassword";
import ResetPassword from "./components/pages/ResetPassword";
import {decrypt} from "./components/Helper";
import AccountActivationMailSent from "./components/pages/AccountActivationMailSent";
import NoFound_error from "./components/pages/404";
import Sendboard from "./components/pages/Sendings/SendBoard";
import axios from "axios";
window.$ = $;

const App = () => {

    const [loader, setLoader] = useState(true);
    const [register_as_model, setRegisterAsModel] = useState(0);
    const [confirmOpen, setConfirmOpen] = useState(true);
    const [userInfo, setUserInfo] = useState([]);
    const [canDisplayChoiceModal, setCanDisplayChoiceModal] = useState(false);
    //const auth_user = $('#root').data('usr');

    const history = useHistory();

   // const currentLocation = window.location.pathname;

    useEffect(() => {
        window.addEventListener('load', function () {
            setLoader(false);
        })
        var  notRequiredAuthPath ='/sendboard/';
        var loc_pt = window.location.pathname;
        if(!loc_pt.includes(notRequiredAuthPath)){
            checkUserIsLoggedIn();
        }

    }, [])

    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [timerId, setTimerId] = useState(false);
    const renderCount = useRef(1);
    useEffect(() => {
        /*const autoLogout = () => {
            var p =window.location.pathname;
            if(!p.includes('sendboard')){
                if (document.visibilityState === "hidden") {
                    const id = window.setTimeout(() => auto_log_out(), 45 * 1000);
                    setTimerId(id);
                } else {
                    window.clearTimeout(timerId);
                }
            }
        };

        document.addEventListener("visibilitychange", autoLogout);
        return () => document.removeEventListener("visibilitychange", autoLogout);*/
    }, [timerId]);

    const auto_log_out=()=>{
        axios
            .post(process.env.REACT_APP_API_BASE_URL+'logout', {},{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.status===200){
                    localStorage.clear();
                    window.location.href='/login'
                }
            });
    }

    const checkUserIsLoggedIn =()=>{
        let array =['/login','/register','/resetpassword','/forgetpassword']
        if (localStorage.getItem('token')){
            // var user = decrypt(localStorage.getItem('userData'));
            if(array.includes(window.location.pathname)){
                window.history.back()
               // history.push('/home')
            }
            let object = decrypt(localStorage.getItem('userData'));
            setUserInfo({
                id:object.id,
                name:object.name,
                email:object.email,
                phone_number:object.phone_number,
                entreprise:object.entreprise,
            })
            let ec = '/sendboard';
            let l = window.location.pathname;
            if(!l.includes(ec)){
                setCanDisplayChoiceModal(true);
            }

        }
        else{
            if(!array.includes(window.location.pathname)){
                window.location.href ='/login';
            }
        }
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
    //     if(currentLocation.includes('detail/sending/')){
    //         return true ;
    //     }
    //     if(!currentLocation.includes('/sending/') && !currentLocation.includes('/more/configuration')){
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    }

    const canAddModalChoice =()=>{
        const splitloc = window.location.href.split("/");
        const lk= splitloc[splitloc.length -1];

        if(lk !=='login' || lk !=='register' || lk !=='forgetpassword' || lk !=='resetpassword'){

            return true;
        }
        else{

            return false
        }
    }

    return loader ? ( <Loader text="" /> ) :
    (
       <>
           {canDisplayChoiceModal ? <ModalChoice  /> :null}

        <Router>

          <Switch>

              <Route
                  exact
                  path="/"
                  render={() => {
                      return (
                          localStorage.getItem('token') ?
                              <Redirect to="/home" /> :
                              <Redirect to="/login" />
                      )
                  }}
              />

            <Route path="/login">
                <Login />
            </Route>

            <Route path="/register">
                <Register/>
            </Route>

              <Route path="/wesentmail" render={(props) => <AccountActivationMailSent {...props}/>}/>

            <Route path="/forgetpassword">
                <ForgetPassword/>
            </Route>

            <Route path="/resetpassword">
                <ResetPassword/>
            </Route>
              <Route path="/home">
                  <Dashboard userinfo={userInfo}/>
              </Route>
              <Route path="/sending/:id">
                  <Sending />
              </Route>
              <Route path="/sendboard/:signataire/:idsending">
                  <Sendboard  />
              </Route>
              <Route path="/model">
                  <Models/>
              </Route>
              <Route path="/listingsending/:statut">
                  <ListingSending />
              </Route>
              <Route path="/detail/sending/:id">
                  <ViewSending />
              </Route>
              <Route path="/more/configuration/:id">
                  <AddMoreConfig />
              </Route>
              <Route path="/certificat">
                  <Certificat />
              </Route>
              <Route path="/cdocuments">
                  <CDocument />
              </Route>
              <Route path="/profile">
                  <Profile />
              </Route>
              <Route path="/market">
                  <Market />
              </Route>
              <Route path="/teams/groups">
                  <Group />
              </Route>
              <Route path="/teams/members">
                  <Member />
              </Route>
              <Route path="/contacts">
                  <Contacts />
              </Route>
              <Route path="/usersetting">
                  <SettingUser />
              </Route>
              <Route path="/userbilling">
                  <BillingUser />
              </Route>
              <Route render={() => <NoFound_error/>} />
          </Switch>



        </Router>
       </>
    );
}

export default App;

