package com.qa.cake.controller;

import java.util.List;
import java.util.NoSuchElementException;

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

import com.qa.cake.domain.Cake;
import com.qa.cake.service.CakeService;

@RestController
@CrossOrigin
@RequestMapping("/index.html/")
public class CakeController {

	@Autowired
	private CakeService service;

	public CakeController(CakeService service) {
		this.service = service;
	}

	@PostMapping("/createCake")
	public ResponseEntity<Cake> createCake(@RequestBody Cake cake) {
		return new ResponseEntity<Cake>(service.create(cake), HttpStatus.CREATED);
	}

	@GetMapping("/getAllCakes")
	public ResponseEntity<List<Cake>> getAllCakes() {
		return ResponseEntity.ok(service.getAll());
	}

	@GetMapping("/getOne/{index}")
	public ResponseEntity<Cake> getCakeById(@PathVariable Long index) {
		try {
			return new ResponseEntity<Cake>(service.getById(index), HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getOneByName/{cakeName}")
	public ResponseEntity<Cake> getCakeByCakeName(@PathVariable String cakeName) {
		try {
			return new ResponseEntity<Cake>(service.getByCakeName(cakeName), HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/update/{index}")
	public ResponseEntity<Cake> updateCakeById(@PathVariable Long index, @RequestBody Cake cake) {
		try {
			return ResponseEntity.ok(service.update(index, cake));
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/remove/{index}")
	public ResponseEntity<Boolean> removeCharacter(@PathVariable Long index) {
		try {
			return ResponseEntity.ok(service.remove(index));
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
