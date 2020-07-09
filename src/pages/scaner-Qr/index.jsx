import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import { Redirect } from 'react-router-dom'
import api from '../../lib/api'

import Header from '../../Components/Header'
import CardGradiantContainer from '../Promo-Qr-List/components/cards/cards-gradiant-container'
// css

export default class ScanQr extends Component {
  constructor (props) {
    super(props)
    this.state = {
      delay: 1000,
      result: null,
      scan: null,
      error: {
        hasError: false,
        message: ''
      }
    }
    this.handleScan = this.handleScan.bind(this)
  }

  handleScan (data) {
    if (data) {
      this.setState({
        result: data
      }, () => {
        const token = localStorage.getItem('authUserToken')
        const promotionId = this.props.match.params.promotionId
        api.postScan(this.state.result, promotionId, token)
          .then((scan) => {
            this.setState({
              scan
            })
          })
          .catch((error) => {
            this.setState({
              error: {
                hasError: true,
                message: error.message
              }
            })
          })
      })
    }
  }

  handleError (err) {
    console.error(err)
  }

  render () {
    const token = localStorage.getItem('authUserToken')
    if (!token) {
      return <Redirect to='/login' />
    }

    const payload = token.split('.')[1]
    const decodedPayload = atob(payload)
    const { roll } = JSON.parse(decodedPayload)
    if (roll === 'admin') {
      return <Redirect to='/promos' />
    }

    const previewStyle = {
      height: 280,
      width: 280,
      display: 'inline'
    }

    const { error, result, delay, scan } = this.state
    if (scan) {
      const promoId = this.props.match.params.promotionId
      return (<Redirect to={`/album-qr/${promoId}`} />)
    }

    return (
      <div className='container'>
        <Header />
        <div className='row'>
          <div className='col-12'>
            <h1 className='px-3'>
              Scanea
            </h1>
          </div>
        </div>
        <div className='row p-3'>
          <div className='col-12 d-flex justify-content-center'>
            <CardGradiantContainer>
              <QrReader
                delay={delay}
                style={previewStyle}
                onError={this.handleError}
                onScan={this.handleScan}
              />
              {/* {(scan && !hasError) && (
                <p>
                Has exacaneado <b>{scan.product.productName}</b> para ganar <b>{scan.promotion.prize}</b>
                </p>
              )} */}
            </CardGradiantContainer>
            {(result && error.hasError) && (
              <p>
                {error.message}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
}
