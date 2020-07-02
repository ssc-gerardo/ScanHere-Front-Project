import React from 'react'
import CardTitle from '../../../../../Components/cards/card-title'
import PromoDateAndScanNumber from '../date-scans'

// css
import './card-layaout.css'

export default function CardLayaout (props) {
  const { titleData, promoData } = props
  return (
    <div className='row Cardlayout'>
      <div className='col-12'>
        <CardTitle
          title={titleData.title}
          data={titleData.data}
        />
      </div>
      <div className='col-12'>
        <PromoDateAndScanNumber
          promoStarts={promoData.promoStarts}
          numberOfScans={promoData.numberOfScans}
        />
      </div>
    </div>
  )
}
