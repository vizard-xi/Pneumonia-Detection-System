package com.example.PneumoniaDetectionSystem.Controller;

import com.example.PneumoniaDetectionSystem.ExceptionsUtils.ResourceNotFoundException;
import com.example.PneumoniaDetectionSystem.Model.ClientDetails;
import com.example.PneumoniaDetectionSystem.Model.UserDetails;
import com.example.PneumoniaDetectionSystem.Repository.ClientDetailsRepository;
import com.example.PneumoniaDetectionSystem.Repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
@CrossOrigin
public class ClientDetailsController {

    @Autowired
    ClientDetailsRepository clientDetailsRepository;

    @Autowired
    UserDetailsRepository userDetailsRepository;

    @PostMapping(value = "userDetails/{id}/clientDetails")
    public ResponseEntity<ClientDetails> createClient(@PathVariable("id") Long userDetailsID,
                                      @RequestBody ClientDetails clientDetails) throws ResourceNotFoundException {

        Optional<UserDetails> user = userDetailsRepository.findById(userDetailsID);
        clientDetails.setUserDetails(user.orElseThrow(() -> new ResourceNotFoundException("User ID: " + userDetailsID + " not found!")));
        ClientDetails client = clientDetailsRepository.save(clientDetails);
        return  ResponseEntity.ok().body(client);
    }

    @GetMapping(value = "userDetails/clientDetails")
    public ResponseEntity<List<ClientDetails>> getClientDetails() {

        return ResponseEntity.ok(clientDetailsRepository.findAll());
    }

    @GetMapping(value = "userDetails/clientDetails/{id}")
    public ResponseEntity<ClientDetails> getClientDetailsByClientID (@PathVariable(value = "id") Long clientID)
            throws ResourceNotFoundException {
        Optional<ClientDetails> clientDetails = clientDetailsRepository.findById(clientID);

        return ResponseEntity.ok(clientDetails
                .orElseThrow(() -> new ResourceNotFoundException("Client ID: " + clientID + " not found!")));
    }

    @PutMapping(value = "userDetails/clientDetails/{id}")
    public ResponseEntity<ClientDetails> updateClientDetails(
            @RequestBody ClientDetails clientDetails,
            @PathVariable(value = "id") Long clientID ) throws ResourceNotFoundException {

        Optional<UserDetails> user = userDetailsRepository.findById(clientDetails.getUserDetails().getId());
        Optional<ClientDetails> client = clientDetailsRepository.findById(clientID);

        clientDetails.setUserDetails(user.orElseThrow(() -> new ResourceNotFoundException("Client ID: " + clientID + " not found!")));
        clientDetails.setClientDetailsID(client
                .orElseThrow(() -> new ResourceNotFoundException("Client ID: " + clientID + " not found!"))
                .getClientDetailsID());
        ClientDetails updatedClientDetails = clientDetailsRepository.save(clientDetails);

        return ResponseEntity.ok().body(updatedClientDetails);
    }

    @DeleteMapping(value = "userDetails/clientDetails/{id}")
    public ResponseEntity<ClientDetails> deleteClientDetails(
                                                 @PathVariable(value = "id") Long clientID) throws ResourceNotFoundException {

        Optional<ClientDetails> client = clientDetailsRepository.findById(clientID);
        clientDetailsRepository.delete(client
                .orElseThrow(() -> new ResourceNotFoundException("Client ID: " + clientID + " not found!")));

        return ResponseEntity.noContent().build();
    }
}
