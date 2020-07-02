import React from 'react'

export default function PromotionData (props) {
  const { currentScans, totalScans, promotionName } = props
  return (
    <div className='row py-3'>
      <div className='col-12 col-md-9 text-left'>
        <h3>
          {promotionName}
        </h3>
      </div>
      <div className='col-12 col-md-3 text-left text-md-right'>
        <h3>
          Scans:{currentScans}/{totalScans}
        </h3>
      </div>
    </div>
  )
}
