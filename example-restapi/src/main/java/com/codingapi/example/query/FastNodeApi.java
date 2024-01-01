package com.codingapi.example.query;

import com.codingapi.example.infrastructure.jpa.entity.NodeEntity;
import com.codingapi.example.pojo.SearchRequest;
import com.codingapi.springboot.fast.annotation.FastController;
import com.codingapi.springboot.fast.annotation.FastMapping;
import com.codingapi.springboot.framework.dto.response.MultiResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMethod;

@FastController
public interface FastNodeApi {


    @PreAuthorize(value = "hasRole('ROLE_ADMIN')")
    @FastMapping(
            method = RequestMethod.GET,
            mapping = "/api/node/fastQuery",
            value = "select d from NodeEntity d where name = :name",
            countQuery = "select count(d) from NodeEntity d where name = :name")
    MultiResponse<NodeEntity> fastQuery(SearchRequest request);



}
