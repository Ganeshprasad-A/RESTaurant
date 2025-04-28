package com.restaurant.foodieBackend.Controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.io.IOUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.client.gridfs.model.GridFSFile;
import com.restaurant.foodieBackend.Entity.Food;
import com.restaurant.foodieBackend.Entity.FoodDTO;
import com.restaurant.foodieBackend.Service.FoodService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin("*")
@RequestMapping("/food")
public class FoodController {
    @Autowired
    private FoodService foodService;

    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    private GridFsOperations gridFsOperations;

    @PostMapping("/add")
    public ResponseEntity<Food> addFoodItem(
            @RequestParam("id") Long id,
            @RequestParam("name") String name,
            @RequestParam("price") double price,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image,
            @RequestParam("category")String category) throws IOException {
        ObjectId imageId = gridFsTemplate.store(image.getInputStream(), image.getOriginalFilename(),
                image.getContentType());

        Food food = new Food();
        food.set_id(id);
        food.setName(name);
        food.setPrice(price);
        food.setDescription(description);
        food.setImage(imageId.toHexString());
        food.setCategory(category);

       

        return ResponseEntity.ok( foodService.saveFoodItem(food));
    }

    @GetMapping("/all")
    public List<FoodDTO> getAllFoodItems() {
        List<Food> foodItems = foodService.getAllFoodItems();
        return foodItems.stream().map(item -> {
            FoodDTO dto = new FoodDTO();
            dto.set_id(item.get_id());
            dto.setName(item.getName());
            dto.setPrice(item.getPrice());
            dto.setDescription(item.getDescription());
            dto.setCategory(item.getCategory());
            dto.setImage("/food/image/" + item.getImage());
            return dto;
        }).collect(Collectors.toList());
        
    }

    @GetMapping("/image/{id}")
    public void getImage(@PathVariable String id, HttpServletResponse response) throws IOException {
        GridFSFile file = gridFsTemplate.findOne(Query.query(Criteria.where("_id").is(id)));
        if (file != null) {
            response.setContentType(file.getMetadata().get("_contentType").toString());
            try (InputStream in = gridFsOperations.getResource(file).getInputStream()) {
                IOUtils.copy(in, response.getOutputStream());
                response.flushBuffer();
            }
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Image not found");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFoodById(@PathVariable Long id)
    {
        boolean delete=foodService.deleteFoodById(id);
        if(delete)
        {
            return ResponseEntity.ok("Food item deleted successfully!");
        }
        else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food item not found");
        }
    }
}
