import React from 'react'
import Header from '../../Components/Header'
import './qrGenerator.scss'
import { getProducts } from '../../services/admin'
import QRCode from 'qrcode.react'
import uniqid from 'uniqid'
import NavBarAdmin from '../../Components/NavBarAdmin'
import { Redirect } from 'react-router-dom'
export default class QrGenerator extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      products: [],
      selectedProduct: false,
      id: ''
    }
    this._renderProducts = this._renderProducts.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  async componentDidMount () {
    try {
      const token = localStorage.getItem('authUserToken')
      const response = await getProducts(token)
      const dataResponse = await response.json()
      this.setState({
        products: dataResponse.data.product
      })
    } catch (error) {
      console.log('Error', error)
    }
  }

  _renderProducts () {
    const { products } = this.state
    return products.map(({ productName, sku }, index) => (
      <option value={sku}>Nombre: {productName} , SKU:{sku}</option>
    ))
  }

  handleInput ({ target: { name, value } }) {
    this.setState({
      selectedProduct: value
    })
  }

  render () {
    const token = localStorage.getItem('authUserToken')
    if (!token) {
      return (
        <Redirect to='/login' />
      )
    }
    const siteUrl = "http://localhost:3000/qr/"
    const myObj = { id: uniqid(), sku: this.state.selectedProduct }
    const objAsString = JSON.stringify(myObj)
    const encriptedObj = btoa(objAsString)
    return (
      <div className="Container">
        <Header />
        <form onSubmit={this.handleSubmit} className='d-flex justify-content-center'>
          <select className='form-control form-control-sm' id='selectOptios' onChange={this.handleInput} value={this.state.value}>
            <option value='none' selected disabled hidden>
              Selecciona una Opción
            </option>
            {this._renderProducts()}
          </select>
        </form>
        <div className='qr'>
          {
          this.state.selectedProduct ? (
            <>
              <QRCode includeMargin='true' value={siteUrl+encriptedObj} size={170} />
            </>
          ) : (
              <h1>Codigo Qr</h1>
            )
          }
        </div>
        <NavBarAdmin />
      </div>
    )
  }
}
