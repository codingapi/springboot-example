package com.codingapi.springboot.example.controller;

import com.codingapi.springboot.example.infrastructure.jpa.entity.NodeEntity;
import com.codingapi.springboot.fast.mapping.MvcMappingRegister;
import com.codingapi.springboot.fast.mapping.SQLMapping;
import com.codingapi.springboot.fast.mapping.ScriptMapping;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/open/mvc")
@AllArgsConstructor
public class MvcController {


    private final MvcMappingRegister mvcMappingRegister;


    @PostMapping("/hqlTest")
    public void hqlTest()  {
        String mapping = "/open/test/hqlTest";
        RequestMethod requestMethod = RequestMethod.GET;
        SQLMapping sqlMapping =  SQLMapping.hqlMapping(mapping, requestMethod,
                "from NodeEntity", NodeEntity.class);
        mvcMappingRegister.addMapping(sqlMapping);
    }


    @PostMapping("/sqlTest")
    public void sqlTest()  {
        String mapping = "/open/test/sqlTest";
        RequestMethod requestMethod = RequestMethod.GET;
        SQLMapping sqlMapping =  SQLMapping.jdbcMapMapping(mapping, requestMethod,
                "select * from t_node");
        mvcMappingRegister.addMapping(sqlMapping);
    }


    @PostMapping("/scriptTest")
    public void scriptTest()  {
        String mapping = "/open/test/scriptTest";
        RequestMethod requestMethod = RequestMethod.GET;
        String script = """
                    var sql = "select * from t_node";
                    var result = $jdbc.queryForList(sql);
                    return result; 
                """;

        ScriptMapping scriptMapping = new ScriptMapping(mapping,requestMethod,script);
        mvcMappingRegister.addMapping(scriptMapping);
    }

    @PostMapping("/removeSqlTest")
    public void removeSqlTest()  {
        String mapping = "/open/test/sqlTest";
        RequestMethod requestMethod = RequestMethod.GET;
        mvcMappingRegister.removeMapping(mapping,requestMethod);
    }


    @PostMapping("/removeHqlTest")
    public void removeHqlTest()  {
        String mapping = "/open/test/hqlTest";
        RequestMethod requestMethod = RequestMethod.GET;
        mvcMappingRegister.removeMapping(mapping,requestMethod);
    }

    @PostMapping("/removeScriptTest")
    public void removeScriptTest()  {
        String mapping = "/open/test/scriptTest";
        RequestMethod requestMethod = RequestMethod.GET;
        mvcMappingRegister.removeMapping(mapping,requestMethod);
    }

}
