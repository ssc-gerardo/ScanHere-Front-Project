import React from 'react'
import moment from 'moment'

export default function PromoDateAndScanNumber (props) {
  const { promoStarts, numberOfScans } = props
  return (
    <div className='row'>
      <div className='col-12'>
        <p className='text-center text-white'>
          {moment(promoStarts).format('DD/MMM')}
        </p>
      </div>
      <div className='col-12'>
        <p className='text-center text-white'>
          {numberOfScans}
        </p>
      </div>
    </div>
  )
}
