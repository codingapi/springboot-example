package com.codingapi.springboot.example.jpa;

import com.codingapi.springboot.example.entity.Node;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NodeRepository extends JpaRepository<Node,Integer> {

}
