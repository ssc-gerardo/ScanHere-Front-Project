import React from 'react'

// css
import './cards-gradiant-container.css'
import { Link } from 'react-router-dom'

export default function CardGradiantContainer (props) {
  const { children, id, isUser } = props
  return (
    <>
      {
        id ? (
          <Link to={isUser ? `album-qr/${id}` : `/${id}`}>
            <div className='card-gradiant-container'>
              {children}
            </div>
          </Link>
        )
          : (
            <div className='card-gradiant-container'>
              {children}
            </div>
          )
      }
    </>
  )
}
