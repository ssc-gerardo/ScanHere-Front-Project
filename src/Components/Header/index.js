import React, { Component } from 'react'
import sh from '../../nombreLogo.svg'
import './Header.scss'
import {
  Link
} from 'react-router-dom'

export default class Header extends Component {
  handleOnClick () {
    localStorage.removeItem('authUserToken')
    window.location.reload()
  }

  render () {
    const token = localStorage.getItem('authUserToken')
    return (
      <div className="container">
        <div className='row d-flex justify-content-between'>
          <div className='col-5 logoscan'>
            <Link to='/'>
              <img src={sh} className='rounded mx-auto d-block mt-2' alt='scanHerelogo' />
            </Link>
          </div>
          <div className='col-5 '>
            {
              token && (
                <button type='submit' className='btn ' onClick={this.handleOnClick}>CERRAR SESIÓN</button>
              )
            }
          </div>
        </div>
      </div>
      // <div className="Container">
      // <div className='row'>
      //   <div className='col-5  '>
      //     <Link to='/'>
      //       <img src={sh} className='rounded mx-auto d-block mt-2' alt='scanHerelogo' />
      //     </Link>
      //   </div>
      //   <div className='col-3' />
      //   <div className='col-3 '>
      //     {
      //       token && (
      //         <button type='submit' className='m-3 px-4 btn btn-outline-secondary py-2' onClick={this.handleOnClick}>CERRAR SESIÓN</button>
      //       )
      //     }
      //   </div>
      //   <div className='col-1' />
      // </div>
      // </div>
    )
  }
}
