package com.codingapi.example.domain;

import com.codingapi.example.event.NodeEvent;
import com.codingapi.springboot.framework.event.EventPusher;
import jakarta.persistence.*;
import lombok.*;

/**
 * @author lorne
 * @since 1.0.0
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Node implements Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @Column(columnDefinition = "text")
    private String url;

    @SneakyThrows
    public void swap(Node target) {
        Node old = (Node) this.clone();
        this.url = target.getUrl();
        this.name = target.getName();
        EventPusher.push(new NodeEvent(old, this));
    }

}
