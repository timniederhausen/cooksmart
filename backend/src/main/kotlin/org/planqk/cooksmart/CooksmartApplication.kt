package org.planqk.cooksmart

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
@ComponentScan(basePackages = ["org.planqk.cooksmart", "org.planqk.cooksmart.api", "org.planqk.cooksmart.api.model"])
class CooksmartApplication

fun main(args: Array<String>) {
    runApplication<CooksmartApplication>(*args)
}
