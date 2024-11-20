import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
function ParentRout() {
  return (
    <div>
      <Navbar/>
        <Outlet/>
    </div>
  )
}

export default ParentRout
