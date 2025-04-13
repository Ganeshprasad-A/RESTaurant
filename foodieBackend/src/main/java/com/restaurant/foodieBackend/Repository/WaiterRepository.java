package com.restaurant.foodieBackend.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.restaurant.foodieBackend.Entity.Waiter;

public interface WaiterRepository extends MongoRepository<Waiter,String> {
    
}
