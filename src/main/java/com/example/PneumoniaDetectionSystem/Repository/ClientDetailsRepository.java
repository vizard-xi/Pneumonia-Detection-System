package com.example.PneumoniaDetectionSystem.Repository;

import com.example.PneumoniaDetectionSystem.Model.ClientDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClientDetailsRepository extends JpaRepository<ClientDetails, Long> {
//    List<ClientDetails> findByID(Long clientDetailsID);
//    List<ClientDetails> findByClientIDAndUserDetailsID(Long clientDetailsID, Long userDetailsID);
}
