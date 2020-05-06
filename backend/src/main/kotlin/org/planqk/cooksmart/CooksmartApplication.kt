// Copyright 2020 Felix Burk, Tim Niederhausen
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package org.planqk.cooksmart

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Contact
import io.swagger.v3.oas.annotations.info.Info
import io.swagger.v3.oas.annotations.info.License
import io.swagger.v3.oas.annotations.servers.Server
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@SpringBootApplication
@OpenAPIDefinition(
        info = Info(
                title = "Cooksmart", version = "1.0",
                description = "Recipe management platform, realised as a pre-project for our SWT EnPro",
                license = License(
                        name = "Apache 2.0",
                        url = "http://www.apache.org/licenses/LICENSE-2.0.html"
                ),
                contact = Contact(
                        url = "https://github.com/timniederhausen/cooksmart",
                        name = "GitHub Repository"
                )
        ),
        servers = [
            Server(url = "https://cooksmart.today", description = "Live instance")
        ]
)
class CooksmartApplication {
    @Bean
    fun corsConfigurer(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/**")
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedOrigins(
                                "http://localhost:4200",
                                "http://cooksmart.today",
                                "https://cooksmart.today"
                        )
            }
        }
    }
}

fun main(args: Array<String>) {
    runApplication<CooksmartApplication>(*args)
}
