import React, { Component } from 'react'

class Modal extends Component {

    constructor (props) {

        super(props)
    }
    render () {
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName}>
                <section className='modal-main'>
                    <h1>Promocion</h1>
                    <p>Lorem pixum Lorem pixum Lorem pixum Lorem pixum</p>
                    <button onClick={this.props.onClose}>
                        Cerrar
                    </button>
                </section>
            </div>
        )
    }

}

export default Modal 