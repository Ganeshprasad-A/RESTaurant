import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../components/context/StoreContext'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const navigate=useNavigate()
  const { cartItem, food_list, removeFromCart, getTotalCartAmount,setOrderDetails } = useContext(StoreContext)
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, index) => {
            if (cartItem[item._id] > 0) {
              return (
                <div key={index}>
                  <div  className="cart-item-title cart-items-item">
                    <img src={item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItem[item._id]}</p>
                    <p>${item.price * cartItem[item._id]}</p>
                    <p className='cross' onClick={() => removeFromCart(item._id)}>x</p>
                  </div>
                  <hr />
                </div>
              )
            }
          })
        }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Tax</p>
            <p>${getTotalCartAmount()===0?0:2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <b>${getTotalCartAmount()===0?0:getTotalCartAmount() + 2}</b>
          </div>
          <hr />
        </div>
        <button onClick={()=>{
              const orderItems=food_list
                .filter(item=>cartItem[item._id]>0)
                .map(item=>({
                  foodId:item._id,
                  name:item.name,
                  price:item.price,
                  quantity:cartItem[item._id]
                }))

                setOrderDetails(()=>({
                  items:orderItems,
                  totalAmount:getTotalCartAmount()+2
                }))
                navigate('/placeorder')
        }}
        >PROCEED TO CHECKOUT</button>
      </div>
    </div>
  )
}

export default Cart
