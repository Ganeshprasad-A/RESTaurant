package com.restaurant.foodieBackend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;

import com.restaurant.foodieBackend.Entity.Food;
import com.restaurant.foodieBackend.Repository.FoodRepository;

@Service
public class FoodService {
    @Autowired
    private FoodRepository foodItemRepository;

    @Autowired
    private GridFsTemplate gridFsTemplate;

    public Food saveFoodItem(Food food) {
        return foodItemRepository.save(food);
    }

    public List<Food> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

    public boolean deleteFoodById(Long id)
    {
        Optional<Food> foodOptional=foodItemRepository.findById(id);
        if(foodOptional.isPresent())
        {
            Food food=foodOptional.get();
            foodItemRepository.deleteById(id);
            if(food.getImage()!=null)
            {
                gridFsTemplate.delete(Query.query(Criteria.where("_id").is(food.getImage())));
            }
            return true;
        }
        return false;
    }
}
