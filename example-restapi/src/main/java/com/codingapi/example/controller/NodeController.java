package com.codingapi.example.controller;

import com.codingapi.example.domain.Node;
import com.codingapi.example.infrastructure.jpa.convert.NodeConvertor;
import com.codingapi.example.infrastructure.jpa.jpa.repository.NodeEntityRepository;
import com.codingapi.example.service.NodeService;
import com.codingapi.springboot.framework.dto.request.IdRequest;
import com.codingapi.springboot.framework.dto.request.PageRequest;
import com.codingapi.springboot.framework.dto.response.MultiResponse;
import com.codingapi.springboot.framework.dto.response.Response;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/node")
@AllArgsConstructor
public class NodeController {

    private final NodeService nodeService;

    private final NodeEntityRepository nodeEntityRepository;

    @GetMapping("/list")
    public MultiResponse<Node> list(PageRequest request) {
        return MultiResponse.of(nodeEntityRepository.pageRequest(request).map(NodeConvertor::convert));
    }

    @PostMapping("/save")
    public Response save(@RequestBody Node node) {
        nodeService.save(node);
        return Response.buildSuccess();
    }

    @PostMapping("/del")
    public Response del(@RequestBody IdRequest request) {
        nodeService.delete(request.getIntId());
        return Response.buildSuccess();
    }
}
