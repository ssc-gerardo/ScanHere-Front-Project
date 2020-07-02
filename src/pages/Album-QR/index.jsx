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
      scans: 0
    }
    this.setScans = this.setScans.bind(this)
  }

  setScans (scans) {
    this.setState({
      scans
    })
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
