import React from 'react'

export const ErrorMessage = ({message, show}) => {
  return (
    show && <span className="text-xxs text-media-danger-3">{message}</span>
  )
}
