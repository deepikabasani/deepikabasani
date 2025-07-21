import React, { useContext } from "react";
import "./orderItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";

const OrderItems = () => {
  const {products} = useContext(ShopContext);
  const {cartItems,removeFromCart,getTotalCartAmount, clearCart} = useContext(ShopContext);


  return (
    <>
       <div className="thankyou">
          <p className="thankyou-text">This page is under development</p>
          <div className="thankyou-loadmore">
            <Link to="/" style={{ textDecoration: "none" }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      {/* {Object.values(cartItems).every((value) => value === 0) ? (
        <div className="thankyou">
          <p className="thankyou-text">Your cart is empty!</p>
          <div className="thankyou-loadmore">
            <Link to="/" style={{ textDecoration: "none" }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="cartitems">
          <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          {products.map((e) => {
            if (cartItems[e.id] > 0) {
              return (
                <div key={e.id}>
                  <div className="cartitems-format">
                    <img
                      className="cartitems-product-icon"
                      src={e.image}
                      alt=""
                    />
                    <p cartitems-product-title>{e.name}</p>
                    <p>${e.new_price}</p>
                    <button className="cartitems-quatity">
                      {cartItems[e.id]}
                    </button>
                    <p>${e.new_price * cartItems[e.id]}</p>
                    <img
                      onClick={() => {
                        removeFromCart(e.id);
                      }}
                      className="cartitems-remove-icon"
                      src={cross_icon}
                      alt=""
                    />
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })}
          <div className="cartitems-down">
            <div className="cartitems-total">
              <h1>Cart Totals</h1>
              <div>
                <div className="cartitems-total-item">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <h3>Total</h3>
                  <h3>${getTotalCartAmount()}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );  
};

export default OrderItems;
