package com.Tests;

import com.ExtentReport.ExtentFactory;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.json.simple.JSONObject;
import org.junit.Assert;
import org.junit.jupiter.api.*;

import static io.restassured.RestAssured.given;
import static io.restassured.config.EncoderConfig.encoderConfig;


@TestMethodOrder(MethodOrderer.MethodName.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BackendApiPaymentTest {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/ExtentReport/Reports/BackendPaymentSmokeSuiteTest.html");
    static ExtentReports report;
    ExtentTest test;

    private String baseURLTarjetas = "http://107.22.65.36:8080/api/v1/payment";

    @BeforeAll
    public void initReport(){
        report = ExtentFactory.getInstance();
        report.attachReporter(spark);
    }

    //VALIDACIONES DE LOS CÓDIGOS DE RESPUESTA PARA LA API DE PAYMENT
    @Test
    public String LogInUsuario(){
        JSONObject user = new JSONObject();
        user.put("email", "loreperez2003@gmail.com");
        user.put("password", "1234");
        test.log(Status.INFO, "Se configura la petición");
        Response response =given().config(RestAssured.config().encoderConfig(encoderConfig().appendDefaultContentCharsetToContentTypeIfUndefined(false))).
                contentType("application/json")
                .body(user.toString())
                .when()
                .post("http://107.22.65.36:8080/api/v1/usuarios/token");
        response
                .then()
                .assertThat()
                .statusCode(201);

        String token = response.body().jsonPath().getString("data.token");
        return token;
    }

    @Test
    @Tag("smoke")
    public void aCrearTarjeta(){
        test = report.createTest("Test de Crear Tarjeta de credito");
        test.log(Status.INFO, "Inicia el Test");
        JSONObject cc = new JSONObject();
        cc.put("alias", "Tarjeta visa");
        cc.put("cardNumber", "1234567894560000");
        cc.put("expirationDate", "2024-09-10");
        cc.put("cvv", "123");
        cc.put("userId", "2");
        test.log(Status.INFO, "Se configura la petición");
        given().config(RestAssured.config().encoderConfig(encoderConfig().appendDefaultContentCharsetToContentTypeIfUndefined(false))).
                contentType("application/json")
                .header("Authorization","Bearer" + LogInUsuario())
                .body(cc.toString())
                .when()
                .post(baseURLTarjetas)
                .then()
                .assertThat()
                .statusCode(200);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void bObtenerTarjetaPorId(){
        test = report.createTest("Test de Obtener Tarjeta por Id");
        test.log(Status.INFO, "Inicia el Test");
        test.log(Status.INFO, "Se configura la petición");
        given()
                .pathParam("id", 1)
                .header("Authorization","Bearer" + LogInUsuario())
                .when()
                .get(baseURLTarjetas+"/{id}")
                .then()
                .assertThat()
                .statusCode(200);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void cObtenerTarjetasDeUsuario(){
        test = report.createTest("Test de Obtener las Tarjetas de un usuario");
        test.log(Status.INFO, "Inicia el Test");
        test.log(Status.INFO, "Se configura la petición");
        given()
                .pathParam("userId", 4)
                .header("Authorization","Bearer" + LogInUsuario())
                .when()
                .get(baseURLTarjetas+"/personal/{userId}")
                .then()
                .assertThat()
                .statusCode(200);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }
    @Test
    @Tag("smoke")
    public void dObtenerTarjetas(){
        test = report.createTest("Test de Obtener todas las Tarjetas");
        test.log(Status.INFO, "Inicia el Test");
        test.log(Status.INFO, "Se configura la petición");
        given()
                .header("Authorization","Bearer" + LogInUsuario())
                .when()
                .get(baseURLTarjetas)
                .then()
                .assertThat()
                .statusCode(200);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void eModificarAliasTarjeta(){
        test = report.createTest("Test de Modificar alias de la tarjeta de credito");
        test.log(Status.INFO, "Inicia el Test");
        test.log(Status.INFO, "Se configura la petición");
        given()
                .pathParam("id", 4)
                .queryParam("alias", "Mastercard gold")
                .header("Authorization","Bearer" + LogInUsuario())
                .when()
                .patch(baseURLTarjetas+"/alias/{id}")
                .then()
                .assertThat()
                .statusCode(200);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void fEliminarTarjetaPorId(){
        test = report.createTest("Test de Borrar Tarjeta por id");
        test.log(Status.INFO, "Inicia el Test");
        test.log(Status.INFO, "Se configura la petición");
        given()
                .pathParam("id", 50)
                .header("Authorization","Bearer" + LogInUsuario())
                .when()
                .delete(baseURLTarjetas+"/{id}")
                .then()
                .assertThat()
                .statusCode(200);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }
    @AfterAll
    public void cerrarReporte(){

        report.flush();
    }

}
