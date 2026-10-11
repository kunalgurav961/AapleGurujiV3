import React from 'react'
import Navbar from '../../shared/ui/components/Navbar'
import { Outlet } from 'react-router'

const PublicLayout = () => {
  return (
      <div className='min-h-screen w-screen'>
          <Outlet />
    </div>
  )
}

export default PublicLayout