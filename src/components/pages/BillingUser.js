import axios from "axios";
import React from "react";
import ReactDOM from 'react-dom';
import ProfileUlHeader from "../Sample/ProfileUlHeader";
import Sidebar from "../Sidebar";
import NavB from "../Nav";
import ModelList from "../ModelList";
import Footer from "../Footer";


const BillingUser = () => {

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
                                <span className="text-muted fw-light">Facturation</span>
                            </h4>

                            <div className="row">
                                <div className="col-md-12">
                                    <ProfileUlHeader/>
                                    <div className="card mb-4">
                                        <h5 className="card-header">Current Plan</h5>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6 mb-1">
                                                    <div className="mb-4">
                                                        <h6 className="fw-semibold mb-2">Your Current Plan is Basic</h6>
                                                        <p>A simple start for everyone</p>
                                                    </div>
                                                    <div className="mb-4">
                                                        <h6 className="fw-semibold mb-2">Active until Dec 09, 2021</h6>
                                                        <p>We will send you a notification upon Subscription expiration</p>
                                                    </div>
                                                    <div className="mb-4">
                                                        <h6 className="fw-semibold mb-2"><span className="me-2">$199 Per Month</span>
                                                            <span className="badge bg-label-primary">Popular</span></h6>
                                                        <p>Standard plan for small to medium businesses</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-1">
                                                    <div className="alert alert-warning mb-4" role="alert">
                                                        <h6 className="alert-heading fw-bold mb-1">We need your attention!</h6>
                                                        <span>Your plan requires update</span>
                                                    </div>
                                                    <div className="plan-statistics">
                                                        <div className="d-flex justify-content-between">
                                                            <span className="fw-semibold mb-2">Days</span>
                                                            <span className="fw-semibold mb-2">24 of 30 Days</span>
                                                        </div>
                                                        <div className="progress">
                                                            <div className="progress-bar w-75" role="progressbar" aria-valuenow="75"
                                                                 aria-valuemin="0" aria-valuemax="100"/>
                                                        </div>
                                                        <p className="mt-1 mb-0">6 days remaining until your plan requires update</p>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-primary me-2 mt-2" data-bs-toggle="modal"
                                                            data-bs-target="#pricingModal">Upgrade Plan
                                                    </button>
                                                    <button className="btn btn-label-secondary cancel-subscription mt-2">Cancel
                                                        Subscription
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="card mb-4">
                                        <h5 className="card-header">Payment Methods</h5>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <form id="creditCardForm"
                                                          className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework fv-plugins-icon-container"
                                                          onSubmit="return false" noValidate="novalidate">
                                                        <div className="col-12">
                                                            <div className="form-check form-check-inline">
                                                                <input name="collapsible-payment" className="form-check-input"
                                                                       type="radio" value="" id="collapsible-payment-cc" checked=""/>
                                                                <label className="form-check-label"
                                                                       htmlFor="collapsible-payment-cc">Credit/Debit/ATM
                                                                    Card</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input name="collapsible-payment" className="form-check-input"
                                                                       type="radio" value="" id="collapsible-payment-cash"/>
                                                                <label className="form-check-label"
                                                                       htmlFor="collapsible-payment-cash">Paypal account</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label w-100" htmlFor="paymentCard">Card
                                                                Number</label>
                                                            <div className="input-group input-group-merge has-validation">
                                                                <input id="paymentCard" name="paymentCard"
                                                                       className="form-control credit-card-mask" type="text"
                                                                       placeholder="1356 3215 6548 7898"
                                                                       aria-describedby="paymentCard2"/>
                                                                <span className="input-group-text cursor-pointer p-1"
                                                                      id="paymentCard2"><span className="card-type"/></span>
                                                            </div>
                                                            <div className="fv-plugins-message-container invalid-feedback"/>
                                                        </div>
                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label" htmlFor="paymentName">Name</label>
                                                            <input type="text" id="paymentName" className="form-control"
                                                                   placeholder="John Doe"/>
                                                        </div>
                                                        <div className="col-6 col-md-3">
                                                            <label className="form-label" htmlFor="paymentExpiryDate">Exp. Date</label>
                                                            <input type="text" id="paymentExpiryDate"
                                                                   className="form-control expiry-date-mask" placeholder="MM/YY"/>
                                                        </div>
                                                        <div className="col-6 col-md-3">
                                                            <label className="form-label" htmlFor="paymentCvv">CVV Code</label>
                                                            <div className="input-group input-group-merge">
                                                                <input type="text" id="paymentCvv"
                                                                       className="form-control cvv-code-mask" maxLength="3"
                                                                       placeholder="654"/>
                                                                <span className="input-group-text cursor-pointer"
                                                                      id="paymentCvv2"><i className="bx bx-help-circle text-muted"
                                                                                          data-bs-toggle="tooltip"
                                                                                          data-bs-placement="top" title=""
                                                                                          data-bs-original-title="Card Verification Value"
                                                                                          aria-label="Card Verification Value"/></span>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="switch">
                                                                <input type="checkbox" className="switch-input"/>
                                                                <span className="switch-toggle-slider">
                    <span className="switch-on"/>
                    <span className="switch-off"/>
                  </span>
                                                                <span className="switch-label">Save card for future billing?</span>
                                                            </label>
                                                        </div>
                                                        <div className="col-12 mt-3">
                                                            <button type="submit" className="btn btn-primary me-sm-3 me-1">Save
                                                                Changes
                                                            </button>
                                                            <button type="reset" className="btn btn-label-secondary">Cancel</button>
                                                        </div>
                                                        <div/>
                                                        <input type="hidden"/>
                                                    </form>
                                                </div>
                                                <div className="col-md-6 mt-5 mt-md-0">
                                                    <h6>My Cards</h6>
                                                    <div className="added-cards">
                                                        <div className="cardMaster bg-lighter rounded-2 p-3 mb-3">
                                                            <div className="d-flex justify-content-between flex-sm-row flex-column">
                                                                <div className="card-information me-2">
                                                                    <img className="mb-3 img-fluid"
                                                                         src="../../assets/img/icons/payments/mastercard.png"
                                                                         alt="Master Card"/>
                                                                    <div className="d-flex align-items-center mb-1 flex-wrap gap-2">
                                                                        <h6 className="mb-0 me-2">Tom McBride</h6>
                                                                        <span className="badge bg-label-primary">Primary</span>
                                                                    </div>
                                                                    <span className="card-number">∗∗∗∗ ∗∗∗∗ 9856</span>
                                                                </div>
                                                                <div className="d-flex flex-column text-start text-sm-end">
                                                                    <div className="d-flex order-sm-0 order-1 mt-sm-0 mt-3">
                                                                        <button className="btn btn-label-primary me-2"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#editCCModal">Edit
                                                                        </button>
                                                                        <button className="btn btn-label-secondary">Delete</button>
                                                                    </div>
                                                                    <small className="mt-sm-auto mt-2 order-sm-1 order-0">Card expires
                                                                        at 12/26</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="cardMaster bg-lighter rounded-2 p-3">
                                                            <div className="d-flex justify-content-between flex-sm-row flex-column">
                                                                <div className="card-information me-2">
                                                                    <img className="mb-3 img-fluid"
                                                                         src="../../assets/img/icons/payments/visa.png"
                                                                         alt="Visa Card"/>
                                                                    <h6 className="mb-1">Mildred Wagner</h6>
                                                                    <span className="card-number">∗∗∗∗ ∗∗∗∗ 5896</span>
                                                                </div>
                                                                <div className="d-flex flex-column text-start text-sm-end">
                                                                    <div className="d-flex order-sm-0 order-1 mt-sm-0 mt-3">
                                                                        <button className="btn btn-label-primary me-2"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#editCCModal">Edit
                                                                        </button>
                                                                        <button className="btn btn-label-secondary">Delete</button>
                                                                    </div>
                                                                    <small className="mt-sm-auto mt-2 order-sm-1 order-0">Card expires
                                                                        at 10/27</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="modal fade" id="editCCModal" tabIndex="-1" aria-hidden="true">
                                                        <div
                                                            className="modal-dialog modal-dialog-centered modal-simple modal-add-new-cc">
                                                            <div className="modal-content p-3 p-md-5">
                                                                <div className="modal-body">
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                                            aria-label="Close"/>
                                                                    <div className="text-center mb-4">
                                                                        <h3>Edit Card</h3>
                                                                        <p>Edit your saved card details</p>
                                                                    </div>
                                                                    <form id="editCCForm"
                                                                          className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
                                                                          onSubmit="return false" noValidate="novalidate">
                                                                        <div className="col-12 fv-plugins-icon-container">
                                                                            <label className="form-label w-100" htmlFor="modalEditCard">Card
                                                                                Number</label>
                                                                            <div
                                                                                className="input-group input-group-merge has-validation">
                                                                                <input id="modalEditCard" name="modalEditCard"
                                                                                       className="form-control credit-card-mask-edit"
                                                                                       type="text" placeholder="4356 3215 6548 7898"
                                                                                       value="4356 3215 6548 7898"
                                                                                       aria-describedby="modalEditCard2"/>
                                                                                <span
                                                                                    className="input-group-text cursor-pointer p-1"
                                                                                    id="modalEditCard2"><span
                                                                                    className="card-type-edit">
                                                                        <img
                                                                            src="../assets/img/icons/payments/visa-cc.png"
                                                                            height="28"/>
                                                                        </span>
                                                                    </span>
                                                                            </div>
                                                                            <div
                                                                                className="fv-plugins-message-container invalid-feedback"/>
                                                                        </div>
                                                                        <div className="col-12 col-md-6">
                                                                            <label className="form-label"
                                                                                   htmlFor="modalEditName">Name</label>
                                                                            <input type="text" id="modalEditName"
                                                                                   className="form-control" placeholder="John Doe"
                                                                                   value="John Doe"/>
                                                                        </div>
                                                                        <div className="col-6 col-md-3">
                                                                            <label className="form-label" htmlFor="modalEditExpiryDate">Exp.
                                                                                Date</label>
                                                                            <input type="text" id="modalEditExpiryDate"
                                                                                   className="form-control expiry-date-mask-edit"
                                                                                   placeholder="MM/YY" value="08/28"/>
                                                                        </div>
                                                                        <div className="col-6 col-md-3">
                                                                            <label className="form-label" htmlFor="modalEditCvv">CVV
                                                                                Code</label>
                                                                            <div className="input-group input-group-merge">
                                                                                <input type="text" id="modalEditCvv"
                                                                                       className="form-control cvv-code-mask-edit"
                                                                                       maxLength="3" placeholder="654" value="XXX"/>
                                                                                <span className="input-group-text cursor-pointer"
                                                                                      id="modalEditCvv2"><i
                                                                                    className="bx bx-help-circle text-muted"
                                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                                    title=""
                                                                                    data-bs-original-title="Card Verification Value"
                                                                                    aria-label="Card Verification Value"/></span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-12">
                                                                            <label className="switch">
                                                                                <input type="checkbox" className="switch-input"/>
                                                                                <span className="switch-toggle-slider">
                <span className="switch-on"/>
                <span className="switch-off"/>
              </span>
                                                                                <span
                                                                                    className="switch-label">Set as primary card</span>
                                                                            </label>
                                                                        </div>
                                                                        <div className="col-12 text-center">
                                                                            <button type="submit"
                                                                                    className="btn btn-primary me-sm-3 me-1 mt-3">Submit
                                                                            </button>
                                                                            <button type="reset"
                                                                                    className="btn btn-label-secondary mt-3"
                                                                                    data-bs-dismiss="modal" aria-label="Close">Cancel
                                                                            </button>
                                                                        </div>
                                                                        <div/>
                                                                        <input type="hidden"/>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-4">
                                        <h5 className="card-header">Billing Address</h5>
                                        <div className="card-body">
                                            <form id="formAccountSettings" onSubmit="return false"
                                                  className="fv-plugins-bootstrap5 fv-plugins-framework" noValidate="novalidate">
                                                <div className="row">
                                                    <div className="mb-3 col-sm-6 fv-plugins-icon-container">
                                                        <label htmlFor="companyName" className="form-label">Company Name</label>
                                                        <input type="text" id="companyName" name="companyName" className="form-control"
                                                               placeholder="ThemeSelection"/>
                                                        <div className="fv-plugins-message-container invalid-feedback"/>
                                                    </div>
                                                    <div className="mb-3 col-sm-6 fv-plugins-icon-container">
                                                        <label htmlFor="billingEmail" className="form-label">Billing Email</label>
                                                        <input className="form-control" type="text" id="billingEmail"
                                                               name="billingEmail" placeholder="john.doe@example.com"/>
                                                        <div className="fv-plugins-message-container invalid-feedback"/>
                                                    </div>
                                                    <div className="mb-3 col-sm-6">
                                                        <label htmlFor="taxId" className="form-label">Tax ID</label>
                                                        <input type="text" id="taxId" name="taxId" className="form-control"
                                                               placeholder="Enter Tax ID"/>
                                                    </div>
                                                    <div className="mb-3 col-sm-6">
                                                        <label htmlFor="vatNumber" className="form-label">VAT Number</label>
                                                        <input className="form-control" type="text" id="vatNumber" name="vatNumber"
                                                               placeholder="Enter VAT Number"/>
                                                    </div>
                                                    <div className="mb-3 col-sm-6">
                                                        <label htmlFor="mobileNumber" className="form-label">Mobile</label>
                                                        <div className="input-group input-group-merge">
                                                            <span className="input-group-text">US (+1)</span>
                                                            <input className="form-control mobile-number" type="text" id="mobileNumber"
                                                                   name="mobileNumber" placeholder="202 555 0111"/>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 col-sm-6">
                                                        <label htmlFor="country" className="form-label">Country</label>
                                                        <div className="position-relative"><select id="country"
                                                                                                   className="form-select select2 select2-hidden-accessible"
                                                                                                   name="country"
                                                                                                   data-select2-id="country"
                                                                                                   tabIndex="-1" aria-hidden="true">
                                                            <option selected="" data-select2-id="2">USA</option>
                                                            <option>Canada</option>
                                                            <option>UK</option>
                                                            <option>Germany</option>
                                                            <option>France</option>
                                                        </select><span className="select2 select2-container select2-container--default"
                                                                       dir="ltr" data-select2-id="1" style={{width: '462.5px'}}><span
                                                            className="selection"><span
                                                            className="select2-selection select2-selection--single" role="combobox"
                                                            aria-haspopup="true" aria-expanded="false" tabIndex="0"
                                                            aria-disabled="false" aria-labelledby="select2-country-container"><span
                                                            className="select2-selection__rendered" id="select2-country-container"
                                                            role="textbox" aria-readonly="true" title="USA">USA</span><span
                                                            className="select2-selection__arrow" role="presentation"><b
                                                            role="presentation"/></span></span></span><span
                                                            className="dropdown-wrapper" aria-hidden="true"/></span></div>
                                                    </div>
                                                    <div className="mb-3 col-12">
                                                        <label htmlFor="billingAddress" className="form-label">Billing Address</label>
                                                        <input type="text" className="form-control" id="billingAddress"
                                                               name="billingAddress" placeholder="Billing Address"/>
                                                    </div>
                                                    <div className="mb-3 col-sm-6">
                                                        <label htmlFor="state" className="form-label">State</label>
                                                        <input className="form-control" type="text" id="state" name="state"
                                                               placeholder="California"/>
                                                    </div>
                                                    <div className="mb-3 col-sm-6">
                                                        <label htmlFor="zipCode" className="form-label">Zip Code</label>
                                                        <input type="text" className="form-control zip-code" id="zipCode" name="zipCode"
                                                               placeholder="231465" maxLength="6"/>
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <button type="submit" className="btn btn-primary me-2">Save changes</button>
                                                    <button type="reset" className="btn btn-label-secondary">Discard</button>
                                                </div>
                                                <div/>
                                                <input type="hidden"/></form>
                                        </div>

                                    </div>
                                    <div className="card">

                                        <h5 className="card-header border-bottom">Billing History</h5>
                                        <div className="card-datatable table-responsive">
                                            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                                <div className="row ms-2 me-3">
                                                    <div
                                                        className="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                                                        <div className="dataTables_length" id="DataTables_Table_0_length"><label><select
                                                            name="DataTables_Table_0_length" aria-controls="DataTables_Table_0"
                                                            className="form-select">
                                                            <option value="10">10</option>
                                                            <option value="25">25</option>
                                                            <option value="50">50</option>
                                                            <option value="100">100</option>
                                                        </select></label></div>
                                                        <div
                                                            className="dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3">
                                                            <div className="dt-buttons">
                                                                <button className="dt-button btn btn-primary" tabIndex="0"
                                                                        aria-controls="DataTables_Table_0" type="button"><span><i
                                                                    className="bx bx-plus me-md-2"/><span
                                                                    className="d-md-inline-block d-none">Create Invoice</span></span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-12 col-md-6 d-flex align-items-center justify-content-end flex-column flex-md-row pe-3 gap-md-2">
                                                        <div id="DataTables_Table_0_filter" className="dataTables_filter"><label><input
                                                            type="search" className="form-control" placeholder="Search Invoice"
                                                            aria-controls="DataTables_Table_0"/></label></div>
                                                        <div className="invoice_status mb-3 mb-md-0"><select id="UserRole"
                                                                                                             className="form-select">
                                                            <option value=""> Select Status</option>
                                                            <option value="Downloaded" className="text-capitalize">Downloaded</option>
                                                            <option value="Draft" className="text-capitalize">Draft</option>
                                                            <option value="Paid" className="text-capitalize">Paid</option>
                                                            <option value="Partial Payment" className="text-capitalize">Partial
                                                                Payment
                                                            </option>
                                                            <option value="Past Due" className="text-capitalize">Past Due</option>
                                                            <option value="Sent" className="text-capitalize">Sent</option>
                                                        </select></div>
                                                    </div>
                                                </div>
                                                <table className="invoice-list-table table border-top dataTable no-footer dtr-column"
                                                       id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info"
                                                       style={{width: '1002px'}}>
                                                    <thead>
                                                    <tr role="row">
                                                        <th className="control sorting" tabIndex="0" aria-controls="DataTables_Table_0"
                                                            rowSpan="1" colSpan="1" style={{width:' 0px', display: 'none'}}
                                                            aria-label=": activate to sort column ascending"/>
                                                        <th className="sorting sorting_desc" tabIndex="0"
                                                            aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1"
                                                            style={{width: '54px'}} aria-label="#ID: activate to sort column ascending"
                                                            aria-sort="descending">#ID
                                                        </th>
                                                        <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_0"
                                                            rowSpan="1" colSpan="1" style={{width: '34px'}}
                                                            aria-label=": activate to sort column ascending"><i
                                                            className="bx bx-trending-up"/></th>
                                                        <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_0"
                                                            rowSpan="1" colSpan="1" style={{width: '245px'}}
                                                            aria-label="Client: activate to sort column ascending">Client
                                                        </th>
                                                        <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_0"
                                                            rowSpan="1" colSpan="1" style={{width: '62px'}}
                                                            aria-label="Total: activate to sort column ascending">Total
                                                        </th>
                                                        <th className="text-truncate sorting" tabIndex="0"
                                                            aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1"
                                                            style={{width: '117px'}}
                                                            aria-label="Issued Date: activate to sort column ascending">Issued Date
                                                        </th>
                                                        <th className="sorting_disabled" rowSpan="1" colSpan="1" style={{width:'86px'}}
                                                            aria-label="Balance">Balance
                                                        </th>
                                                        <th className="cell-fit sorting_disabled" rowSpan="1" colSpan="1"
                                                            style={{width: '78px'}} aria-label="Actions">Actions
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr className="odd">
                                                        <td className=" control" tabIndex="0" style={{display: 'none'}}/>
                                                        <td className="sorting_1"><a href="app-invoice-preview.html">#5089</a></td>
                                                        <td><span data-bs-toggle="tooltip" data-bs-html="true" title=""
                                                                  data-bs-original-title="<span>Sent<br> Balance: 0<br> Due Date: 05/09/2020</span>"
                                                                  aria-label="<span>Sent<br> Balance: 0<br> Due Date: 05/09/2020</span>"><span
                                                            className="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30"><i
                                                            className="bx bx-paper-plane bx-xs"/></span></span></td>
                                                        <td>
                                                            <div className="d-flex justify-content-start align-items-center">
                                                                <div className="avatar-wrapper">
                                                                    <div className="avatar avatar-sm me-2"><span
                                                                        className="avatar-initial rounded-circle bg-label-success">JK</span>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-column"><a href="pages-profile-user.html"
                                                                                                       className="text-body text-truncate fw-semibold">Jamal
                                                                    Kerrod</a><small className="text-truncate text-muted">Software
                                                                    Development</small></div>
                                                            </div>
                                                        </td>
                                                        <td><span className="d-none">3077</span>$3077</td>
                                                        <td><span className="d-none">20200509</span>09 May 2020</td>
                                                        <td><span className="badge bg-label-success"> Paid </span></td>
                                                        <td>
                                                            <div className="d-flex align-items-center"><a href="!#"
                                                                                                          data-bs-toggle="tooltip"
                                                                                                          className="text-body"
                                                                                                          data-bs-placement="top"
                                                                                                          title=""
                                                                                                          data-bs-original-title="Send Mail"
                                                                                                          aria-label="Send Mail"><i
                                                                className="bx bx-send mx-1"/></a><a href="app-invoice-preview.html"
                                                                                                    data-bs-toggle="tooltip"
                                                                                                    className="text-body"
                                                                                                    data-bs-placement="top" title=""
                                                                                                    data-bs-original-title="Preview Invoice"
                                                                                                    aria-label="Preview Invoice"><i
                                                                className="bx bx-show mx-1"/></a>
                                                                <div className="dropdown"><a href="!#"
                                                                                             className="btn dropdown-toggle hide-arrow text-body p-0"
                                                                                             data-bs-toggle="dropdown"><i
                                                                    className="bx bx-dots-vertical-rounded"/></a>
                                                                    <div className="dropdown-menu dropdown-menu-end"><a
                                                                        href="!#" className="dropdown-item">Download</a><a
                                                                        href="app-invoice-edit.html"
                                                                        className="dropdown-item">Edit</a><a href="!#"
                                                                                                             className="dropdown-item">Duplicate</a>
                                                                        <div className="dropdown-divider"/>
                                                                        <a href="!#"
                                                                           className="dropdown-item delete-record text-danger">Delete</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="even">
                                                        <td className=" control" tabIndex="0" style={{display: 'none'}}/>
                                                        <td className="sorting_1"><a href="app-invoice-preview.html">#5041</a></td>
                                                        <td><span data-bs-toggle="tooltip" data-bs-html="true" title=""
                                                                  data-bs-original-title="<span>Sent<br> Balance: 0<br> Due Date: 11/19/2020</span>"
                                                                  aria-label="<span>Sent<br> Balance: 0<br> Due Date: 11/19/2020</span>"><span
                                                            className="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30"><i
                                                            className="bx bx-paper-plane bx-xs"/></span></span></td>
                                                        <td>
                                                            <div className="d-flex justify-content-start align-items-center">
                                                                <div className="avatar-wrapper">
                                                                    <div className="avatar avatar-sm me-2"><img
                                                                        src="../assets//img/avatars/5.png" alt="Avatar"
                                                                        className="rounded-circle"/></div>
                                                                </div>
                                                                <div className="d-flex flex-column"><a href="pages-profile-user.html"
                                                                                                       className="text-body text-truncate fw-semibold">Shamus
                                                                    Tuttle</a><small className="text-truncate text-muted">Software
                                                                    Development</small></div>
                                                            </div>
                                                        </td>
                                                        <td><span className="d-none">2230</span>$2230</td>
                                                        <td><span className="d-none">20201119</span>19 Nov 2020</td>
                                                        <td><span className="badge bg-label-success"> Paid </span></td>
                                                        <td>
                                                            <div className="d-flex align-items-center"><a href="!#"
                                                                                                          data-bs-toggle="tooltip"
                                                                                                          className="text-body"
                                                                                                          data-bs-placement="top"
                                                                                                          title=""
                                                                                                          data-bs-original-title="Send Mail"
                                                                                                          aria-label="Send Mail"><i
                                                                className="bx bx-send mx-1"/></a><a href="#"
                                                                                                    data-bs-toggle="tooltip"
                                                                                                    className="text-body"
                                                                                                    data-bs-placement="top" title=""
                                                                                                    data-bs-original-title="Preview Invoice"
                                                                                                    aria-label="Preview Invoice"><i
                                                                className="bx bx-show mx-1"/></a>
                                                                <div className="dropdown"><a href="!#"
                                                                                             className="btn dropdown-toggle hide-arrow text-body p-0"
                                                                                             data-bs-toggle="dropdown"><i
                                                                    className="bx bx-dots-vertical-rounded"/></a>
                                                                    <div className="dropdown-menu dropdown-menu-end"><a
                                                                        href="!#" className="dropdown-item">Download</a><a
                                                                        href="app-invoice-edit.html"
                                                                        className="dropdown-item">Edit</a><a href="!#"
                                                                                                             className="dropdown-item">Duplicate</a>
                                                                        <div className="dropdown-divider"/>
                                                                        <a href="!#"
                                                                           className="dropdown-item delete-record text-danger">Delete</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="odd">
                                                        <td className=" control" tabIndex="0" style={{display: 'none'}}/>
                                                        <td className="sorting_1"><a href="app-invoice-preview.html">#5027</a></td>
                                                        <td><span data-bs-toggle="tooltip" data-bs-html="true" title=""
                                                                  data-bs-original-title="<span>Partial Payment<br> Balance: 0<br> Due Date: 09/25/2020</span>"
                                                                  aria-label="<span>Partial Payment<br> Balance: 0<br> Due Date: 09/25/2020</span>"><span
                                                            className="badge badge-center rounded-pill bg-label-success w-px-30 h-px-30"><i
                                                            className="bx bx-adjust bx-xs"/></span></span></td>
                                                        <td>
                                                            <div className="d-flex justify-content-start align-items-center">
                                                                <div className="avatar-wrapper">
                                                                    <div className="avatar avatar-sm me-2"><img
                                                                        src="../../assets//img/avatars/2.png" alt="Avatar"
                                                                        className="rounded-circle"/></div>
                                                                </div>
                                                                <div className="d-flex flex-column"><a href="pages-profile-user.html"
                                                                                                       className="text-body text-truncate fw-semibold">Devonne
                                                                    Wallbridge</a><small className="text-truncate text-muted">Software
                                                                    Development</small></div>
                                                            </div>
                                                        </td>
                                                        <td><span className="d-none">2787</span>$2787</td>
                                                        <td><span className="d-none">20200925</span>25 Sep 2020</td>
                                                        <td><span className="badge bg-label-success"> Paid </span></td>
                                                        <td>
                                                            <div className="d-flex align-items-center"><a href="!#"
                                                                                                          data-bs-toggle="tooltip"
                                                                                                          className="text-body"
                                                                                                          data-bs-placement="top"
                                                                                                          title=""
                                                                                                          data-bs-original-title="Send Mail"
                                                                                                          aria-label="Send Mail"><i
                                                                className="bx bx-send mx-1"/></a><a href="app-invoice-preview.html"
                                                                                                    data-bs-toggle="tooltip"
                                                                                                    className="text-body"
                                                                                                    data-bs-placement="top" title=""
                                                                                                    data-bs-original-title="Preview Invoice"
                                                                                                    aria-label="Preview Invoice"><i
                                                                className="bx bx-show mx-1"/></a>
                                                                <div className="dropdown"><a href="!#"
                                                                                             className="btn dropdown-toggle hide-arrow text-body p-0"
                                                                                             data-bs-toggle="dropdown"><i
                                                                    className="bx bx-dots-vertical-rounded"/></a>
                                                                    <div className="dropdown-menu dropdown-menu-end"><a
                                                                        href="!#" className="dropdown-item">Download</a><a
                                                                        href="app-invoice-edit.html"
                                                                        className="dropdown-item">Edit</a><a href="!#"
                                                                                                             className="dropdown-item">Duplicate</a>
                                                                        <div className="dropdown-divider"/>
                                                                        <a href="!#"
                                                                           className="dropdown-item delete-record text-danger">Delete</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="even">
                                                        <td className=" control" tabIndex="0" style={{display: 'none'}}/>
                                                        <td className="sorting_1"><a href="app-invoice-preview.html">#5024</a></td>
                                                        <td><span data-bs-toggle="tooltip" data-bs-html="true" title=""
                                                                  data-bs-original-title="<span>Partial Payment<br> Balance: -$202<br> Due Date: 08/02/2020</span>"
                                                                  aria-label="<span>Partial Payment<br> Balance: -$202<br> Due Date: 08/02/2020</span>"><span
                                                            className="badge badge-center rounded-pill bg-label-success w-px-30 h-px-30"><i
                                                            className="bx bx-adjust bx-xs"/></span></span></td>
                                                        <td>
                                                            <div className="d-flex justify-content-start align-items-center">
                                                                <div className="avatar-wrapper">
                                                                    <div className="avatar avatar-sm me-2"><img
                                                                        src="../../assets//img/avatars/6.png" alt="Avatar"
                                                                        className="rounded-circle"/></div>
                                                                </div>
                                                                <div className="d-flex flex-column"><a href="pages-profile-user.html"
                                                                                                       className="text-body text-truncate fw-semibold">Ariella
                                                                    Filippyev</a><small className="text-truncate text-muted">Unlimited
                                                                    Extended License</small></div>
                                                            </div>
                                                        </td>
                                                        <td><span className="d-none">5285</span>$5285</td>
                                                        <td><span className="d-none">20200802</span>02 Aug 2020</td>
                                                        <td><span className="d-none">-$202</span>-$202</td>
                                                        <td>
                                                            <div className="d-flex align-items-center"><a href="!#"
                                                                                                          data-bs-toggle="tooltip"
                                                                                                          className="text-body"
                                                                                                          data-bs-placement="top"
                                                                                                          title=""
                                                                                                          data-bs-original-title="Send Mail"
                                                                                                          aria-label="Send Mail"><i
                                                                className="bx bx-send mx-1"/></a><a href="app-invoice-preview.html"
                                                                                                    data-bs-toggle="tooltip"
                                                                                                    className="text-body"
                                                                                                    data-bs-placement="top" title=""
                                                                                                    data-bs-original-title="Preview Invoice"
                                                                                                    aria-label="Preview Invoice"><i
                                                                className="bx bx-show mx-1"/></a>
                                                                <div className="dropdown"><a href="!#"
                                                                                             className="btn dropdown-toggle hide-arrow text-body p-0"
                                                                                             data-bs-toggle="dropdown"><i
                                                                    className="bx bx-dots-vertical-rounded"/></a>
                                                                    <div className="dropdown-menu dropdown-menu-end"><a
                                                                        href="!#" className="dropdown-item">Download</a><a
                                                                        href="app-invoice-edit.html"
                                                                        className="dropdown-item">Edit</a><a href="!#"
                                                                                                             className="dropdown-item">Duplicate</a>
                                                                        <div className="dropdown-divider"/>
                                                                        <a href="!#"
                                                                           className="dropdown-item delete-record text-danger">Delete</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="odd">
                                                        <td className=" control" tabIndex="0" style={{display: 'none'}}/>
                                                        <td className="sorting_1"><a href="app-invoice-preview.html">#5020</a></td>
                                                        <td><span data-bs-toggle="tooltip" data-bs-html="true" title=""
                                                                  data-bs-original-title="<span>Downloaded<br> Balance: 0<br> Due Date: 12/15/2020</span>"
                                                                  aria-label="<span>Downloaded<br> Balance: 0<br> Due Date: 12/15/2020</span>"><span
                                                            className="badge badge-center rounded-pill bg-label-info w-px-30 h-px-30"><i
                                                            className="bx bx-down-arrow-circle bx-xs"/></span></span></td>
                                                        <td>
                                                            <div className="d-flex justify-content-start align-items-center">
                                                                <div className="avatar-wrapper">
                                                                    <div className="avatar avatar-sm me-2"><img
                                                                        src="../../assets//img/avatars/2.png" alt="Avatar"
                                                                        className="rounded-circle"/></div>
                                                                </div>
                                                                <div className="d-flex flex-column"><a href="pages-profile-user.html"
                                                                                                       className="text-body text-truncate fw-semibold">Roy
                                                                    Southerell</a><small className="text-truncate text-muted">UI/UX
                                                                    Design &amp; Development</small></div>
                                                            </div>
                                                        </td>
                                                        <td><span className="d-none">5219</span>$5219</td>
                                                        <td><span className="d-none">20201215</span>15 Dec 2020</td>
                                                        <td><span className="badge bg-label-success"> Paid </span></td>
                                                        <td>
                                                            <div className="d-flex align-items-center"><a href="!#"
                                                                                                          data-bs-toggle="tooltip"
                                                                                                          className="text-body"
                                                                                                          data-bs-placement="top"
                                                                                                          title=""
                                                                                                          data-bs-original-title="Send Mail"
                                                                                                          aria-label="Send Mail"><i
                                                                className="bx bx-send mx-1"/></a><a href="app-invoice-preview.html"
                                                                                                    data-bs-toggle="tooltip"
                                                                                                    className="text-body"
                                                                                                    data-bs-placement="top" title=""
                                                                                                    data-bs-original-title="Preview Invoice"
                                                                                                    aria-label="Preview Invoice"><i
                                                                className="bx bx-show mx-1"/></a>
                                                                <div className="dropdown"><a href="!#"
                                                                                             className="btn dropdown-toggle hide-arrow text-body p-0"
                                                                                             data-bs-toggle="dropdown"><i
                                                                    className="bx bx-dots-vertical-rounded"/></a>
                                                                    <div className="dropdown-menu dropdown-menu-end"><a
                                                                        href="!#" className="dropdown-item">Download</a><a
                                                                        href="app-invoice-edit.html"
                                                                        className="dropdown-item">Edit</a><a href="!#"
                                                                                                             className="dropdown-item">Duplicate</a>
                                                                        <div className="dropdown-divider"/>
                                                                        <a href="!#"
                                                                           className="dropdown-item delete-record text-danger">Delete</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="even">
                                                        <td className=" control" tabIndex="0" style={{display: 'none'}}/>
                                                        <td className="sorting_1"><a href="app-invoice-preview.html">#4995</a></td>
                                                        <td><span data-bs-toggle="tooltip" data-bs-html="true" title=""
                                                                  data-bs-original-title="<span>Partial Payment<br> Balance: 0<br> Due Date: 06/09/2020</span>"
                                                                  aria-label="<span>Partial Payment<br> Balance: 0<br> Due Date: 06/09/2020</span>"><span
                                                            className="badge badge-center rounded-pill bg-label-success w-px-30 h-px-30"><i
                                                            className="bx bx-adjust bx-xs"/></span></span></td>
                                                        <td>
                                                            <div className="d-flex justify-content-start align-items-center">
                                                                <div className="avatar-wrapper">
                                                                    <div className="avatar avatar-sm me-2"><img
                                                                        src="../assets//img/avatars/1.png" alt="Avatar"
                                                                        className="rounded-circle"/></div>
                                                                </div>
                                                                <div className="d-flex flex-column"><a href="pages-profile-user.html"
                                                                                                       className="text-body text-truncate fw-semibold">Raynell
                                                                    Clendennen</a><small className="text-truncate text-muted">Template
                                                                    Customization</small></div>
                                                            </div>
                                                        </td>
                                                        <td><span className="d-none">3313</span>$3313</td>
                                                        <td><span className="d-none">20200609</span>09 Jun 2020</td>
                                                        <td><span className="badge bg-label-success"> Paid </span></td>
                                                        <td>
                                                            <div className="d-flex align-items-center"><a href="!#"
                                                                                                          data-bs-toggle="tooltip"
                                                                                                          className="text-body"
                                                                                                          data-bs-placement="top"
                                                                                                          title=""
                                                                                                          data-bs-original-title="Send Mail"
                                                                                                          aria-label="Send Mail"><i
                                                                className="bx bx-send mx-1"/></a><a href="app-invoice-preview.html"
                                                                                                    data-bs-toggle="tooltip"
                                                                                                    className="text-body"
                                                                                                    data-bs-placement="top" title=""
                                                                                                    data-bs-original-title="Preview Invoice"
                                                                                                    aria-label="Preview Invoice"><i
                                                                className="bx bx-show mx-1"/></a>
                                                                <div className="dropdown"><a href="!#"
                                                                                             className="btn dropdown-toggle hide-arrow text-body p-0"
                                                                                             data-bs-toggle="dropdown"><i
                                                                    className="bx bx-dots-vertical-rounded"/></a>
                                                                    <div className="dropdown-menu dropdown-menu-end"><a
                                                                        href="!#" className="dropdown-item">Download</a><a
                                                                        href="app-invoice-edit.html"
                                                                        className="dropdown-item">Edit</a><a href="!#"
                                                                                                             className="dropdown-item">Duplicate</a>
                                                                        <div className="dropdown-divider"/>
                                                                        <a href="!#"
                                                                           className="dropdown-item delete-record text-danger">Delete</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="odd">
                                                        <td className=" control" tabIndex="0" style={{display: 'none'}}/>
                                                        <td className="sorting_1"><a href="app-invoice-preview.html">#4993</a></td>
                                                        <td><span data-bs-toggle="tooltip" data-bs-html="true" title=""
                                                                  data-bs-original-title="<span>Partial Payment<br> Balance: 0<br> Due Date: 10/22/2020</span>"
                                                                  aria-label="<span>Partial Payment<br> Balance: 0<br> Due Date: 10/22/2020</span>"><span
                                                            className="badge badge-center rounded-pill bg-label-success w-px-30 h-px-30"><i
                                                            className="bx bx-adjust bx-xs"/></span></span></td>
                                                        <td>
                                                            <div className="d-flex justify-content-start align-items-center">
                                                                <div className="avatar-wrapper">
                                                                    <div className="avatar avatar-sm me-2"><span
                                                                        className="avatar-initial rounded-circle bg-label-warning">LA</span>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-column"><a href="pages-profile-user.html"
                                                                                                       className="text-body text-truncate fw-semibold">Lutero
                                                                    Aloshechkin</a><small className="text-truncate text-muted">Unlimited
                                                                    Extended License</small></div>
                                                            </div>
                                                        </td>
                                                        <td><span className="d-none">4836</span>$4836</td>
                                                        <td><span className="d-none">20201022</span>22 Oct 2020</td>
                                                        <td><span className="badge bg-label-success"> Paid </span></td>
                                                        <td>
                                                            <div className="d-flex align-items-center"><a href="!#"
                                                                                                          data-bs-toggle="tooltip"
                                                                                                          className="text-body"
                                                                                                          data-bs-placement="top"
                                                                                                          title=""
                                                                                                          data-bs-original-title="Send Mail"
                                                                                                          aria-label="Send Mail"><i
                                                                className="bx bx-send mx-1"/></a><a href="app-invoice-preview.html"
                                                                                                    data-bs-toggle="tooltip"
                                                                                                    className="text-body"
                                                                                                    data-bs-placement="top" title=""
                                                                                                    data-bs-original-title="Preview Invoice"
                                                                                                    aria-label="Preview Invoice"><i
                                                                className="bx bx-show mx-1"/></a>
                                                                <div className="dropdown"><a href="!#"
                                                                                             className="btn dropdown-toggle hide-arrow text-body p-0"
                                                                                             data-bs-toggle="dropdown"><i
                                                                    className="bx bx-dots-vertical-rounded"/></a>
                                                                    <div className="dropdown-menu dropdown-menu-end"><a
                                                                        href="!#" className="dropdown-item">Download</a><a
                                                                        href="app-invoice-edit.html"
                                                                        className="dropdown-item">Edit</a><a href="!#"
                                                                                                             className="dropdown-item">Duplicate</a>
                                                                        <div className="dropdown-divider"/>
                                                                        <a href="!#"
                                                                           className="dropdown-item delete-record text-danger">Delete</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="even">
                                                        <td className=" control" tabIndex="0" style={{display: 'none'}}/>
                                                        <td className="sorting_1"><a href="app-invoice-preview.html">#4989</a></td>
                                                        <td><span data-bs-toggle="tooltip" data-bs-html="true" title=""
                                                                  data-bs-original-title="<span>Past Due<br> Balance: 0<br> Due Date: 08/01/2020</span>"
                                                                  aria-label="<span>Past Due<br> Balance: 0<br> Due Date: 08/01/2020</span>"><span
                                                            className="badge badge-center rounded-pill bg-label-danger w-px-30 h-px-30"><i
                                                            className="bx bx-info-circle bx-xs"/></span></span></td>
                                                        <td>
                                                            <div className="d-flex justify-content-start align-items-center">
                                                                <div className="avatar-wrapper">
                                                                    <div className="avatar avatar-sm me-2"><span
                                                                        className="avatar-initial rounded-circle bg-label-dark">OG</span>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-column"><a href="pages-profile-user.html"
                                                                                                       className="text-body text-truncate fw-semibold">Orson
                                                                    Grafton</a><small className="text-truncate text-muted">Unlimited
                                                                    Extended License</small></div>
                                                            </div>
                                                        </td>
                                                        <td><span className="d-none">5293</span>$5293</td>
                                                        <td><span className="d-none">20200801</span>01 Aug 2020</td>
                                                        <td><span className="badge bg-label-success"> Paid </span></td>
                                                        <td>
                                                            <div className="d-flex align-items-center"><a href="!#"
                                                                                                          data-bs-toggle="tooltip"
                                                                                                          className="text-body"
                                                                                                          data-bs-placement="top"
                                                                                                          title=""
                                                                                                          data-bs-original-title="Send Mail"
                                                                                                          aria-label="Send Mail"><i
                                                                className="bx bx-send mx-1"/></a><a href="app-invoice-preview.html"
                                                                                                    data-bs-toggle="tooltip"
                                                                                                    className="text-body"
                                                                                                    data-bs-placement="top" title=""
                                                                                                    data-bs-original-title="Preview Invoice"
                                                                                                    aria-label="Preview Invoice"><i
                                                                className="bx bx-show mx-1"/></a>
                                                                <div className="dropdown"><a href="!#"
                                                                                             className="btn dropdown-toggle hide-arrow text-body p-0"
                                                                                             data-bs-toggle="dropdown"><i
                                                                    className="bx bx-dots-vertical-rounded"/></a>
                                                                    <div className="dropdown-menu dropdown-menu-end"><a
                                                                        href="!#" className="dropdown-item">Download</a><a
                                                                        href="app-invoice-edit.html"
                                                                        className="dropdown-item">Edit</a><a href="!#"
                                                                                                             className="dropdown-item">Duplicate</a>
                                                                        <div className="dropdown-divider"/>
                                                                        <a href="!#"
                                                                           className="dropdown-item delete-record text-danger">Delete</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="odd">
                                                        <td className=" control" tabIndex="0" style={{display: 'none'}}/>
                                                        <td className="sorting_1"><a href="app-invoice-preview.html">#4989</a></td>
                                                        <td><span data-bs-toggle="tooltip" data-bs-html="true" title=""
                                                                  data-bs-original-title="<span>Downloaded<br> Balance: 0<br> Due Date: 09/23/2020</span>"
                                                                  aria-label="<span>Downloaded<br> Balance: 0<br> Due Date: 09/23/2020</span>"><span
                                                            className="badge badge-center rounded-pill bg-label-info w-px-30 h-px-30"><i
                                                            className="bx bx-down-arrow-circle bx-xs"/></span></span></td>
                                                        <td>
                                                            <div className="d-flex justify-content-start align-items-center">
                                                                <div className="avatar-wrapper">
                                                                    <div className="avatar avatar-sm me-2"><span
                                                                        className="avatar-initial rounded-circle bg-label-info">LH</span>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-column"><a href="pages-profile-user.html"
                                                                                                       className="text-body text-truncate fw-semibold">Lorine
                                                                    Hischke</a><small className="text-truncate text-muted">Unlimited
                                                                    Extended License</small></div>
                                                            </div>
                                                        </td>
                                                        <td><span className="d-none">3623</span>$3623</td>
                                                        <td><span className="d-none">20200923</span>23 Sep 2020</td>
                                                        <td><span className="badge bg-label-success"> Paid </span></td>
                                                        <td>
                                                            <div className="d-flex align-items-center"><a href="!#"
                                                                                                          data-bs-toggle="tooltip"
                                                                                                          className="text-body"
                                                                                                          data-bs-placement="top"
                                                                                                          title=""
                                                                                                          data-bs-original-title="Send Mail"
                                                                                                          aria-label="Send Mail"><i
                                                                className="bx bx-send mx-1"/></a><a href="app-invoice-preview.html"
                                                                                                    data-bs-toggle="tooltip"
                                                                                                    className="text-body"
                                                                                                    data-bs-placement="top" title=""
                                                                                                    data-bs-original-title="Preview Invoice"
                                                                                                    aria-label="Preview Invoice"><i
                                                                className="bx bx-show mx-1"/></a>
                                                                <div className="dropdown"><a href="!#"
                                                                                             className="btn dropdown-toggle hide-arrow text-body p-0"
                                                                                             data-bs-toggle="dropdown"><i
                                                                    className="bx bx-dots-vertical-rounded"/></a>
                                                                    <div className="dropdown-menu dropdown-menu-end"><a
                                                                        href="!#" className="dropdown-item">Download</a><a
                                                                        href="app-invoice-edit.html"
                                                                        className="dropdown-item">Edit</a><a href="!#"
                                                                                                             className="dropdown-item">Duplicate</a>
                                                                        <div className="dropdown-divider"/>
                                                                        <a href="!#"
                                                                           className="dropdown-item delete-record text-danger">Delete</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="even">
                                                        <td className=" control" tabIndex="0" style={{display: 'none'}}/>
                                                        <td className="sorting_1"><a href="app-invoice-preview.html">#4965</a></td>
                                                        <td><span data-bs-toggle="tooltip" data-bs-html="true" title=""
                                                                  data-bs-original-title="<span>Partial Payment<br> Balance: $666<br> Due Date: 03/18/2021</span>"
                                                                  aria-label="<span>Partial Payment<br> Balance: $666<br> Due Date: 03/18/2021</span>"><span
                                                            className="badge badge-center rounded-pill bg-label-success w-px-30 h-px-30"><i
                                                            className="bx bx-adjust bx-xs"/></span></span></td>
                                                        <td>
                                                            <div className="d-flex justify-content-start align-items-center">
                                                                <div className="avatar-wrapper">
                                                                    <div className="avatar avatar-sm me-2"><img
                                                                        src="../assets//img/avatars/5.png" alt="Avatar"
                                                                        className="rounded-circle"/></div>
                                                                </div>
                                                                <div className="d-flex flex-column"><a href="pages-profile-user.html"
                                                                                                       className="text-body text-truncate fw-semibold">Yelena
                                                                    O'Hear</a><small className="text-truncate text-muted">Unlimited
                                                                    Extended License</small></div>
                                                            </div>
                                                        </td>
                                                        <td><span className="d-none">3789</span>$3789</td>
                                                        <td><span className="d-none">20210318</span>18 Mar 2021</td>
                                                        <td><span className="d-none">$666</span>$666</td>
                                                        <td>
                                                            <div className="d-flex align-items-center"><a href="!#"
                                                                                                          data-bs-toggle="tooltip"
                                                                                                          className="text-body"
                                                                                                          data-bs-placement="top"
                                                                                                          title=""
                                                                                                          data-bs-original-title="Send Mail"
                                                                                                          aria-label="Send Mail"><i
                                                                className="bx bx-send mx-1"/></a><a href="#"
                                                                                                    data-bs-toggle="tooltip"
                                                                                                    className="text-body"
                                                                                                    data-bs-placement="top" title=""
                                                                                                    data-bs-original-title="Preview Invoice"
                                                                                                    aria-label="Preview Invoice"><i
                                                                className="bx bx-show mx-1"/></a>
                                                                <div className="dropdown"><a href="!#"
                                                                                             className="btn dropdown-toggle hide-arrow text-body p-0"
                                                                                             data-bs-toggle="dropdown"><i
                                                                    className="bx bx-dots-vertical-rounded"/></a>
                                                                    <div className="dropdown-menu dropdown-menu-end"><a
                                                                        href="!#" className="dropdown-item">Download</a><a
                                                                        href="app-invoice-edit.html"
                                                                        className="dropdown-item">Edit</a><a href="!#"
                                                                                                             className="dropdown-item">Duplicate</a>
                                                                        <div className="dropdown-divider"/>
                                                                        <a href="!#"
                                                                           className="dropdown-item delete-record text-danger">Delete</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <div className="row mx-2">
                                                    <div className="col-sm-12 col-md-6">
                                                        <div className="dataTables_info" id="DataTables_Table_0_info" role="status"
                                                             aria-live="polite">Showing 1 to 10 of 50 entries
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-6">
                                                        <div className="dataTables_paginate paging_simple_numbers"
                                                             id="DataTables_Table_0_paginate">
                                                            <ul className="pagination">
                                                                <li className="paginate_button page-item previous disabled"
                                                                    id="DataTables_Table_0_previous"><a href="#"
                                                                                                        aria-controls="DataTables_Table_0"
                                                                                                        data-dt-idx="0" tabIndex="0"
                                                                                                        className="page-link">Previous</a>
                                                                </li>
                                                                <li className="paginate_button page-item active"><a href="#"
                                                                                                                    aria-controls="DataTables_Table_0"
                                                                                                                    data-dt-idx="1"
                                                                                                                    tabIndex="0"
                                                                                                                    className="page-link">1</a>
                                                                </li>
                                                                <li className="paginate_button page-item "><a href="#"
                                                                                                              aria-controls="DataTables_Table_0"
                                                                                                              data-dt-idx="2"
                                                                                                              tabIndex="0"
                                                                                                              className="page-link">2</a>
                                                                </li>
                                                                <li className="paginate_button page-item "><a href="#"
                                                                                                              aria-controls="DataTables_Table_0"
                                                                                                              data-dt-idx="3"
                                                                                                              tabIndex="0"
                                                                                                              className="page-link">3</a>
                                                                </li>
                                                                <li className="paginate_button page-item "><a href="#"
                                                                                                              aria-controls="DataTables_Table_0"
                                                                                                              data-dt-idx="4"
                                                                                                              tabIndex="0"
                                                                                                              className="page-link">4</a>
                                                                </li>
                                                                <li className="paginate_button page-item "><a href="#"
                                                                                                              aria-controls="DataTables_Table_0"
                                                                                                              data-dt-idx="5"
                                                                                                              tabIndex="0"
                                                                                                              className="page-link">5</a>
                                                                </li>
                                                                <li className="paginate_button page-item next"
                                                                    id="DataTables_Table_0_next"><a href="#"
                                                                                                    aria-controls="DataTables_Table_0"
                                                                                                    data-dt-idx="6" tabIndex="0"
                                                                                                    className="page-link">Next</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className="modal fade" id="pricingModal" tabIndex="-1" aria-hidden="true">
                                <div className="modal-dialog modal-xl modal-simple modal-pricing">
                                    <div className="modal-content p-3 p-md-5">
                                        <div className="modal-body">
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"/>

                                            <div className="pricing-plans">
                                                <div className="text-center mb-3">
                                                    <h3>Find the right plan for your site</h3>
                                                    <p> Get started with us - it's perfect for individuals and teams. Choose a
                                                        subscription plan that meets your needs. </p>
                                                </div>
                                                <div
                                                    className="d-flex align-items-center justify-content-center flex-wrap gap-2 my-5 pt-sm-5">
                                                    <label className="switch switch-primary ps-sm-5 mt-3 me-0">
                                                        <span className="switch-label ps-0 ms-sm-5">Monthly</span>
                                                        <input type="checkbox" className="switch-input price-duration-toggler"
                                                               checked=""/>
                                                        <span className="switch-toggle-slider">
                <span className="switch-on"/>
                <span className="switch-off"/>
              </span>
                                                        <span className="switch-label">Annual</span>
                                                    </label>
                                                    <div className="pricing-offer mt-n5 ms-n5 d-none d-sm-block">
                                                        <img src="../assets/img/pages/pricing-arrow-light.png" alt="arrow img"
                                                             className="position-absolute scaleX-n1-rtl"
                                                             data-app-dark-img="pages/pricing-arrow-dark.png"
                                                             data-app-light-img="pages/pricing-arrow-light.png"/>
                                                        <span
                                                            className="badge badge-sm bg-label-primary ms-4 mt-2">Save upto 10%</span>
                                                    </div>
                                                </div>
                                                <div className="row mx-0 gy-3">

                                                    <div className="col-xl mb-lg-0 lg-4">
                                                        <div className="card border shadow-none">
                                                            <div className="card-body">
                                                                <h3 className="fw-bold text-center text-uppercase mt-3">Starter</h3>
                                                                <div className="my-4 py-2 text-center">
                                                                    <img src="../assets/img/icons/unicons/bookmark.png"
                                                                         alt="Starter Image" height="80"/>
                                                                </div>

                                                                <div className="text-center mb-4">
                                                                    <div className="mb-2 d-flex justify-content-center">
                                                                        <sup className="h5 pricing-currency mt-3 mb-0 me-1">$</sup>
                                                                        <h1 className="fw-bold h1 mb-0">0</h1>
                                                                        <sub className="h5 pricing-duration mt-auto mb-2">/month</sub>
                                                                    </div>
                                                                </div>

                                                                <ul className="ps-3 pt-4 pb-2 list-unstyled">
                                                                    <li className="mb-2"><span
                                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                                        className="bx bx-check bx-xs"/></span> Rich landing pages
                                                                    </li>
                                                                    <li className="mb-2"><span
                                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                                        className="bx bx-check bx-xs"/></span> 100+ components
                                                                    </li>
                                                                    <li className="mb-2"><span
                                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                                        className="bx bx-check bx-xs"/></span> Basic support on
                                                                        Github
                                                                    </li>
                                                                </ul>

                                                                <a href="auth-register-basic.html"
                                                                   className="btn btn-label-primary d-grid w-100">Get started for
                                                                    free</a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-xl mb-lg-0 lg-4">
                                                        <div className="card border border-primary shadow-none">
                                                            <div className="card-body">
                                                                <div className="pricing-exclusive text-end m-n2">
                                                                    <span className="badge bg-label-primary">Exclusive</span>
                                                                </div>
                                                                <h3 className="fw-bold text-center text-uppercase mt-2">Pro</h3>
                                                                <div className="my-4 py-2 text-center">
                                                                    <img src="../assets/img/icons/unicons/wallet-round.png"
                                                                         alt="Pro Image" height="80"/>
                                                                </div>
                                                                <div className="text-center mb-4">
                                                                    <div className="mb-2 d-flex justify-content-center">
                                                                        <sup className="h5 pricing-currency mt-3 mb-0 me-1">$</sup>
                                                                        <h1 className="price-toggle price-yearly fw-bold h1 mb-0">42</h1>
                                                                        <h1 className="price-toggle price-monthly fw-bold h1 mb-0 d-none">49</h1>
                                                                        <sub className="h5 pricing-duration mt-auto mb-2">/month</sub>
                                                                    </div>
                                                                    <small
                                                                        className="position-absolute start-0 end-0 m-auto price-yearly price-yearly-toggle text-muted">$
                                                                        499 / year</small>
                                                                </div>

                                                                <ul className="ps-3 pt-4 pb-2 list-unstyled">
                                                                    <li className="mb-2"><span
                                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                                        className="bx bx-check bx-xs"/></span> Up to 5 users
                                                                    </li>
                                                                    <li className="mb-2"><span
                                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                                        className="bx bx-check bx-xs"/></span> 120+ components
                                                                    </li>
                                                                    <li className="mb-2"><span
                                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                                        className="bx bx-check bx-xs"/></span> Basic support on
                                                                        Github
                                                                    </li>
                                                                    <li className="mb-2"><span
                                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                                        className="bx bx-check bx-xs"/></span> Monthly updates
                                                                    </li>
                                                                    <li className="mb-2"><span
                                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                                        className="bx bx-check bx-xs"/></span> Integrations
                                                                    </li>
                                                                </ul>

                                                                <a href="#"
                                                                   className="btn btn-primary d-grid w-100">Get Started</a>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-xl">
                                                        <div className="card border shadow-none">
                                                            <div className="card-body">
                                                                <h3 className="text-center text-uppercase fw-bold mt-3">Enterprise</h3>

                                                                <div className="my-4 py-2 text-center">
                                                                    <img src="../assets/img/icons/unicons/briefcase-round.png"
                                                                         alt="Pro Image" height="80"/>
                                                                </div>

                                                                <div className="text-center mb-4">
                                                                    <div className="mb-2 d-flex justify-content-center">
                                                                        <sup className="h5 pricing-currency mt-3 mb-0 me-1">$</sup>
                                                                        <h1 className="price-toggle price-yearly fw-bold h1 mb-0">84</h1>
                                                                        <h1 className="price-toggle price-monthly fw-bold h1 mb-0 d-none">99</h1>
                                                                        <sub className="h5 pricing-duration mt-auto mb-2">/month</sub>
                                                                    </div>
                                                                    <small
                                                                        className="position-absolute start-0 end-0 m-auto price-yearly price-yearly-toggle text-muted">$
                                                                        999 / year</small>
                                                                </div>

                                                                <ul className="ps-3 pt-4 pb-2 list-unstyled">
                                                                    <li className="mb-2"><span
                                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                                        className="bx bx-check bx-xs"/></span> Up to 10 users
                                                                    </li>
                                                                    <li className="mb-2"><span
                                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                                        className="bx bx-check bx-xs"/></span> 150+ components
                                                                    </li>
                                                                    <li className="mb-2"><span
                                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                                        className="bx bx-check bx-xs"/></span> Basic support on
                                                                        Github
                                                                    </li>
                                                                    <li className="mb-2"><span
                                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                                        className="bx bx-check bx-xs"/></span> Monthly updates
                                                                    </li>
                                                                    <li className="mb-2"><span
                                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                                        className="bx bx-check bx-xs"/></span> Integrations
                                                                    </li>
                                                                    <li className="mb-2"><span
                                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                                        className="bx bx-check bx-xs"/></span> Product Support
                                                                    </li>
                                                                    <li className="mb-2"><span
                                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                                        className="bx bx-check bx-xs"/></span> API access
                                                                    </li>
                                                                    <li className="mb-2"><span
                                                                        className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i
                                                                        className="bx bx-check bx-xs"/></span> Speedy build tooling
                                                                    </li>
                                                                </ul>

                                                                <a href="#"
                                                                   className="btn btn-label-primary d-grid w-100">Get Started</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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

export default BillingUser;


