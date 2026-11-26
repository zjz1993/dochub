package com.dochub.backend.controller;

import com.dochub.backend.service.HelloService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
public class HelloController {
  @Resource
  private HelloService helloService;

  @GetMapping("/first")
  public String hello() {
    return helloService.sayHello();
  }
}
