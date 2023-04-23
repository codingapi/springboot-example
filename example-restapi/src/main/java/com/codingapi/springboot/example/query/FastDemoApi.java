package com.codingapi.springboot.example.query;

import com.codingapi.springboot.example.infrastructure.jpa.entity.DemoEntity;
import com.codingapi.springboot.example.infrastructure.jpa.pojo.PageSearch;
import com.codingapi.springboot.fast.annotation.FastController;
import com.codingapi.springboot.fast.annotation.FastMapping;
import com.codingapi.springboot.framework.dto.response.MultiResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMethod;

@FastController
public interface FastDemoApi {


    @PreAuthorize(value = "hasRole('ROLE_ADMIN')")
    @FastMapping(
            method = RequestMethod.GET,
            mapping = "/api/demo/findByName1",
            value = "select d from DemoEntity d where name = :name",
            countQuery = "select count(d) from DemoEntity d where name = :name")
    MultiResponse<DemoEntity> findByName1(PageSearch query);



    @PreAuthorize(value = "hasRole('ROLE_USER')")
    @FastMapping(
            method = RequestMethod.GET,
            mapping = "/api/demo/findByName2",
            value = "select d from DemoEntity d where name = :name",
            countQuery = "select count(d) from DemoEntity d where name = :name")
    MultiResponse<DemoEntity> findByName2(PageSearch query);

}
