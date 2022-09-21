import React from "react";
import ReactDOM from 'react-dom';


const DataLoadingSpinner = (props) => {

    return (<div className="d-flex justify-content-center">
        <div className={`spinner-grow text-primary text-center ${props.loader ? "" : "d-none"}`}  role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>);
}

export default DataLoadingSpinner;


