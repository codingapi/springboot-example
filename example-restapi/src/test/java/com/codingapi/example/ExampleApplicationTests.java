package com.codingapi.example;

import com.codingapi.example.domain.Node;
import com.codingapi.example.repository.NodeRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

@SpringBootTest
@Slf4j
@Rollback(value = false)
class ExampleApplicationTests {

    @Autowired
    private NodeRepository nodeRepository;


    @Test
    @Transactional
    void save() {
        Node node = new Node(1,"node1","http://node1");
        nodeRepository.save(node);

        Assert.isTrue(node.getId() > 0, "nodeRepository save error.");
        log.info("id:{}", node.getId());
    }

    @Test
    void swap() {
        Node node1 = new Node(1,"node1","http://node1");
        Node node2 = new Node(1,"node2","http://node2");

        node1.swap(node2);

        Assert.isTrue(node1.getName().equals("node2"), "swap service error.");
        Assert.isTrue(node2.getName().equals("node2"), "swap service error.");
    }


}
