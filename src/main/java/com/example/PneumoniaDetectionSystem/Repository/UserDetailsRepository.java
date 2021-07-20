package com.example.PneumoniaDetectionSystem.Repository;

import com.example.PneumoniaDetectionSystem.Model.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {

}
