package com.codingapi.springboot.example.infrastructure.jpa.entity;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Setter
@Getter
@Entity
@Table(name = "t_demo")
public class DemoEntity {

    @Id
    private Integer id;

    private String name;


}
