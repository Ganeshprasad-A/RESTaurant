package com.restaurant.foodieBackend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FoodDTO {
    private Long _id;
    private String name;
    private String image;
    private double price;
    private String description;
    private String category;
}
