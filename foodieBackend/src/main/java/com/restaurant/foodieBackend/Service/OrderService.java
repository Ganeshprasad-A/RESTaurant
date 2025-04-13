package com.restaurant.foodieBackend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.foodieBackend.Entity.Order;
import com.restaurant.foodieBackend.Entity.Waiter;
import com.restaurant.foodieBackend.Repository.OrderRepository;
import com.restaurant.foodieBackend.Repository.WaiterRepository;
import com.restaurant.foodieBackend.Status.orderStatus;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private WaiterRepository waiterRepository;


    public Order placeOrder(Order order)
    {
        Waiter waiter = waiterRepository.findAll().stream()
                        .filter(w->w.getAssignedTables().contains(order.getTableNumber()))
                        .findFirst()
                        .orElseThrow(()->new RuntimeException("No waiter Assigned to this table"));
        order.setAssignedWaiterId(waiter.getId());
        order.setStatus(orderStatus.PLACED);
        return orderRepository.save(order);
    }
    public List<Order> getOrdersForWaiter(String waiterId)
    {
        return orderRepository.findByAssignedWaiterId(waiterId);
    }
    public List<Order> getOrdersForWaiterByStatus(String waiterId,orderStatus status)
    {
        return orderRepository.findByAssignedWaiterIdAndStatus(waiterId, status);
    }
    public List<Order> getOrdersByTableNumber(int tableNumber )
    {
        return orderRepository.findByTableNumber(tableNumber);
    }
    public Order updateOrderStatus(String orderId, orderStatus newStatus)
    {
        Order newOrder=orderRepository.findById(orderId)
                        .orElseThrow(()->new RuntimeException("Order not found"));
        newOrder.setStatus(newStatus);
        return orderRepository.save(newOrder);
    }

    public List<Order> findOrdersByStatus(orderStatus status)
    {
        return orderRepository.findByStatus(status);
    }
}
