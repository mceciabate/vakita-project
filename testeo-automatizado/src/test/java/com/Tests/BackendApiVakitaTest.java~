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


import java.time.LocalDate;
import java.util.HashMap;

import static io.restassured.RestAssured.given;
import static io.restassured.config.EncoderConfig.encoderConfig;


@TestMethodOrder(MethodOrderer.MethodName.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BackendApiVakitaTest {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/ExtentReport/Reports/BackendVakitaSmokeSuiteTest.html");
    static ExtentReports report;
    ExtentTest test;
    private String baseURLVakitas = "http://107.22.65.36:8080/api/v1/vakita";

    @BeforeAll
    public void initReport(){
        report = ExtentFactory.getInstance();
        report.attachReporter(spark);
    }

    //VALIDACIONES DE LOS CÓDIGOS DE RESPUESTA PARA LA API DE VAKITAS

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
         Assert.assertEquals(response.statusCode(),201);
         String token = response.body().jsonPath().getString("data.token");
        return token;
    }
    @Test
    @Tag("smoke")
    public void aCrearVakita(){
        test = report.createTest("Test de Crear Vakita");
        test.log(Status.INFO, "Inicia el Test");
        JSONObject vakita = new JSONObject();
        vakita.put("name", "una vakita");
        vakita.put("idCreatorUser", 27);
        vakita.put("description", "descripcion de la vakita");
        vakita.put( "imgURL", "la imagen");
        vakita.put( "totalAmount", 5000.0);
        vakita.put("cumulativeAmount", 0.0);
        vakita.put("creationDate", "2023-08-10");
        vakita.put("expirationDate", "2023-08-07");
        vakita.put("isActive", true);
        vakita.put("type", "normal");
        test.log(Status.INFO, "Se configura la petición");
        given().config(RestAssured.config().encoderConfig(encoderConfig().appendDefaultContentCharsetToContentTypeIfUndefined(false))).
                contentType("application/json")
                .header("Authorization","Bearer" + LogInUsuario())
                .body(vakita.toString())
                .when()
                .post(baseURLVakitas)
                .then()
                .assertThat()
                .statusCode(200);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void bValidacionDateCrearVakita(){
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
        test.log(Status.INFO, "Se configura la petición");
        given().config(RestAssured.config().encoderConfig(encoderConfig().appendDefaultContentCharsetToContentTypeIfUndefined(false))).
                contentType("application/json")
                .body(vakita.toString())
                .header("Authorization","Bearer" + LogInUsuario())
                .when()
                .post(baseURLVakitas)
                .then()
                .assertThat()
                .statusCode(400);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta acorde al error");
    }

    @Test
    @Tag("smoke")
    public void cObtenerVakitaPorId(){
        test = report.createTest("Test de Obtener Vakita po Id");
        test.log(Status.INFO, "Inicia el Test");
        test.log(Status.INFO, "Se configura la petición");
        given()
               .pathParam("vakitaId", 1)
               .header("Authorization","Bearer" + LogInUsuario())
               .when()
               .get(baseURLVakitas+"/{vakitaId}")
               .then()
               .assertThat()
                .statusCode(200);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void dDepositarSaldo(){
        test = report.createTest("Test de depositar dinero en una vakita");
        test.log(Status.INFO, "Inicia el Test");
        test.log(Status.INFO, "Se configura la petición");
        given()
                .queryParam("userId", 1)
                .queryParam("amount", 200.0)
                .queryParam("vakitaId", 14)
                .header("Authorization","Bearer" + LogInUsuario())
                .when()
                .put(baseURLVakitas+"/deposit")
                .then()
                .assertThat()
                .statusCode(200);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void eInactivarUnaVakita(){
        test = report.createTest("Test Inactivar una vakita");
        test.log(Status.INFO, "Inicia el Test");
        test.log(Status.INFO, "Se configura la petición");
        given()
                .pathParam("vakitaId", 17)
                .header("Authorization","Bearer" + LogInUsuario())
                .when()
                .put(baseURLVakitas+"/inactive/{vakitaId}")
                .then()
                .assertThat()
                .statusCode(200);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void fValidacionDepositoEnVakitaInactiva(){
        test = report.createTest("Test Validar que no se puede depositar dinero a una vakita");
        test.log(Status.INFO, "Inicia el Test");
        test.log(Status.INFO, "Se configura la petición");
        given()
                .queryParam("userId", 1)
                .queryParam("amount", 200.0)
                .queryParam("vakitaId", 17)
                .header("Authorization","Bearer" + LogInUsuario())
                .when()
                .put(baseURLVakitas+"/deposit")
                .then()
                .assertThat()
                .statusCode(400);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");

    }

    @Test
    @Tag("smoke")
    public void gAgregarContribuidorAVakita(){
        test = report.createTest("Test Agregar contribuidor a Vakita");
        test.log(Status.INFO, "Inicia el Test");
        test.log(Status.INFO, "Se configura la petición");
        given()
                .pathParams("vakitaId", "14")
                .pathParams("userId", "24")
                .header("Authorization","Bearer" + LogInUsuario())
                .when()
                .put(baseURLVakitas+"/contributors/add/{vakitaId}/{userId}")
                .then()
                .assertThat()
                .statusCode(200);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");

    }

    @Test
    @Tag("smoke")
    public void hValidarAgregarContribuidorDuplicadoAVakita(){
        test = report.createTest("Test Agregar contribuidor a Vakita");
        test.log(Status.INFO, "Inicia el Test");
        test.log(Status.INFO, "Se configura la petición");
        given()
                .pathParams("vakitaId", "14")
                .pathParams("userId", "24")
                .header("Authorization","Bearer" + LogInUsuario())
                .when()
                .put(baseURLVakitas+"/contributors/add/{vakitaId}/{userId}")
                .then()
                .assertThat()
                .statusCode(400);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");

    }
    @AfterAll
    public void cerrarReporte(){

        report.flush();
    }





}
