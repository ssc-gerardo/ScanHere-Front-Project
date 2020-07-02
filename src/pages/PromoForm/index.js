import React, { Component } from "react";
import Header from "../../Components/Header";
import { getProducts, createPromo } from '../../services/admin'
import NavBarAdmin from '../../Components/NavBarAdmin'
import Inputs from '../SignIn/components/inputs'
import { Redirect } from 'react-router-dom'

export default class PromoForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      SKU: "",
      productInfo: [],
      Escaneos: 0,
      Inicio: "",
      Fin: "",
      state: "",
      Premio: "",
      selectedProduct: "",
      state: "activo",
      hasMadeAPromo: false,
      products: []
    };
    this.handlerInput = this.handlerInput.bind(this);
  }

  async componentDidMount () {
    try {
      const token = window.localStorage.getItem('authUserToken')
      //const response = await getProducts(token)
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
    return products.map(({ productName, sku, _id }, index) => (
      <option value={_id}>Nombre: {productName} , SKU:{sku}</option>
    ))
  }
  // arrayvar: this.state.arrayvar.concat([newelement])
  handlerInput ({ target: { name, value } }) {
    if (name == "") {

      this.setState({
        productInfo: [value],
      });
    }
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { Premio, productInfo, Inicio, Fin, Escaneos } = this.state;

    const data = {
      Escaneos,
      productInfo,
      Premio,
      Inicio,
      Fin,
      state: "activo"
    }
    const token = localStorage.getItem('authUserToken')
    const response = await createPromo(data, token)
    const responseJSON = await response.json()
    if (responseJSON.success) {
      alert('Promoción creada')
      this.setState({
        success: true
      })
    } else if (!responseJSON.success) {
      alert('Hubo un error al crear la promoción')
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
    const { prize, promoEnds, promoStarts, numberOfScans, productInfo } = this.state;
    return (
      <div className="Container">
        <Header/>
        <form onSubmit={this.handleSubmit}>
           <select className="rounded bg-white" id="selectOptios" onChange={this.handlerInput} value={this.state.value}>
            <option value="none" selected disabled hidden>
              Selecciona un Producto
              </option>
            {this._renderProducts()}
          </select>
          <Inputs
            type='number'
            placeholder={"Numero de escaneos"}
            value={numberOfScans}
            onChange={this.handlerInput}
            name={"Escaneos"}
            labelfor='Numero de escaneos'
          />
          <Inputs
            type='date' id='start' name='trip-start' min='2020-06-17' max='2020-12-31'
            placeholder={"MXN"}
            value={promoStarts}
            onChange={this.handlerInput}
            name={"Inicio"}
            labelfor='Inicio de promoción'
          />
          <Inputs
            type='date' id='end' name='trip-end' min='2020-06-17' max='2020-12-31'
            placeholder={"Start"}
            value={promoEnds}
            onChange={this.handlerInput}
            name={"Fin"}
            labelfor='Fin de promoción'
          />
          <Inputs
            type='string'
            placeholder={"Premio"}
            value={prize}
            onChange={this.handlerInput}
            name={"Premio"}
            labelfor='Premio'
          />
          <button type='submit' className='m-4 button py-2 px-4 registrarPromo ' onClick={this.handleSubmit}>REGISTRAR PROMOCIÓN</button>
        </form>
        <NavBarAdmin />
      </div>
      // <div className="Container">
      //   <div>
      //     <Header
      //     />
      //     <div className="row ">
      //       <div className="col-12 d-flex justify-content-center ">
      //         <form onSubmit={this.handleSubmit} className=' p-5 p-3 mb-5 '>
      //           <select className="rounded bg-white" id="selectOptios" onChange={this.handlerInput} value={this.state.value}>
      //             <option value="none" selected disabled hidden>
      //               Selecciona un Producto
      //               </option>
      //             {this._renderProducts()}
      //           </select>
      //           {/* </div>
      //             <div className="col-12 escaneos">  */}
      //           <Inputs
      //             type='number'
      //             placeholder={"Numero de escaneos"}
      //             value={numberOfScans}
      //             onChange={this.handlerInput}
      //             name={"Escaneos"}
      //             labelfor='Numero de escaneos'
      //           />
      //           {/* </div>
      //             <div className="col-12 ">  */}
      //           <Inputs
      //             type='date' id='start' name='trip-start' min='2020-06-17' max='2020-12-31'
      //             placeholder={"MXN"}
      //             value={promoStarts}
      //             onChange={this.handlerInput}
      //             name={"Inicio"}
      //             labelfor='Inicio de promoción'
      //           />
      //           {/* </div>
      //             <div className="col-12 ">  */}
      //           <Inputs
      //             type='date' id='end' name='trip-end' min='2020-06-17' max='2020-12-31'
      //             placeholder={"Start"}
      //             value={promoEnds}
      //             onChange={this.handlerInput}
      //             name={"Fin"}
      //             labelfor='Fin de promoción'
      //           />
      //           {/* </div>
      //             <div className="col-12 ">  */}
      //           <Inputs
      //             type='string'
      //             placeholder={"Premio"}
      //             value={prize}
      //             onChange={this.handlerInput}
      //             name={"Premio"}
      //             labelfor='Premio'
      //           />
      //           {/* </div> */}
      //           <div className="col-12 d-flex justify-content-center">
      //             <button type='submit' className='m-4 button py-2 px-4 registrarPromo ' onClick={this.handleSubmit}>REGISTRAR PROMOCIÓN</button>
      //           </div>
      //         </form>
      //       </div>
      //     </div>
      //   </div>
      //   <NavBarAdmin />
      // </div>
    );
  }
}
