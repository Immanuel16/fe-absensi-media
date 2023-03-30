import React from 'react'
import { Outlet } from 'react-router'

export const PublicLayout = () => {
  return (
    <div className='grid h-screen font-poppins pb-6'>
      <Outlet />
    </div>
  )
}
