import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SignaturePad from 'react-signature-canvas'

import styles from './styles.module.css'

class SignatureCanva extends Component {
    state = {trimmedDataURL: null}
    sigPad = {}
    clear = () => {
        this.sigPad.clear()
    }
    trim = () => {
        this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
                .toDataURL('image/png')})
        var s = this.sigPad.getTrimmedCanvas()
            .toDataURL('image/png')
        this.props.setSignatureUrl(s);
    }
    render () {
        let {trimmedDataURL} = this.state
        return <div className={styles.container}>
            <div className={styles.sigContainer}>
                <SignaturePad canvasProps={{className: styles.sigPad}} penColor="#333333" backgroundColor="#ffffff00"
                              ref={(ref) => { this.sigPad = ref }} />
            </div>
            <div className="text-center">
                <button type="button"  className="btn btn-icon btn-danger" onClick={this.clear}>
                    X
                </button>
                <button type="button" className="btn btn-icon btn-success" onClick={this.trim}>
                    <span className="fa fa-check"></span>
                </button>
            </div>
            {trimmedDataURL
                ? <img className={styles.sigImage}
                       src={trimmedDataURL} />
                : null}
        </div>
    }
}


export default SignatureCanva;