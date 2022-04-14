package com.qa.cake.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qa.cake.domain.Cake;
import com.qa.cake.repository.CakeRepository;

@Service
public class CakeService {
	
	@Autowired
	private CakeRepository repository;
	
	public CakeService(CakeRepository repository) {
		this.repository = repository;
	}
	
	public Cake create(Cake cake) {
		return repository.save(cake);
	}
	
	public List<Cake> getAll(){
		return repository.findAll();
	}
	
	public Cake getById(Long id) {
		Optional<Cake> optionalCake = repository.findById(id);
		if(optionalCake.isPresent()) {
			return optionalCake.get();
		}
		return null;
	}
	
	public boolean remove(Long id) {
		repository.deleteById(id);
		return repository.existsById(id);
	}
	
	public Cake update(Long id, Cake updatedCake) {
		Optional<Cake> optionalCake = repository.findById(id);
		if(optionalCake.isPresent()) {
			Cake cake = optionalCake.get();
			cake.setCakeName(updatedCake.getCakeName());
			cake.setCakeDescription(updatedCake.getCakeDescription());
			cake.setCakeURL(updatedCake.getCakeURL());
			repository.saveAndFlush(optionalCake.get());
			return optionalCake.get();
		}
		return null;
	}
}
