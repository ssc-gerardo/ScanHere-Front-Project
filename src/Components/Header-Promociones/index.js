import React, { Component } from 'react'

import ReactDOM from 'react-dom'

import Modal from '../ModalPromotion'

import './Header-Promociones.css'

// import { Form } from 'react-bootstrap'

export default class Welcome extends Component {

  activateModal () {
    this.setState({
      showModal: true
    })
  }

  desactivateModal () {
    this.setState({
      showModal: false
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
    this.activateModal = this.activateModal.bind(this)
    this.desactivateModal = this.desactivateModal.bind(this)
  }

  render () {
    return (

      <div className='col-12 '>
        <Modal show={this.state.showModal} onClose={this.desactivateModal} />
        <label className="titlePromotions">Promociones!</label>
        <img onClick={this.activateModal} src="https://img.icons8.com/nolan/64/drag-list-down.png" />
      </div>


    )
  }

}
