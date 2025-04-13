package com.restaurant.foodieBackend.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.restaurant.foodieBackend.Entity.Order;
import com.restaurant.foodieBackend.Status.orderStatus;

public interface OrderRepository extends MongoRepository<Order,String> {
    List<Order> findByAssignedWaiterIdAndStatus(String waiterId,orderStatus status);
    List<Order> findByAssignedWaiterId(String waiterId);
    List<Order> findByTableNumber(int tableNumber);
    List<Order> findByStatus(orderStatus status);
}
