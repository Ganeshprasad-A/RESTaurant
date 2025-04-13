package com.restaurant.foodieBackend.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "Foodie")
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Data
public class Food {
    
    @Id
    private Long id;
    private String name;
    private double price;
    private String description;
    private String imageId;
}
