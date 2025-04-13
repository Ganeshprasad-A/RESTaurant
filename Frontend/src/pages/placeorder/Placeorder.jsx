import React, { useState, useContext } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../components/context/StoreContext'
import { placeOrder } from '../../components/Api/api'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'


const Placeorder = () => {
  const navigate = useNavigate()
  const { orderDetails, setCartItem } = useContext(StoreContext)
  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    tableNumber: ''
  })
  const{getTotalCartAmount}=useContext(StoreContext)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleOrder = async () => {
    const payLoad = {
      ...formData,
      foodItems: orderDetails.items,
      total: orderDetails.totalAmount
    }
    const res = await placeOrder(payLoad)
    const tableNo = res.data.tableNumber
    alert("Order has been placed successfully")
    setFormData({
      customerName: '',
      mobile: '',
      tableNumber: ''
    })
    setCartItem([])
    navigate(`/track-order/${tableNo}`);
  }

  return (
    <div className='placeorder' id='placeorder'>
      <div className="left">
        <div className='image-title'>
          <img src={assets.parcel_icon} alt="" />
          <b>ORDER CONFIRMATION</b>
         
        </div>
        <input type="text" placeholder="enter your name" className="userDet" name="customerName" onChange={handleChange} value={formData.customerName} />
        <input type="text" placeholder="enter your contact no." className="userDet" name="mobile" onChange={handleChange} value={formData.mobile} />
        <input type="number" placeholder="enter the tableNumber" className="userDet" name="tableNumber" onChange={handleChange} value={formData.tableNumber} />
        <button onClick={handleOrder}
        >PlaceOrder</button>
      </div>
      <div className="right-section">
        <div className="image-title">
              <img src={assets.bag_icon} alt="" />
             <h2>CART DETAILS</h2>
        </div>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>${getTotalCartAmount()}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Tax</p>
          <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Total</p>
          <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
        </div>
        <hr />
        <button onClick={()=>navigate('/cart')}>Back to Cart</button>
      </div>
    </div>
  )
}

export default Placeorder
