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
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "2.2.6.RELEASE"
    id("io.spring.dependency-management") version "1.0.9.RELEASE"
    id("org.openapi.generator") version "4.3.0"
    war
    val kotlinVersion = "1.3.71"
    kotlin("jvm") version kotlinVersion
    kotlin("plugin.spring") version kotlinVersion
    kotlin("plugin.jpa") version kotlinVersion
}

group = "org.planqk"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

val developmentOnly by configurations.creating
configurations {
    runtimeClasspath {
        extendsFrom(developmentOnly)
    }
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-hateoas")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    providedRuntime("org.springframework.boot:spring-boot-starter-tomcat")

    // Kotlin stuff
    // TODO: Investigate a pure Kotlin JSON library (mochi?)
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

    // Swagger / OpenAPI
    implementation("org.springdoc:springdoc-openapi-ui:1.3.8")
    implementation("org.springdoc:springdoc-openapi-data-rest:1.3.8")
    implementation("org.springdoc:springdoc-openapi-kotlin:1.3.8")

    // Chosen DB: postgres
    runtimeOnly("org.postgresql:postgresql")

    // Debug tools (e.g. HAL browser/explorer)
    implementation("org.springframework.data:spring-data-rest-hal-explorer")
    developmentOnly("org.springframework.boot:spring-boot-devtools")

    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
    }
}

openApiGenerate {
    generatorName.set("typescript-angular")
    inputSpec.set("$rootDir/../cooksmart-v1.0.yaml")
    outputDir.set("$rootDir/../frontend/src/app/data")
    modelPackage.set("model")
    additionalProperties.set(mapOf("fileNaming" to "kebab-case"))
}

tasks.named<JavaCompile>("compileJava") {
    dependsOn("openApiGenerate")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "1.8"
    }
}
