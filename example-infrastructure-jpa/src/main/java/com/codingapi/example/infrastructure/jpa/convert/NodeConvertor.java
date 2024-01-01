package com.codingapi.example.infrastructure.jpa.convert;

import com.codingapi.example.domain.Node;
import com.codingapi.example.infrastructure.jpa.entity.NodeEntity;
import com.codingapi.springboot.fast.manager.EntityManagerContent;

public class NodeConvertor {

    public static Node convert(NodeEntity entity){
        if(entity==null){
            return null;
        }

        Node node = new Node();
        node.setUrl(entity.getUrl());
        node.setName(entity.getName());
        node.setId(entity.getId());

        EntityManagerContent.getInstance().detach(entity);
        return node;
    }

    public static NodeEntity convert(Node node){
        if(node==null){
            return null;
        }

        NodeEntity entity = new NodeEntity();
        entity.setUrl(node.getUrl());
        entity.setName(node.getName());
        entity.setId(node.getId());
        return entity;
    }
}
