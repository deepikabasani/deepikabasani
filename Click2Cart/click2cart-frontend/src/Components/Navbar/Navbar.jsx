// import React, { useContext, useState } from 'react'
// import './Navbar.css'
// import { Link } from 'react-router-dom'
// import logo from '../Assets/logo.png'
// import cart_icon from '../Assets/cart_icon.png'
// import { ShopContext } from '../../Context/ShopContext'

// const Navbar = () => {

//   let [menu,setMenu] = useState("shop");
//   const {getTotalCartItems} = useContext(ShopContext);

//   return (
//     <div className='nav'>
//       <Link to='/' style={{ textDecoration: 'none' }} className="nav-logo">
//         <img src={logo} alt="logo" />
//         <p>Click2Cart</p>
//       </Link>
//       <ul className="nav-menu">
//         <li onClick={()=>{setMenu("shop")}}><Link to='/' style={{ textDecoration: 'none' }}>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
//         <li onClick={()=>{setMenu("mens")}}><Link to='/mens' style={{ textDecoration: 'none' }}>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
//         <li onClick={()=>{setMenu("womens")}}><Link to='/womens' style={{ textDecoration: 'none' }}>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
//         <li onClick={()=>{setMenu("kids")}}><Link to='/kids' style={{ textDecoration: 'none' }}>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
//       </ul>
//       <div className="nav-login-cart">
//         {localStorage.getItem('auth-token')
//         ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/");}}>Logout</button>
//         :<Link to='/login' style={{ textDecoration: 'none' }}><button>Login</button></Link>}
//         <Link to="/cart"><img src={cart_icon} alt="cart"/></Link>
//         <div className="nav-cart-count">{getTotalCartItems()}</div>
//       </div>
//     </div>
//   )
// }

// export default Navbar


// Navbar.js

import '../../Styles/navbar.scss';

import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../Assets/logo.jpeg'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
  let [menu,setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    console.log("", e)
    setSearchTerm(e.target.value);
  };

  return (
    <>
    <div className="container-n">
      <Link to='/' style={{ textDecoration: 'none' }} className="nav-logo">
          <img style={{ width: '200px' }} src={logo} alt="logo" />         
          {/* <p>Click2Cart</p> */}
      </Link>
      <label className="open-search" htmlFor="open-search">
        <i className="fas fa-search"></i>
        <input className="input-open-search"
          id="open-search" type="checkbox" name="menu" />
        <div className="search">
          <button className="button-search"><i className="fas fa-search"></i></button>
          <input type="text" value={searchTerm}
         onChange={handleSearchChange} placeholder="What are you looking for?" className="input-search" />
        </div>
      </label>

      <nav className="nav-content">
        <ul className="nav-content-list">
          {/* Account Section */}
          <li className="nav-content-item account-login">
            <label className="open-menu-login-account" htmlFor="open-menu-login-account">
              <input className="input-menu" id="open-menu-login-account" type="checkbox" name="menu" />
              <i className="fas fa-user-circle"></i>
              <span className="login-text">
                {user ? (
                <>Hello, {user.name}</>
                ) : (
                <>Hello, Sign in <strong>Create Account</strong></>
                )}
              </span>
              <span className="item-arrow"></span>
              <ul className="login-list">
                {
                  localStorage.getItem('auth-token') ? (
                    <React.Fragment>
                      <li className="login-list-item"><a href="#">My account</a></li>
                      <li className="login-list-item">
                        <a onClick={() => { localStorage.removeItem('auth-token'); localStorage.removeItem('user'); window.location.replace("/"); }}>
                          Logout
                        </a>
                      </li>
                    </React.Fragment>
                  ) : (
                    <>
                    <li className="login-list-item">
                      <Link to='/login' style={{ textDecoration: 'none' }}><a>Create Account</a></Link>
                    </li>
                    <li className="login-list-item">
                      <Link to='/login' style={{ textDecoration: 'none' }}><a>Login</a></Link>
                    </li>
                    </>
                  )
                }
              </ul>

            </label>
          </li>
          <li className="nav-content-item">
            <Link className="nav-content-link" to="/cart">
              <i className="fas fa-shopping-cart"></i>
            </Link>
            <div className="nav-cart-count">{getTotalCartItems()}
            </div>
          </li>
          {
                  localStorage.getItem('auth-token') ? (
                      <React.Fragment> 
                        <li className="nav-content-item orderHistory">
                          <Link className="nav-content-link" to="/orderHistory">
                          <i className="fas fa-history"></i> Order History
                          </Link>
                          </li>
                      </React.Fragment> 
                    )
                    : ( <></>)
          }
        </ul>
      </nav>
    </div>
    <div className="nav-container">
      <nav className="all-category-nav">
        <label className="open-menu-all" htmlFor="open-menu-all">
          <input className="input-menu-all" id="open-menu-all" type="checkbox" name="menu-open" />
          <span className="all-navigator"><i className="fas fa-bars"></i> <span>All category</span> <i className="fas fa-angle-down"></i>
            <i className="fas fa-angle-up"></i>
          </span>
          <ul className="all-category-list">
            <li className="all-category-list-item"><Link to="/smartphones" className="all-category-list-link">Smartphones<i className="fas fa-angle-right"></i></Link></li>
            <li className="all-category-list-item"><Link to="/furniture" className="all-category-list-link">Furniture <i className="fas fa-angle-right"></i></Link></li>
            <li className="all-category-list-item"><Link to="/toys" className="all-category-list-link">Toys<i className="fas fa-angle-right"></i></Link></li>
            <li className="all-category-list-item"><Link to="/computing" className="all-category-list-link">Computing<i className="fas fa-angle-right"></i></Link></li>
            <li className="all-category-list-item"><Link to="/games" className="all-category-list-link">Games<i className="fas fa-angle-right"></i></Link></li>
          </ul>
        </label>
      </nav>
      <nav className="featured-category">
        <ul className="nav-row">
            <li className="nav-row-list"><Link to='/' className="nav-row-list-link">Shop</Link></li>
            <li className="nav-row-list"><Link to='/mens' className="nav-row-list-link">Men</Link></li>
            <li className="nav-row-list"><Link to='/womens' className="nav-row-list-link">Women</Link></li>
            <li className="nav-row-list"><Link to="/smartphones" className="nav-row-list-link">Smartphones</Link></li>
            <li className="nav-row-list"><Link to="/furniture" className="nav-row-list-link">Furniture</Link></li>
            <li className="nav-row-list"><Link to="/toys" className="nav-row-list-link">Toys</Link></li>
            <li className="nav-row-list"><Link to="/computing" className="nav-row-list-link">Computing</Link></li>
            <li className="nav-row-list"><Link to="/games" className="nav-row-list-link">Games</Link></li>
            <li className="nav-row-list"><Link to="/automotive" className="nav-row-list-link">Automotive</Link></li>
        </ul>
      </nav>
    </div>
    </>
  );
};

export default Navbar;
