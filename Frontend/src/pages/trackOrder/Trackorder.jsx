import React, { useEffect, useState } from 'react'
import './Trackorder.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { assets } from '../../assets/assets';
const Trackorder = () => {

    const{tableNumber}=useParams();
    const[orders,setOrders]=useState([])

    useEffect(()=>{
        const fetchOrders= async ()=>{
            const response=await axios.get(`http://localhost:8080/order/tableNumber/${tableNumber}`)
            setOrders(response.data)
        }
        fetchOrders();
        const interval=setInterval(fetchOrders,10000)
        return ()=>clearInterval(interval)
    },[tableNumber])
  return (
    <div className='track-order'>
        <div className='order-card'>
            <h2>Order status for Table {tableNumber}</h2>
            {
                orders.map((item,index)=>(
                    <div key={index}className="orderStatus">
                        <p>Status : <b className={item.status==="DELIVERED" ? "oactive":""}>{item.status}</b></p>
                        {item.status==="DELIVERED" && 
                            <p className='thank-you'>Thank you! Your order has been delivered.</p>
                        }
                    </div>
                ))
            }
        </div>
        <div className="order-right">
            <img src={assets.tracking_icon} alt="" />
            <p>Track your order...!</p>
        </div>
    </div>
  )
}

export default Trackorder
