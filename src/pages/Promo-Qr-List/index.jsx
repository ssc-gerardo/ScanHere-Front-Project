import React, { Component } from 'react'

// css
import './page-promo-qr-list.css'
// import NavBarUser from '../../Components/NavBarUser'

import CardsQrWrapper from './components/cards/cards-qr-wrapper'
import api from '../../lib/api'
import Header from '../../Components/Header'
import { Redirect } from 'react-router-dom'

export default class PagePromoQrlist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      promolist: []
    }
  }

  componentDidMount () {
    const token = localStorage.getItem('authUserToken')
    api.getAllPromotions(token)
      .then((promotions) => {
        const formatedPromotions = promotions.map(promo => {
          return {
            id: promo._id,
            ...promo
          }
        })
        this.setState({
          promoList: formatedPromotions
        })
      })
  }

  render () {
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
        <CardsQrWrapper cardsPromos={this.state.promoList} isUser />
      </div>
    )
  }
}
