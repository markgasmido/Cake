package com.qa.cake.domain;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Cake { 
	//Attributes
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String cakeName;
	private String cakeDescription;
	private String cakeURL;
	
	public Cake(Long id, String cakeName, String cakeDescription, String cakeURL) {
		super();
		this.id = id;
		this.cakeName = cakeName;
		this.cakeDescription = cakeDescription;
		this.cakeURL = cakeURL;
	}

	public Cake(String cakeName, String cakeDescription, String cakeURL) {
		super();
		this.cakeName = cakeName;
		this.cakeDescription = cakeDescription;
		this.cakeURL = cakeURL;
	}
	
	public Cake() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCakeName() {
		return cakeName;
	}

	public void setCakeName(String cakeName) {
		this.cakeName = cakeName;
	}

	public String getCakeDescription() {
		return cakeDescription;
	}

	public void setCakeDescription(String cakeDescription) {
		this.cakeDescription = cakeDescription;
	}

	public String getCakeURL() {
		return cakeURL;
	}

	public void setCakeURL(String cakeURL) {
		this.cakeURL = cakeURL;
	}
	
	
	
	
	
	
}
