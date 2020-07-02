import React from 'react'

// css
import './card-title.css'

export default function CardTitle (props) {
  const { title, data } = props
  return (
    <div className='card-title row text-white text-center pt-2'>
      <div className='col-12'>
        <h4 className='text-break color-title'>
          {title}
        </h4>
      </div>
      {
        data && (
          <div className='col-5'>
            <h6>
              {data}
            </h6>
          </div>
        )
      }
    </div>
  )
}
