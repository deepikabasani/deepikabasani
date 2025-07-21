import React from 'react'
import './Navbar.css'
import logo from '../Assets/logo.jpeg'

const Navbar = () => {
  return (
    <div className='navbar'>
         <img style={{ width: '200px' }} src={logo} alt="logo" /> 
    </div>
  )
}

export default Navbar
