import React from "react";
import ReactDOM from 'react-dom';


const Loader = (props ) => {

    return (
        <div className="col">
            <div className="position-absolute top-50 start-50 translate-middle">
                <div className=" sk-wave sk-primary">
                    <div className="sk-wave-rect"></div>
                    <div className="sk-wave-rect"></div>
                    <div className="sk-wave-rect"></div>
                    <div className="sk-wave-rect"></div>
                    <div className="sk-wave-rect"></div>
                </div>
                <p className="text-center">{props.text}</p>
            </div>
        </div>
    );
}

export default Loader;


