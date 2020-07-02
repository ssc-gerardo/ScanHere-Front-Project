import React, { Component } from 'react'
import logo from '../../scanhere.svg'
import Header from '../../Components/Header'

import {
  Link
} from 'react-router-dom'
// import Header from '../../Components/Header'

// css
import './Home.css'

export default class index extends Component {
  render () {
    return (
      <div className='container'>
        <div className='row justify-content-center align-items-center max-h'>
          <Header />
          <div className='col-12 col-md-6 img'>
            <img src={logo} className='App-logo m-3' alt='logo' />
          </div>

          <div className='col-12 col-md-6 link'>
            <Link to='/login' exact>
              <button type='button' className='px-4 button py-2'>Inicia Sesión</button>
            </Link>

            <Link to='/sigin' exact>
              <button type='button' className='px-4 button py-2'>Regístrate</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
