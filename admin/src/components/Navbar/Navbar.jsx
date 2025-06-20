import React from 'react'
import "./Navbar.css"
import navlogo from "../../assets/Ecommerce_Assets/Assets/Admin_Assets/nav-logo.svg"
import navProfile from "../../assets/Ecommerce_Assets/Assets/Admin_Assets/nav-profile.svg"

const Navbar = () => {
  return (
    <div className="navbar">
        <img src={navlogo} className='nav-logo' alt="" />
        <img src={navProfile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar
