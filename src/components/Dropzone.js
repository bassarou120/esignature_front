import React,{Component} from "react";
import ReactDOM from "react-dom";

class Dropzone extends Component {
    componentDidMount() {
        let script0 = document.createElement("script");
        script0.setAttribute("src", "../assets/vendor/libs/dropzone/dropzone.min.js");
        document.head.appendChild(script0);

        let style = document.createElement("link");
        style.setAttribute("href", "../assets/vendor/libs/dropzone/dropzone.min.css");
        style.setAttribute("rel", "stylesheet");
        document.head.appendChild(style);

        let script1 = document.createElement("script");
        script1.setAttribute("src", "../assets/js/forms-file-upload.js");
        document.head.appendChild(script1);

        // let script2 = document.createElement("script");
        // script2.setAttribute("src", "/assets/js/wfd.js");
        // document.head.appendChild(script2);

    }
    render() {
        return (
            <div>
                <form action="/upload" className="dropzone needsclick" id="dropzone-basic" encType="multipart/form-data">

                    <div className="dz-message needsclick">
                        Drop files here or click to upload
                        <span className="note needsclick">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>
                    </div>
                    <div className="fallback">
                        <input name="file" type="file"  accept=".PDF,.pdf" />
                    </div>
                </form>

            </div>
        );
    }
}

export default Dropzone;
