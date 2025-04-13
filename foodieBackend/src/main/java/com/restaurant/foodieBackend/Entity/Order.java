package com.restaurant.foodieBackend.Entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.restaurant.foodieBackend.Status.orderStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Order {
    @Id
    private String id;
    private String customerName;
    private String mobile;
    private int tableNumber;
    private List<FoodItem> foodItems;
    private double total;
    private orderStatus status;
    private String assignedWaiterId;    
}
