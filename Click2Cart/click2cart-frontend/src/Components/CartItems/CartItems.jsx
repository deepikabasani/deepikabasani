import React, { useContext } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


const CartItems = () => {
  const navigate = useNavigate();
  const {products} = useContext(ShopContext);
  const {cartItems,removeFromCart,getTotalCartAmount, clearCart} = useContext(ShopContext);

  const user = JSON.parse(localStorage.getItem('user'));

  const handleProceedToCheckout = async () => {
    try {
    
      const cartData = []
      products.map((e)=>{
        if(cartItems[e.id]>0){
            cartData.push({
              productId: e.id,
              quantity: cartItems[e.id],
            })
        }
      })
      console.log(cartData)
      const response = await confirmOrder({
        user,
        cartData,
        totalAmount: getTotalCartAmount(),
      });
      
      if(response.success) {
        navigate('/thankyou');
      }
      console.log("Order confirmed successfully:", response);
      clearCart();
     
    } catch (error) {
      console.error("Error confirming the order:", error);
    }
  };

  // Function to make API call to confirm the order
  const confirmOrder = async (orderData) => {
    const apiUrl = "http://localhost:4000/confirmOrder"; // Update with your actual API URL

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Error confirming the order: ${response.statusText}`);
    }

    return response.json();
  };


  return (
    <>
      {Object.values(cartItems).every((value) => value === 0) ? (
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
          <div class="container">
            <div class="row">
              <div class="col-12 cartitems-down">
                <div class="cartitems-total">
                  <h1>Cart Totals</h1>
                  <div>
                    <div class="cartitems-total-item">
                      <p>Subtotal</p>
                      <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div class="cartitems-total-item">
                      <p>Shipping Fee</p>
                      <p>Free</p>
                    </div>
                    <hr />
                    <div class="cartitems-total-item">
                      <h3>Total</h3>
                      <h3>${getTotalCartAmount()}</h3>
                    </div>
                  </div>
                  <button
                    class="btn btn-primary"
                    onClick={handleProceedToCheckout}
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );  
};

export default CartItems;
