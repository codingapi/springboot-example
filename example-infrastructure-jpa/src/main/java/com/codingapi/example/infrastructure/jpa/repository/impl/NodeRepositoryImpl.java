package com.codingapi.example.infrastructure.jpa.repository.impl;

import com.codingapi.example.domain.Node;
import com.codingapi.example.infrastructure.jpa.convert.NodeConvertor;
import com.codingapi.example.infrastructure.jpa.entity.NodeEntity;
import com.codingapi.example.infrastructure.jpa.jpa.repository.NodeEntityRepository;
import com.codingapi.example.repository.NodeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class NodeRepositoryImpl implements NodeRepository {

    private final NodeEntityRepository nodeEntityRepository;

    @Override
    public void save(Node node) {
        NodeEntity entity = nodeEntityRepository.save(NodeConvertor.convert(node));
        node.setId(entity.getId());
    }

    @Override
    public void delete(int id) {
        nodeEntityRepository.deleteById(id);
    }
}
