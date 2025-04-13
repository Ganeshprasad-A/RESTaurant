import React, { useEffect, useState } from 'react'
import './Admin.css'
import axios from 'axios'
import { updateOrderStatus } from '../../components/Api/api'
import { assets } from '../../assets/assets'

const Admin = () => {

    const[orders,setOrders]=useState([])

    useEffect(()=>{
        const fetchOrder= async()=>{
            const response = await axios.get("http://localhost:8080/order/orderByStatus/IN_KITCHEN")
            console.log(response)
            setOrders(response.data)
        }
        fetchOrder();
        const interval=setInterval(fetchOrder,1000)
        return ()=>clearInterval(interval)

    },[])

    const handleStatus= async(orderId)=>
    {
        await updateOrderStatus(orderId, 'READY_TO_SERVE');
    }

  return (
    <div className="admin-page">
        <div className='admin-card'>
        {
            orders.map((order,index)=>(
                <div key={index} className="card">
                    <h4>ORDER_ID : {order.id}</h4>
                    <p>CUSTOMER_NAME : {order.customerName}</p>
                    <p>TABLE_NUMBER : {order.tableNumber}</p>
                    <p>STATUS : {order.status}</p>
                    <p><strong>ITEMS:</strong></p>
                    <ul>
                        {order.foodItems.map((item, index) => (
                            <li key={index}>
                               <strong>{item.name} x {item.quantity}</strong> 
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={()=>handleStatus(order.id)}
                    >READY_TO_SERVE</button>
                </div>
            ))
        }
    </div>
    <div className="admin-image">
        <img src={assets.admin_icon} alt="" />
    </div>
    </div>
    
  )
}

export default Admin
