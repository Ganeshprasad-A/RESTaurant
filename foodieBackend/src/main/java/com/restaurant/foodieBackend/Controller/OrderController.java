package com.restaurant.foodieBackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.foodieBackend.Entity.Order;
import com.restaurant.foodieBackend.Service.OrderService;
import com.restaurant.foodieBackend.Status.orderStatus;

@RestController
@RequestMapping("/order")
@CrossOrigin("*")
public class OrderController {
    
    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestBody Order order)
    {
        return ResponseEntity.ok(orderService.placeOrder(order));
    }

    @GetMapping("/waiter/{waiterId}")
    public ResponseEntity<List<Order>> getOrdersForWaiter(@PathVariable String waiterId)
    {
        return ResponseEntity.ok(orderService.getOrdersForWaiter(waiterId));
    }

    @GetMapping("/waiter/{waiterId}/status/{status}")
    public ResponseEntity<List<Order>> getOrdersForWaiterByStatus(
        @PathVariable String waiterId,@PathVariable orderStatus status)
    {
        return ResponseEntity.ok(orderService.getOrdersForWaiterByStatus(waiterId, status));
    }

    @GetMapping("/tableNumber/{tableNumber}")
    public ResponseEntity<List<Order>> getOrdersByTableNumber(@PathVariable int tableNumber)
    {
        return ResponseEntity.ok(orderService.getOrdersByTableNumber(tableNumber));
    }

    @GetMapping("/orderByStatus/{status}")
    public ResponseEntity<List<Order>> getOrderByStatus(@PathVariable orderStatus status)
    {
        return ResponseEntity.ok(orderService.findOrdersByStatus(status));
    }

    @PutMapping("/{orderId}/status/{status}")
    public ResponseEntity<Order> updateOrderStatus(
        @PathVariable String orderId, 
        @PathVariable orderStatus status)
        {
            return ResponseEntity.ok(orderService.updateOrderStatus(orderId, status));
        }
}
