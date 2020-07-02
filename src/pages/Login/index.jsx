import React, { Component } from 'react'
import Header from '../../Components/Header'
import Inputs from '../SignIn/components/inputs'
import api from '../../lib/api'
import { Redirect } from 'react-router-dom'

// css
import './Login.css'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      Email: '',
      password: '',
      error: null,
      isLogedIn: false
    }
    this.handleInputOnChange = this.handleInputOnChange.bind(this)
    this.handleButton = this.handleButton.bind(this)
  }

  componentDidMount () {
    const token = localStorage.getItem('authUserToken')
    this.setState({
      isLogedIn: !!token
    })
  }

  handleInputOnChange ({ target: { value, name } }) {
    if (name === 'Contraseña') {
      name = 'password'
    }
    this.setState({
      [name]: value
    })
  }

  handleButton (event) {
    event.preventDefault()
    api.login(this.state)
      .then((token) => {
        localStorage.setItem('authUserToken', token)
        this.setState({
          isLogedIn: true
        })
      })
      .catch((error) => {
        this.setState({
          error
        })
      })
  }

  render () {
    if (this.state.isLogedIn) {
      return (
        <Redirect to='/promos' />
      )
    }
    return (
      <div className='container-login'>
        <Header />
        <div className='row container-form justify-content-center container-form'>
          <div className='col-12 col-md-8 p-3'>
            <h2>
              Inicia Sesión
            </h2>
          </div>
          {
            this.state.error && (
              <div className='col-12 col-md-8'>
                Datos incorrectos
              </div>
            )
          }
          <div className='col-12 col-md-8 p-3'>
            <form>
              <Inputs name='Email' labelfor='Email' placeholder='tu@email.com' min='3' type='email' value={this.state.email} onChange={this.handleInputOnChange} />
              <Inputs name='Contraseña' labelfor='Contraseña' placeholder='123456' min='8' type='password' value={this.state.password} onChange={this.handleInputOnChange} />
              <div className='row d-flex justify-content-center'>
                <div className='col-6'>
                  <button type='submit' className='m-3 px-4 button py-2' onClick={this.handleButton}>Iniciar Sesión</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
