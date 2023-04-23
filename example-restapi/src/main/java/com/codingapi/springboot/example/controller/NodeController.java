package com.codingapi.springboot.example.controller;

import com.codingapi.springboot.example.infrastructure.jpa.entity.NodeEntity;
import com.codingapi.springboot.example.infrastructure.jpa.jpa.repository.NodeEntityRepository;
import com.codingapi.springboot.example.infrastructure.jpa.pojo.IdIntRequest;
import com.codingapi.springboot.example.infrastructure.jpa.pojo.PageSearch;
import com.codingapi.springboot.framework.dto.response.MultiResponse;
import com.codingapi.springboot.framework.dto.response.Response;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/server")
@AllArgsConstructor
public class NodeController {

    private final NodeEntityRepository nodeEntityRepository;

    @GetMapping("/list")
    public MultiResponse<NodeEntity> list(PageSearch pageSearch) {
        return MultiResponse.of(nodeEntityRepository.findAllByNameLike(pageSearch.getLikeName(), pageSearch));
    }

    @PostMapping("/save")
    public Response save(@RequestBody NodeEntity nodeEntity) {
        nodeEntityRepository.save(nodeEntity);
        return Response.buildSuccess();
    }

    @PostMapping("/del")
    public Response del(@RequestBody IdIntRequest request) {
        nodeEntityRepository.deleteById(request.getId());
        return Response.buildSuccess();
    }
}
