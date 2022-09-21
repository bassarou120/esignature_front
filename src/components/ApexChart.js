import * as PropTypes from "prop-types";
import {Component, useEffect} from "react";

 function ApexChart(props) {

     useEffect(() => {
         const script = document.createElement("script");
         script.src = '../assets/js/decompteelement.js';
         document.body.appendChild(script);

     }, [])

    return (

       <div id="radialBarChart"></div>

    );
}
export default ApexChart;
