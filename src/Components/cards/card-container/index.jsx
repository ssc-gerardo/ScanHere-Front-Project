import React from 'react'
import { Link } from 'react-router-dom'

// css
import './card-container.css'

export default function CardContainer (props) {
  const { children, id } = props
  return (
    <>
      {
        id ? (
          <Link to={`graphics/${id}`}>
            <div className='card-container'>
              {children}
            </div>
          </Link>
        )
          : (
            <div className='card-container'>
              {children}
            </div>
          )
      }
    </>
  )
}
