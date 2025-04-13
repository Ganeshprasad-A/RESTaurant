package com.restaurant.foodieBackend.Entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "waiters")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Waiter {
    
    @Id
    private String id;
    private String name;
    private List<Integer> assignedTables;

}
