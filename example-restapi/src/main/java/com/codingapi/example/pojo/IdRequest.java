package com.codingapi.example.pojo;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class IdRequest {

    private String id;


    public int getIntId(){
        return Integer.parseInt(id);
    }

    public Long getLongId(){
        return Long.parseLong(id);
    }


}
