import React, { useEffect, useState } from 'react'
import './Admin.css'
import axios from 'axios'
import { addFood, updateOrderStatus } from '../../components/Api/api'
import { assets } from '../../assets/assets'

const Admin = () => {

    const[orders,setOrders]=useState([])
    const[formData,setFormData]=useState({
       "id": null,
        "name": "",
        "image": null,
        "price": null,
        "description": "",
        "category":""
    })
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
    const handleFoodSubmit= async (e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append('id',formData.id)
        formdata.append('name',formData.name)
        formdata.append('image',formData.image)
        formdata.append('price',formData.price)
        formdata.append('description',formData.description)
        formdata.append('category',formData.category)

        const response=await addFood(formdata)
        if(response)
            alert('food item added')

    }
    const handleStatus= async(orderId)=>
    {
        await updateOrderStatus(orderId, 'READY_TO_SERVE');
    }

  return (
    <div className="admin-main">
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
    </div >
       <div className="food-add">
              <form onSubmit={handleFoodSubmit} className="food-input">
                  <table>
                      <tbody>
                          <tr>
                              <td><label htmlFor="food-id">FoodID</label></td>
                              <td className='value'><input id="food-id" placeholder="Enter the Food Id" type="text" className="food-id" onChange={(e) => setFormData({ ...formData, 'id': parseInt(e.target.value) })} />
                              </td>
                          </tr>
                          <tr>
                              <td><label htmlFor="food-name">FoodNAME</label></td>
                              <td><input id="food-name" placeholder="Enter the Food Name" type="text" className="food-name" onChange={(e) => setFormData({ ...formData, 'name':e.target.value })} />
                              </td>
                          </tr>
                          <tr>
                              <td><label htmlFor="food-image">FoodIMAGE</label></td>
                              <td><input id="food-image" type="file" className="food-image" onChange={(e) => setFormData({ ...formData, 'image':e.target.files[0]})} />
                              </td>
                          </tr>
                          <tr>
                              <td><label htmlFor="food-price">FoodPRICE</label></td>
                              <td><input id="food-price" type="text" placeholder="Enter the Price"className="food-price" onChange={(e) => setFormData({ ...formData, 'price':parseInt(e.target.value)})} />
                              </td>
                          </tr>
                          <tr>
                              <td><label htmlFor="food-description">FoodDESCRIPTION</label></td>
                              <td><input id="food-description" placeholder="Enter the Food Description" type="text" className="food-description" onChange={(e) => setFormData({ ...formData, 'description':e.target.value })} />
                              </td>
                          </tr>
                          <tr>
                              <td><label htmlFor="food-category">FoodCATEGORY</label></td>
                              <td><input id="food-category" placeholder="Enter the Food Category" type="text" className="food-category" onChange={(e) => setFormData({ ...formData, 'category':e.target.value })} />
                              </td>
                          </tr>
                          <tr>
                              <td><button>ADD FOOD</button></td>
                          </tr>
                      </tbody>
                  </table>
              </form>
       </div>
    </div>
  )
}

export default Admin
