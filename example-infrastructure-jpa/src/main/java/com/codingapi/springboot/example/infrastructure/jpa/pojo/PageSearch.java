package com.codingapi.springboot.example.infrastructure.jpa.pojo;

import com.codingapi.springboot.framework.dto.request.PageRequest;
import lombok.Getter;
import lombok.Setter;
import org.springframework.util.StringUtils;

@Setter
@Getter
public class PageSearch extends PageRequest {

    private String name;

    public String getLikeName(){
        if(StringUtils.hasText(name)) {
            return "%" + name + "%";
        }
        return "%";
    }
}
