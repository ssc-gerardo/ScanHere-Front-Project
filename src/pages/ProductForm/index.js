import React, { Component } from 'react'
import Header from '../../Components/Header'
import { createProduct } from '../../services/admin'
import NavBarAdmin from '../../Components/NavBarAdmin'
import Input from '../../pages/SignIn/components/inputs'
import { Redirect } from 'react-router-dom'

import './ProductForm.css'

export default class ProductForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      productName: '',
      sku: '',
      price: '',
      currency: '',
      succes: false
    }
    this.handlerInput = this.handlerInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handlerInput ({ target: { name, value } }) {
    this.setState({
      [name]: value
    })
  }

  async handleSubmit (event) {
    event.preventDefault()
    const { currency, price, sku, productName } = this.state
    const data = {
      productName,
      sku,
      price,
      currency
    }
    const token = localStorage.getItem('authUserToken')
    const response = await createProduct(data, token)
    const responseJSON = await response.json()
    if (responseJSON.success) {
      alert('Producto creado')
      this.setState({
        success: true
      })
    } else if (!responseJSON.success) {
      alert('Hubo un error al crear el producto')
      this.setState({
        success: false
      })
    }
  }

  render () {
    const token = localStorage.getItem('authUserToken')
    if (!token) {
      return (
        <Redirect to='/login' />
      )
    }
    const { currency, price, sku, productName } = this.state
    return (
      <div className='Container'>
        <Header />
        <form onSubmit={this.handleSubmit}>
          <Input
            name='productName'
            labelFor='productName'
            placeholder='Nombre del producto'
            value={productName}
            onChange={this.handlerInput}
            class='form-comtrol'
          />
          <Input
            type='number'
            placeholder='SKU'
            value={sku}
            onChange={this.handlerInput}
            name='sku'
            className='form-comtrol'
          />
          <Input
            type='number'
            placeholder='Precio'
            value={price}
            onChange={this.handlerInput}
            name='price'
            className='form-comtrol'
          />
          <Input
            type='string'
            placeholder='MXN'
            value={currency}
            onChange={this.handlerInput}
            name='currency'
            className='form-comtrol'
          />
          <button type='submit' className='m-3 px-4 button py-2'>REGISTRAR PRODUCTO</button>
        </form>
        <NavBarAdmin />
      </div>

      // <div className='Container'>
      //   <div>
      //     <Header />
      //     <div className='row d-flex justify-content-center'>
      //       <form onSubmit={this.handleSubmit} className='p-5 p-3 mb-5 formScanHere'>
      //         <div className=' col-md-12 productRegister'>
      //           <Input
      //             name='productName'
      //             labelFor='productName'
      //             placeholder='Nombre del producto'
      //             value={productName}
      //             onChange={this.handlerInput}
      //             class='form-comtrol'
      //           />
      //         </div>

      //         <div className=' col-md-12 productRegister'>
      //           <Input
      //             type='number'
      //             placeholder='SKU'
      //             value={sku}
      //             onChange={this.handlerInput}
      //             name='sku'
      //             className='form-comtrol'
      //           />
      //         </div>

      //         <div className=' col-md-12 productRegister'>
      //           <Input
      //             type='number'
      //             placeholder='Precio'
      //             value={price}
      //             onChange={this.handlerInput}
      //             name='price'
      //             className='form-comtrol'
      //           />
      //         </div>

      //         <div className=' col-md-12 productRegister'>
      //           <Input
      //             type='string'
      //             placeholder='MXN'
      //             value={currency}
      //             onChange={this.handlerInput}
      //             name='currency'
      //             className='form-comtrol'
      //           />
      //         </div>
      //         <div className=' col-md-12 d-flex justify-content-center'>
      //           {/* <div className='row d-flex justify-content-center'>
      //               <div className='col-6'> */}
      //           <button type='submit' className='m-3 px-4 button py-2'>REGISTRAR PRODUCTO</button>
      //           {/* </div>
      //             </div> */}
      //         </div>
      //       </form>
      //     </div>

      //   </div>
      //   <NavBarAdmin />
      // </div>
    )
  }
}
