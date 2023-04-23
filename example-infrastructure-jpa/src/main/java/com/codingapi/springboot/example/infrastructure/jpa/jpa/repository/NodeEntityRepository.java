package com.codingapi.springboot.example.infrastructure.jpa.jpa.repository;

import com.codingapi.springboot.example.infrastructure.jpa.entity.NodeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NodeEntityRepository extends JpaRepository<NodeEntity,Integer> {

    Page<NodeEntity> findAllByNameLike(String name, PageRequest pageRequest);

}
