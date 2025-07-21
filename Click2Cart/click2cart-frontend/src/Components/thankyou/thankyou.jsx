import React from "react";
import "./thankyou.css";
import { Link } from "react-router-dom";

const ThankYou = (props) => {
    
  return (
    <div className="thankyou">
      <p className="thankyou-text">Thank you for shopping with us</p>
      <div className="thankyou-loadmore">
      <Link to='/' style={{ textDecoration: 'none' }}>Continue Shopping</Link>
      </div>
    </div>
  );
};

export default ThankYou;
