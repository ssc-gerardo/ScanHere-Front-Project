import React, { Component } from 'react'

import api from '../../lib/api'
import PromotionData from './components/promotion-data'
import AlbumLayout from './components/album-layout'
import { Redirect, Link } from 'react-router-dom'
import Header from '../../Components/Header'
export default class AlbumQr extends Component {
  constructor (props) {
    super(props)
    const { match: { params } } = props
    this.state = {
      promotion: {
        numberOfScans: 0
      },
      promotionId: params.promotionId,
      scans: 0,
      allowBurnQr: false
    }
    this.setScans = this.setScans.bind(this)
    this.handleButton = this.handleButton.bind(this)
  }

  setScans (scans) {
    this.setState({
      scans
    })
  }

  componentWillMount () {
    const token = localStorage.getItem('authUserToken')
    const qr = localStorage.getItem('qrData')
    if (qr) {
      // peticion hacia promociones de un solo producto
      api.getPromotionsByQr(token, qr)
        .then((promotions) => {
          const promotionsIds = promotions.map(promo => {
            return promo._id
          })
          if (promotionsIds.includes(this.state.promotionId)) {
            this.setState({
              allowBurnQr: true
            })
          }
        })
    }
  }

  componentDidMount () {
    const token = localStorage.getItem('authUserToken')
    if (token) {
      api.getPromotionById(this.state.promotionId, token)
        .then(promotion => {
          this.setState({
            promotion
          })
        })
    }
  }

  handleButton (event) {
    event.preventDefault()
    const token = localStorage.getItem('authUserToken')
    const qr = localStorage.getItem('qrData')
    const promotionId = this.props.match.params.promotionId
    api.postScan(qr, promotionId, token)
      .then((scan) => {
        this.setState({
          scan
        })
        localStorage.removeItem('qrData')
        window.location.reload()
      })
      .catch((error) => {
        this.setState({
          error: {
            hasError: true,
            message: error.message
          }
        })
        localStorage.removeItem('qrData')
      })
  }

  render () {
    const token = localStorage.getItem('authUserToken')
    if (!token) {
      return (
        <Redirect to='/login' />
      )
    }
    const payload = token.split('.')[1]
    const decodedPayload = atob(payload)
    const { roll } = JSON.parse(decodedPayload)
    if (roll === 'admin') {
      return <Redirect to='/promos' />
    }

    return (
      <div className='container album-qr'>
        <Header />
        <div className='row'>
          <div className='col-12'>
            <h1 className='text-center'>
              ALBUM
            </h1>
          </div>
        </div>
        <PromotionData
          currentScans={this.state.scans}
          totalScans={this.state.promotion.numberOfScans}
          promotionName={this.state.promotion.prize}
        />
        {
          this.state.allowBurnQr && (
            <button type='button' className='m-3 px-4 button py-2' onClick={this.handleButton}>
              Registrar QR
            </button>
          )
        }
        <AlbumLayout
          setScans={this.setScans}
          promotionId={this.state.promotionId}
          totalScans={this.state.promotion.numberOfScans}
        />
        <div className='row'>
          <div className='col-12 py-5'>
            <Link to={this.props.match.params.promotionId + '/scan-qr'} className='m-3 px-4 button py-2 text-white'>
              Scanear
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
