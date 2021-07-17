package com.example.PneumoniaDetectionSystem.Controller;

import com.example.PneumoniaDetectionSystem.ExceptionsUtils.ResourceNotFoundException;
import com.example.PneumoniaDetectionSystem.Model.UserDetails;
import com.example.PneumoniaDetectionSystem.Repository.UserDetailsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
@CrossOrigin
public class UserDetailsController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    UserDetailsRepository userDetailsRepository;

    @PostMapping(value = "userDetails")
    public HttpStatus createUser(@RequestBody UserDetails userDetails) {
        userDetailsRepository.save(userDetails);
        return HttpStatus.CREATED;
    }

    @GetMapping(value = "userDetails")
    public List<UserDetails> getAllUserDetails() {
        return userDetailsRepository.findAll();
    }

    @GetMapping(value = "userDetails/{id}")
    public ResponseEntity<UserDetails> getUserDetailsByID(@PathVariable(value = "id") Long userDetailsID) throws ResourceNotFoundException {
        UserDetails userDetails = userDetailsRepository.findById(userDetailsID).orElseThrow(
                () -> new ResourceNotFoundException("User ID:" + userDetailsID + "not found!")
        );
        return ResponseEntity.ok().body(userDetails);
    }

    @PutMapping (value = "userDetails/{id}")
    public ResponseEntity<UserDetails> updateUserDetails(@PathVariable(value = "id") Long userDetailsID,
                                                         @RequestBody UserDetails userDetails)
            throws ResourceNotFoundException {

        UserDetails user = userDetailsRepository.findById(userDetailsID).orElseThrow(
                () -> new ResourceNotFoundException("User ID:" + userDetailsID + "not found!"));

        user.setName(userDetails.getName());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());

        final UserDetails updatedUserDetails = userDetailsRepository.save(user);
        return ResponseEntity.ok().body(updatedUserDetails);
    }

    @DeleteMapping(path = "userDetails/{id}")
    public Map<String, Boolean> deleteUserDetails(@PathVariable(value = "id") Long userDetailsID) throws ResourceNotFoundException {
        UserDetails userDetails = userDetailsRepository.findById(userDetailsID).orElseThrow(
                () -> new ResourceNotFoundException("User ID:" + userDetailsID + "not found!"));

        userDetailsRepository.delete(userDetails);
        Map<String, Boolean> response = new HashMap<>();
        response.put("User ID: " + userDetailsID + "deleted", Boolean.TRUE );

        return response;
    }
}
