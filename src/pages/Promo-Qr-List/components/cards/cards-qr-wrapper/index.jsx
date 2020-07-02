import React from 'react'

// css
import './cards-qr-wrapper.css'
import CardLayaout from '../card-layaout'
import CardGradiantContainer from '../cards-gradiant-container'

export default function CardsQrWrapper (props) {
  const { cardsPromos = [], isUser } = props
  return (
    <div className='row'>
      {
        cardsPromos.map((cardPromo, index) => {
          const titleData = {
            title: cardPromo.prize
          }
          const promoData = {
            promoStarts: cardPromo.promoStarts,
            numberOfScans: cardPromo.numberOfScans
          }
          return (
            <div className='col-12 col-md-4 card-List-qr-element' key={index}>
              <CardGradiantContainer id={cardPromo.id} isUser={isUser}>
                <CardLayaout
                  titleData={titleData}
                  promoData={promoData}
                />
              </CardGradiantContainer>
            </div>
          )
        })
      }
    </div>
  )
}
