import React, { useEffect, useState } from 'react';
import { getOrdersforWaiterByStatus, updateOrderStatus } from '../../components/Api/api'
import './OrdersInWaiter.css'
const OrdersInWaiter = ({ waiterId }) => {
  const [placedOrders, setPlacedOrders] = useState([]);
  const [readyOrders, setReadyOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const placedRes = await getOrdersforWaiterByStatus(waiterId, 'PLACED');
      const readyRes = await getOrdersforWaiterByStatus(waiterId, 'READY_TO_SERVE');
      setPlacedOrders(placedRes.data);
      setReadyOrders(readyRes.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  const handleSendToKitchen = async (orderId) => {
    await updateOrderStatus(orderId, 'IN_KITCHEN');
    fetchOrders();
  };

  const handleDeliverOrder = async (orderId) => {
    await updateOrderStatus(orderId, 'DELIVERED');
    fetchOrders();
  };

  return (
    <div className='waiter'>
      <section className='waiter-order'>
        <div className="waiter-title">
          <h2>Waiter {waiterId}</h2>
          <h2> Orders to be Sent to Kitchen </h2>
        </div>
        {placedOrders.length === 0 ? (
          <p className='no-order'>No orders to be placed.</p>
        ) : (
          placedOrders.map(order => (
            <div className="waiter-order-kitchen" key={order.id} >
              <h4>Order ID: {order.id}</h4>
              <p>Customer: {order.customerName}</p>
              <p>Phone: {order.mobile}</p>
              <p>Table No: {order.tableNumber}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.foodItems.map((item, index) => (
                  <li key={index}>
                    {item.name} x {item.quantity} = ₹{item.quantity * item.price}
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <button onClick={() => handleSendToKitchen(order.id)}>Send to Kitchen</button>
            </div>
          ))
        )}
      </section>
      <section className='waiter-order' >
        <div className="waiter-title">
           <h2>Waiter {waiterId}</h2>
            <h2>Orders Ready to Deliver</h2>
        </div>
        {readyOrders.length === 0 ? (
          <p className='no-order'>No orders ready to deliver.</p>
        ) : (
          readyOrders.map(order => (
            <div className='waiter-order-customer' key={order.id} >
              <h4>Order ID: {order.id}</h4>
              <p>Customer: {order.customerName}</p>
              <p>Table No: {order.tableNumber}</p>
              <ul>
                {order.foodItems.map((item, index) => (
                  <li key={index}>
                    {item.name} x {item.quantity}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleDeliverOrder(order.id)}>Mark as Delivered</button>
            </div>
          ))
        )}
      </section>
    </div>
  );
};


export default OrdersInWaiter;
