import React, { Component } from 'react'

// css
import './page-promo-qr-list.css'
// import NavBarUser from '../../Components/NavBarUser'

import CardsQrWrapper from './components/cards/cards-qr-wrapper'
import api from '../../lib/api'
import Header from '../../Components/Header'
import { Redirect } from 'react-router-dom'

export default class PagePromoQrlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      promolist: [],
      isAllPromotion: null
    }
    this.handleButton = this.handleButton.bind(this)
  }

  componentWillMount () {
    const token = localStorage.getItem('authUserToken')
    const qr = localStorage.getItem('qrData')
    if (qr) {
      // peticion hacia promociones de un solo producto
      api.getPromotionsByQr(token, qr)
        .then((promotions) => {
          const formatedPromotions = promotions.map(promo => {
            return {
              id: promo._id,
              ...promo
            }
          })
          this.setState({
            promoList: formatedPromotions,
            isAllPromotion: false
          })
        })
    } else {
      api.getAllPromotions(token)
        .then((promotions) => {
          const formatedPromotions = promotions.map(promo => {
            return {
              id: promo._id,
              ...promo
            }
          })
          this.setState({
            promoList: formatedPromotions,
            isAllPromotion: true
          })
        })
    }
  }

  handleButton (event) {
    event.preventDefault()
    const token = localStorage.getItem('authUserToken')
    const qr = localStorage.getItem('qrData')
    if (this.state.isAllPromotion) {
      // peticion hacia promociones de un solo producto
      api.getPromotionsByQr(token, qr)
        .then((promotions) => {
          const formatedPromotions = promotions.map(promo => {
            return {
              id: promo._id,
              ...promo
            }
          })
          this.setState({
            promoList: formatedPromotions,
            isAllPromotion: false
          })
        })
    } else {
      api.getAllPromotions(token)
        .then((promotions) => {
          const formatedPromotions = promotions.map(promo => {
            return {
              id: promo._id,
              ...promo
            }
          })
          this.setState({
            promoList: formatedPromotions,
            isAllPromotion: true
          })
        })
    }
  }

  render () {
    const qr = localStorage.getItem('qrData')
    const token = localStorage.getItem('authUserToken')
    if (!token) {
      return (
        <Redirect to='/login' />
      )
    }
    return (
      <div className='container page-promo-list'>
        {/* <Header /> */}
        <div className='row'>
          <div className='col-12 my-3'>
            <h1>¡Promociones!</h1>
          </div>
        </div>
        {
          qr && (
            <button type='button' className='m-3 px-4 button py-2' onClick={this.handleButton}>
              {
                !this.state.isAllPromotion && <h6>ver todas las promos</h6>
              }
              {
                this.state.isAllPromotion && <h6> ver promos de mi producto</h6>
              }
            </button>
          )
        }
        <CardsQrWrapper cardsPromos={this.state.promoList} isUser />
      </div>
    )
  }
}
