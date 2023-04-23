package com.codingapi.springboot.example.pojo;

import com.codingapi.springboot.framework.dto.request.PageRequest;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PageSearch extends PageRequest {

    private String name;
}
