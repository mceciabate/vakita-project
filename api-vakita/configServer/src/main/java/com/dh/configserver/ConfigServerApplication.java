package com.dh.configserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.config.server.EnableConfigServer;
import org.springframework.cloud.context.config.annotation.RefreshScope;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Properties;

@SpringBootApplication
@EnableConfigServer
@RefreshScope
public class ConfigServerApplication {

	public static void main(String[] args){
		SpringApplication.run(ConfigServerApplication.class, args);

	}




}
