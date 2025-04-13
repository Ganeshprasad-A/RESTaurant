package com.restaurant.foodieBackend.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.restaurant.foodieBackend.Entity.Food;

public interface FoodRepository extends MongoRepository<Food,Long> {
    
}
