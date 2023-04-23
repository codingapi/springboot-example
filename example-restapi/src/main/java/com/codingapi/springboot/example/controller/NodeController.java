package com.codingapi.springboot.example.controller;

import com.codingapi.springboot.example.entity.Node;
import com.codingapi.springboot.example.jpa.NodeRepository;
import com.codingapi.springboot.example.pojo.IdIntRequest;
import com.codingapi.springboot.example.pojo.PageSearch;
import com.codingapi.springboot.framework.dto.response.MultiResponse;
import com.codingapi.springboot.framework.dto.response.Response;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/server")
@AllArgsConstructor
public class NodeController {

    private final NodeRepository nodeRepository;

    @GetMapping("/list")
    public MultiResponse<Node> list(PageSearch pageSearch) {
        return MultiResponse.of(nodeRepository.findAll(pageSearch));
    }

    @PostMapping("/save")
    public Response save(@RequestBody Node node) {
        nodeRepository.save(node);
        return Response.buildSuccess();
    }

    @PostMapping("/del")
    public Response del(@RequestBody IdIntRequest request) {
        nodeRepository.deleteById(request.getId());
        return Response.buildSuccess();
    }
}
