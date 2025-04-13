import React, { useEffect, useState } from 'react'
import './waiter.css'
import axios from 'axios'
import OrdersInWaiter from './OrdersInWaiter'
import { assets } from '../../assets/assets'


const waiter = () => {

    const[waiters,setWaiters]=useState([])

    useEffect(()=>{
        const fetchData= async()=>{
            const response= await axios.get(`http://localhost:8080/waiter/allWaiters`)
            setWaiters(response.data)
        }
        fetchData();
        const interval=setInterval(fetchData,10000);
        return ()=>clearInterval(interval)
    },[])

  return (
    <div className="waiter-main">
          <div className='waiter-dashboard'>
              {
                  waiters.map((waiter, index) => (
                      <OrdersInWaiter key={index} waiterId={waiter.id} />
                  ))
              }
          </div>
          <div className="waiter-image">
              <img src={assets.courier_icon} alt="" />
          </div>
    </div> 
   
  )
}

export default waiter
