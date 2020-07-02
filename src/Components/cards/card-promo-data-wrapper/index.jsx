import React from 'react'
import CardPromoData from '../card-promo-data'
import moment from 'moment'

export default function CardPromoDataWrapper (props) {
  const { productQuantity, startData, endData } = props
  return (
    <div className='row card-promo-data-wrapper'>
      <div className='col-12'>
        <CardPromoData
          label='Productos'
          data={productQuantity}
        />
      </div>
      <div className='col-12'>
        <CardPromoData
          label='lanzamiento'
          data={moment(startData).format('DD-MM')}
        />
      </div>
      <div className='col-12'>
        <CardPromoData
          label='final'
          data={moment(endData).format('DD-MM')}
        />
      </div>
    </div>

  )
}
