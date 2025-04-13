package com.restaurant.foodieBackend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.foodieBackend.Entity.Waiter;
import com.restaurant.foodieBackend.Repository.WaiterRepository;


@Service
public class WaiterService {
    
    @Autowired
    private WaiterRepository waiterRepository;

    public List<Waiter> getAllWaiters()
    {
        return waiterRepository.findAll();
    }
}
