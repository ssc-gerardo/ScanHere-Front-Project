import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class RedirectQr extends Component {
  componentWillMount () {
    const { match: { params } } = this.props
    console.log(params)
    localStorage.setItem('qrData', params.qrhash)
  }

  render () {
    const token = localStorage.getItem('authUserToken')
    if (!token) {
      return (
        <Redirect to='/login' />
      )
    }
    return (
      <Redirect to='/promos' />
    )
  }
}
