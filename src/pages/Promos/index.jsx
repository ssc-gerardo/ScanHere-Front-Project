import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import PagePromoList from '../Promo-List'
import PagePromoQrlist from '../Promo-Qr-List'

export default class Promos extends Component {
  render () {
    let isAdmin = false
    const token = localStorage.getItem('authUserToken')

    if (!token) {
      return (<Redirect to='/login' />)
    }

    const payload = token.split('.')[1]
    const decodedPayload = atob(payload)
    const { roll } = JSON.parse(decodedPayload)
    if (roll === 'admin') {
      isAdmin = true
    }

    if (isAdmin) {
      console.log('[Soy admin]')
      return (<PagePromoList />)
    } else {
      console.log('[Soy user]')
      return (<PagePromoQrlist />)
    }
  }
}
