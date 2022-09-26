package com.codingapi.springboot.example.infrastructure.jpa.jpa.repository;

import com.codingapi.springboot.example.infrastructure.jpa.entity.DemoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DemoEntityRepository extends JpaRepository<DemoEntity, Integer> {


}
