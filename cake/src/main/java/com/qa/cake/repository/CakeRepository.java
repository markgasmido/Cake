package com.qa.cake.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.qa.cake.domain.Cake;

@Repository
public interface CakeRepository extends JpaRepository<Cake,Long>{ 

	Optional<Cake> findByCakeName(String cakeName);
	
}
