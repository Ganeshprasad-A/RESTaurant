package com.restaurant.foodieBackend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FoodItem {
    private String foodId;
    private String name;
    private int quantity;
    private double price;   
}
