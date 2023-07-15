import axios from "axios";
import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import {Link, Redirect, useHistory} from 'react-router-dom';
import $ from 'jquery';
import Log_nav from "../Log_nav";
import SocialMediaIcon from "../SocialMediaIcon";

window.$ = $;


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [termAndCondition, setTermAndCondition] = useState(false);
    const [loading, setLoading] = useState(false);
    var em='';
    var id='';

    const  history= useHistory();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = '../assets/js/validation/login.js';
        document.body.appendChild(script);

        var url_string = window.location.href;
        var url = new URL(url_string);
        // em =atob(url.searchParams.get("email")) ;
        // id =url.searchParams.get("id") ;
      
        if(em !==''){
            setEmail(em);
        }
       // console.log(em)
    }, [])

    const registerNewUser =(e)=>{
        e.preventDefault()
        // window['startspinner']();
        //setLoading(true);
        $('#spinner_btn').removeClass('d-none');
        $('#sbt_btn').prop("disabled", true);
        axios
            .post( process.env.REACT_APP_API_BASE_URL+'register',
                {
                    name:name,
                    email: email,
                    password:password,
                    password_confirmation:confirm_password,
                    member_id:id
                })
            .then(response => {
                if(response.data.success === true){
                    history.push('/wesentmail',{ email: email });
                }
            }).catch(error=>{
            console.log(error);
            //if(error.response.status===400){
               $('#registration_error').text('Erreur de la création du compte !')
                $('#registration_error').animate({ scrollTop: 0 }, 'slow');
           // }
        }).finally(function(){
            setTimeout(function(){
                $('#spinner_btn').addClass('d-none')
                $('#sbt_btn').prop("disabled", false);
            } ,200);

        });
        // window['endspinner']();
       // setLoading(false);
    }

    const changeTermsANdCondition =(e)=>{
        setTermAndCondition(!termAndCondition);
    }

    function showPassword() {
        if($('#password').attr('type')==='password'){
            $('#password').attr('type','text')
            $('#eye').children().removeClass('bx-hide');
            $('#eye').children().addClass('bx-show');
        }
        else{
            $('#password').attr('type','password')
            $('#eye').children().addClass('bx-hide');
            $('#eye').children().removeClass('bx-show');
        }
    }

    return (
        <div id="app">
            <Log_nav/>
            <main className="py-4">
                <div className="authentication-wrapper authentication-cover">
                    <div className="authentication-inner row m-0">
                        <div className="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5">
                            <div className="w-100 d-flex justify-content-center">
                                <img src="assets/img/illustrations/Mobilelogin-pana.svg" className="img-fluid"
                                     alt="Login image" width="700"
                                     data-app-dark-img="illustrations/boy-with-rocket-dark.png"
                                     data-app-light-img="illustrations/boy-with-rocket-light.png"/>
                            </div>
                        </div>
                        <div className="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-5 p-4">
                            <div className="w-px-400 mx-auto">
                                <div className="app-brand mb-5">
                                    <a href="#" className="app-brand-link gap-2">
                                        <span className="app-brand-logo demo">

                                            <svg width="25" viewBox="0 0 25 42" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                 xmlnsXlink="http://www.w3.org/1999/xlink">
                                              <defs>
                                                <path
                                                    d="M13.7918663,0.358365126 L3.39788168,7.44174259 C0.566865006,9.69408886 -0.379795268,12.4788597 0.557900856,15.7960551 C0.68998853,16.2305145 1.09562888,17.7872135 3.12357076,19.2293357 C3.8146334,19.7207684 5.32369333,20.3834223 7.65075054,21.2172976 L7.59773219,21.2525164 L2.63468769,24.5493413 C0.445452254,26.3002124 0.0884951797,28.5083815 1.56381646,31.1738486 C2.83770406,32.8170431 5.20850219,33.2640127 7.09180128,32.5391577 C8.347334,32.0559211 11.4559176,30.0011079 16.4175519,26.3747182 C18.0338572,24.4997857 18.6973423,22.4544883 18.4080071,20.2388261 C17.963753,17.5346866 16.1776345,15.5799961 13.0496516,14.3747546 L10.9194936,13.4715819 L18.6192054,7.984237 L13.7918663,0.358365126 Z"
                                                    id="path-1"></path>
                                                <path
                                                    d="M5.47320593,6.00457225 C4.05321814,8.216144 4.36334763,10.0722806 6.40359441,11.5729822 C8.61520715,12.571656 10.0999176,13.2171421 10.8577257,13.5094407 L15.5088241,14.433041 L18.6192054,7.984237 C15.5364148,3.11535317 13.9273018,0.573395879 13.7918663,0.358365126 C13.5790555,0.511491653 10.8061687,2.3935607 5.47320593,6.00457225 Z"
                                                    id="path-3"></path>
                                                <path
                                                    d="M7.50063644,21.2294429 L12.3234468,23.3159332 C14.1688022,24.7579751 14.397098,26.4880487 13.008334,28.506154 C11.6195701,30.5242593 10.3099883,31.790241 9.07958868,32.3040991 C5.78142938,33.4346997 4.13234973,34 4.13234973,34 C4.13234973,34 2.75489982,33.0538207 2.37032616e-14,31.1614621 C-0.55822714,27.8186216 -0.55822714,26.0572515 -4.05231404e-15,25.8773518 C0.83734071,25.6075023 2.77988457,22.8248993 3.3049379,22.52991 C3.65497346,22.3332504 5.05353963,21.8997614 7.50063644,21.2294429 Z"
                                                    id="path-4"></path>
                                                <path
                                                    d="M20.6,7.13333333 L25.6,13.8 C26.2627417,14.6836556 26.0836556,15.9372583 25.2,16.6 C24.8538077,16.8596443 24.4327404,17 24,17 L14,17 C12.8954305,17 12,16.1045695 12,15 C12,14.5672596 12.1403557,14.1461923 12.4,13.8 L17.4,7.13333333 C18.0627417,6.24967773 19.3163444,6.07059163 20.2,6.73333333 C20.3516113,6.84704183 20.4862915,6.981722 20.6,7.13333333 Z"
                                                    id="path-5"></path>
                                              </defs>
                                              <g id="g-app-brand" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <g id="Brand-Logo" transform="translate(-27.000000, -15.000000)">
                                                  <g id="Icon" transform="translate(27.000000, 15.000000)">
                                                    <g id="Mask" transform="translate(0.000000, 8.000000)">
                                                      <mask id="mask-2" fill="white">
                                                        <use xlinkHref="#path-1"></use>
                                                      </mask>
                                                      <use fill="#696cff" xlinkHref="#path-1"></use>
                                                      <g id="Path-3" mask="url(#mask-2)">
                                                        <use fill="#696cff" xlinkHref="#path-3"></use>
                                                        <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-3"></use>
                                                      </g>
                                                      <g id="Path-4" mask="url(#mask-2)">
                                                        <use fill="#696cff" xlinkHref="#path-4"></use>
                                                        <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-4"></use>
                                                      </g>
                                                    </g>
                                                    <g id="Triangle"
                                                       transform="translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000) ">
                                                      <use fill="#696cff" xlinkHref="#path-5"></use>
                                                      <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-5"></use>
                                                    </g>
                                                  </g>
                                                </g>
                                              </g>
                                            </svg>

                                        </span>
                                        <span className="app-brand-text demo text-body fw-bolder">{process.env.REACT_APP_NAME}</span>
                                    </a>
                                </div>
                                <h4 className="mb-2"> L'aventure commence ici 🚀</h4>
                                <p className="mb-4">Rendez l'utilisation de votre applications facile et amusant !</p>

                                <form id="formAuthenticationRegister" onSubmit={registerNewUser}
                                      className="mb-3 fv-plugins-bootstrap5 fv-plugins-framework"
                                      method="POST" noValidate="novalidate">
                                    <p className="text-center text-danger" id="registration_error"></p>
                                    <div className="mb-3 fv-plugins-icon-container">
                                        <label form="username" className="form-label">Nom et Prénom</label>
                                        <input type="text" id="name" name="name"
                                               placeholder="" autoFocus="" className="form-control" value={name}
                                               onChange={e => {
                                                   setName(e.target.value)
                                               }} required />
                                        <div className="fv-plugins-message-container invalid-feedback"></div>
                                        <span className="invalid-feedback" role="alert">
                                        <strong id="name_error"></strong>
                                    </span>

                                    </div>
                                    <div className="mb-3 fv-plugins-icon-container">
                                        <label form="email" className="form-label">Adresse Email</label>
                                        {
                                            em && em!=='' && <input type="text" className="form-control" id="email" name="email"
                                                                       value={em} />
                                        }
                                        {
                                            !em && <input type="text" className="form-control" id="email" name="email"
                                                          value={email} onChange={e => {setEmail(e.target.value)}}
                                                          placeholder="Enter your email"/>
                                        }

                                        <div className="fv-plugins-message-container invalid-feedback"></div>
                                        <span className="invalid-feedback" role="alert">
                                        <strong id="email_error"></strong>
                                    </span>

                                    </div>
                                    <div className="mb-3 form-password-toggle fv-plugins-icon-container">
                                        <label className="form-label" form="password">Mot de passe</label>
                                        <div className="input-group input-group-merge has-validation">
                                            <input type="password" id="password" className="form-control"
                                                   name="password"
                                                   placeholder="············" aria-describedby="password"
                                                   value={password} onChange={e => {
                                                setPassword(e.target.value)
                                            }}/>
                                            <span id="eye" className="input-group-text cursor-pointer" onClick={showPassword}>
                                             <i className="bx bx-hide"></i>
                                            </span>
                                        </div>
                                        <div className="fv-plugins-message-container invalid-feedback"></div>

                                        <span className="invalid-feedback" role="alert">
                                        <strong id="password_error"></strong>
                            </span>

                                    </div>

                                    <div className="mb-3 form-passwopassword_confirmationrd-toggle fv-plugins-icon-container">
                                        <label className="form-label" form="password">Confirmation mot de passe</label>
                                        <div className="input-group input-group-merge has-validation">
                                            <input type="password" id="" className="form-control"
                                                   name="password_confirmation"
                                                   placeholder="············" aria-describedby="password"
                                                   value={confirm_password} onChange={e => {
                                                setConfirmPassword(e.target.value)
                                            }}/>
                                        </div>
                                        <div className="fv-plugins-message-container invalid-feedback"></div>

                                        <span className="invalid-feedback" role="alert">
                                        <strong id="error_password_confirmation"></strong>
                                      </span>

                                    </div>

                                    <div className="mb-3 fv-plugins-icon-container">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="terms-conditions"
                                                   name="terms"  onChange={changeTermsANdCondition}/>
                                            <label className="form-check-label" form="terms-conditions">
                                                Je suis d'accord avec les
                                                <a href="#"> termes &amp; conditions</a>
                                            </label>
                                            <div className="fv-plugins-message-container invalid-feedback"></div>
                                        </div>
                                    </div>

                                    <button type="submit" className={`btn btn-primary w-100 ${termAndCondition ? "" : "disabled"}`} id="sbt_btn" >
                                        <span id="spinner_btn" className="spinner-border d-none" role="status" aria-hidden="true"></span>
                                        {/*<span id="spinner_btn" className={`spinner-border ${loading ? "" : "d-none"}`} role="status" aria-hidden="true"></span>*/}
                                        S'inscrire
                                    </button>
                                    <div></div>
                                    <input type="hidden"/>
                                </form>

                                <p className="text-center">
                                    <span>Vous avez déjà un compte ?</span>
                                    <Link to="/login">
                                        <span>Se connecter</span>
                                    </Link>
                                </p>

                                {/*<div className="divider my-4">*/}
                                {/*    <div className="divider-text">or</div>*/}
                                {/*</div>*/}

                                {/*<SocialMediaIcon/>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}

export default Register;
