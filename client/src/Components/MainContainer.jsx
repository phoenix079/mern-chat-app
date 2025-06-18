import React from 'react'
import './MainContainer.css'
// import Sidebar from './Sidebar'
import ChatArea from './ChatArea'
import { Outlet } from 'react-router-dom'

function MainContainer() {
  return (
    <div className="main-container">
      {/* <Sidebar/> */}
      <Outlet/>
    </div>
  )
}

export default MainContainer
