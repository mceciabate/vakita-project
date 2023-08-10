package com.Tests;


import com.ExtentReport.ExtentFactory;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import io.restassured.RestAssured;
import org.json.simple.JSONObject;
import org.junit.jupiter.api.*;


import java.time.LocalDate;

import static io.restassured.RestAssured.given;
import static io.restassured.config.EncoderConfig.encoderConfig;


@TestMethodOrder(MethodOrderer.MethodName.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BackendApiVakitaTest {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/ExtentReport/Reports/BackendSmokeSuiteTest.html");
    static ExtentReports report;
    ExtentTest test;
    private String baseURLVakitas = "http://localhost:8080/api/v1/vakita";

    private String baseURLUsuarios = "http://localhost:8080/api/v1/usuarios/";


    @BeforeAll
    public void initReport(){
        report = ExtentFactory.getInstance();
        report.attachReporter(spark);
    }

    @Test
    @Tag("smoke")
    public void aCrearVakita(){
        test = report.createTest("Test de Crear Vakita");
        test.log(Status.INFO, "Inicia el Test");
        JSONObject vakita = new JSONObject();
        vakita.put("name", "una vakita");
        vakita.put("idCreatorUser", 1);
        vakita.put("description", "descripcion de la vakita");
        vakita.put( "imgURL", "la imagen");
        vakita.put( "totalAmount", 5000.0);
        vakita.put("cumulativeAmount", 0.0);
        vakita.put("creationDate", "2023-08-10");
        vakita.put("expirationDate", "2023-08-07");
        vakita.put("isActive", true);
        vakita.put("type", "normal");
        System.out.println(vakita.toJSONString());
        given().config(RestAssured.config().encoderConfig(encoderConfig().appendDefaultContentCharsetToContentTypeIfUndefined(false))).
                contentType("application/json")
                .body(vakita.toString())
                .when()
                .post(baseURLVakitas)
                .then()
                .assertThat()
                .statusCode(200);
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void bValidacionCrearVakita(){
        test = report.createTest("Test de Validar fecha de creacion Vakita");
        test.log(Status.INFO, "Inicia el Test");
        JSONObject vakita = new JSONObject();
        vakita.put("name", "una vakita");
        vakita.put("idCreatorUser", 1);
        vakita.put("description", "descripcion de la vakita");
        vakita.put( "imgURL", "la imagen");
        vakita.put( "totalAmount", 5000.0);
        vakita.put("cumulativeAmount", 0.0);
        vakita.put("creationDate", LocalDate.now().toString());
        vakita.put("expirationDate", LocalDate.now().toString());
        vakita.put("isActive", true);
        vakita.put("type", "normal");
        System.out.println(vakita.toJSONString());
        given().config(RestAssured.config().encoderConfig(encoderConfig().appendDefaultContentCharsetToContentTypeIfUndefined(false))).
                contentType("application/json")
                .body(vakita.toString())
                .when()
                .post(baseURLVakitas)
                .then()
                .assertThat()
                .statusCode(400);
        test.log(Status.PASS, "Se obtiene respuesta acorde al error");
    }

    @Test
    @Tag("smoke")
    public void cObtenerVakitaPorId(){
        test = report.createTest("Test de Obtener Vakita po Id");
        test.log(Status.INFO, "Inicia el Test");
        given()
               .pathParam("vakitaId", 1)
               .when()
               .get(baseURLVakitas+"/{vakitaId}")
               .then()
               .assertThat()
                .statusCode(200);
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void dDepositarSaldo(){
        test = report.createTest("Test de depositar dinero en una vakita");
        test.log(Status.INFO, "Inicia el Test");
        given()
                .queryParam("amount", 200.0)
                .queryParam("vakitaId", 1)
                .when()
                .put(baseURLVakitas+"/deposit")
                .then()
                .assertThat()
                .statusCode(200);
    }

    @Test
    @Tag("smoke")
    public void eInactivarUnaVakita(){
        test = report.createTest("Test Inactivar una vakita");
        test.log(Status.INFO, "Inicia el Test");
        given()
                .pathParam("vakitaId", 1)
                .when()
                .put(baseURLVakitas+"/inactive/{vakitaId}")
                .then()
                .assertThat()
                .statusCode(200);
    }

    @Test
    @Tag("smoke")
    public void fValidacionVakitaInactiva(){
        test = report.createTest("Test Validar que no se puede depositar dinero a una vakita");
        test.log(Status.INFO, "Inicia el Test");
        given()
                .queryParam("amount", 200.0)
                .queryParam("vakitaId", 1)
                .when()
                .put(baseURLVakitas+"/deposit")
                .then()
                .assertThat()
                .statusCode(400);

    }
//
//    @Test
//    @Tag("smoke")

    @AfterAll
    public void cerrarReporte(){

        report.flush();
    }





}
