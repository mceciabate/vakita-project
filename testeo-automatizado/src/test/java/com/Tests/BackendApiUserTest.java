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
public class BackendApiUserTest {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/ExtentReport/Reports/BackendUsersSmokeSuiteTest.html");
    static ExtentReports report;
    ExtentTest test;

    private String baseURLUsuarios = "http://localhost:8080/api/v1/usuarios";


    @BeforeAll
    public void initReport(){
        report = ExtentFactory.getInstance();
        report.attachReporter(spark);
    }

    @Test
    @Tag("smoke")
    public void aCrearUsuario(){
        test = report.createTest("Test de Crear Usuario");
        test.log(Status.INFO, "Inicia el Test");
        JSONObject user = new JSONObject();
        user.put("name", "Ceciilia");
        user.put("lastName", "Abate");
        user.put("dni", "11111111");
        user.put("email", "mail@mail.com");
        user.put( "password", "password");
        user.put( "birthdate", "1994-05-01");
        given().config(RestAssured.config().encoderConfig(encoderConfig().appendDefaultContentCharsetToContentTypeIfUndefined(false))).
                contentType("application/json")
                .body(user.toString())
                .when()
                .post(baseURLUsuarios)
                .then()
                .assertThat()
                .statusCode(201);
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void bObtenerUserPorId(){
        test = report.createTest("Test de Obtener Usuario po Id");
        test.log(Status.INFO, "Inicia el Test");
        given()
                .pathParam("usuarioId", 1)
                .when()
                .get(baseURLUsuarios+"/{usuarioId}")
                .then()
                .assertThat()
                .statusCode(200);
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void cCambiarContrasenia(){
        test = report.createTest("Test Cambiar Contraseña usuario");
        test.log(Status.INFO, "Inicia el Test");
        JSONObject newPass = new JSONObject();
        newPass.put("password", "nuevapass");
        given().config(RestAssured.config().encoderConfig(encoderConfig().appendDefaultContentCharsetToContentTypeIfUndefined(false))).
                contentType("application/json")
                .pathParam("usuarioId", 6)
                .body(newPass.toString())
                .when()
                .patch(baseURLUsuarios+"/{usuarioId}")
                .then()
                .assertThat()
                .statusCode(200);
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @AfterAll
    public void cerrarReporte(){

        report.flush();
    }

}
