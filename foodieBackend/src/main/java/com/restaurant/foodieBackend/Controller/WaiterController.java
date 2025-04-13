package com.restaurant.foodieBackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.foodieBackend.Entity.Waiter;
import com.restaurant.foodieBackend.Service.WaiterService;


@RestController
@RequestMapping("waiter")
@CrossOrigin("*")
public class WaiterController {
    
    @Autowired
    private WaiterService waiterService;

    @GetMapping("/allWaiters")
    public ResponseEntity<List<Waiter>> getAllWaiters()
    {
        return ResponseEntity.ok(waiterService.getAllWaiters());
    }
}
