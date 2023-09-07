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

    private String baseURLUsuarios = "http://107.22.65.36:8080/api/v1/usuarios";


    @BeforeAll
    public void initReport(){
        report = ExtentFactory.getInstance();
        report.attachReporter(spark);
    }

    //VALIDACIONES DE LOS CÓDIGOS DE RESPUESTA PARA LA API DE USUARIOS

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
        user.put("password", "password");
        user.put("birthdate", "1994-05-01");
        user.put("alias", "ceci");
        test.log(Status.INFO, "Se configura la petición");
        given().config(RestAssured.config().encoderConfig(encoderConfig().appendDefaultContentCharsetToContentTypeIfUndefined(false))).
                contentType("application/json")
                .body(user.toString())
                .when()
                .post(baseURLUsuarios+"/register")
                .then()
                .assertThat()
                .statusCode(201);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void bObtenerUserPorId(){
        test = report.createTest("Test de Obtener Usuario por Id");
        test.log(Status.INFO, "Inicia el Test");
        test.log(Status.INFO, "Se configura la petición");
        given()
                .pathParam("usuarioId", 3)
                .when()
                .get(baseURLUsuarios+"/{usuarioId}")
                .then()
                .assertThat()
                .statusCode(200);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void cCambiarContrasenia(){
        test = report.createTest("Test Cambiar Contraseña usuario");
        test.log(Status.INFO, "Inicia el Test");
        JSONObject newPass = new JSONObject();
        newPass.put("password", "nuevapass");
        test.log(Status.INFO, "Se configura la petición");
        given().config(RestAssured.config().encoderConfig(encoderConfig().appendDefaultContentCharsetToContentTypeIfUndefined(false))).
                contentType("application/json")
                .pathParam("usuarioId", 6)
                .body(newPass.toString())
                .when()
                .patch(baseURLUsuarios+"/{usuarioId}")
                .then()
                .assertThat()
                .statusCode(200);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void dModificarUsuario(){
        test = report.createTest("Test de Modificar datos de usuario");
        test.log(Status.INFO, "Inicia el Test");
        JSONObject user = new JSONObject();
        user.put("id",14 );
        user.put("name", "Lore");
        user.put("lastName", "Escobar");
        user.put("dni", "123456789");
        user.put("email", "loreperez2003@gmail.com");
        user.put("password", "0000");
        user.put("birthdate", "2003-11-07");
        user.put("alias", "lore");

        test.log(Status.INFO, "Se configura la petición");
        given().config(RestAssured.config().encoderConfig(encoderConfig().appendDefaultContentCharsetToContentTypeIfUndefined(false))).
                contentType("application/json")
                .pathParam("usuarioId", 14)
                .body(user.toString())
                .when()
                .put(baseURLUsuarios+"/{usuarioId}")
                .then()
                .assertThat()
                .statusCode(200);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void eEliminarUsuario(){
        test = report.createTest("Test de eliminar Usuario por Id");
        test.log(Status.INFO, "Inicia el Test");
        test.log(Status.INFO, "Se configura la petición");
        given()
                .pathParam("usuarioId", 10)
                .when()
                .delete(baseURLUsuarios+"/{usuarioId}")
                .then()
                .assertThat()
                .statusCode(204);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void fEliminarUsuarioNoexistente(){
        test = report.createTest("Test de eliminar Usuario por Id no existente");
        test.log(Status.INFO, "Inicia el Test");
        test.log(Status.INFO, "Se configura la petición");
        given()
                .pathParam("usuarioId", 5)
                .when()
                .delete(baseURLUsuarios+"/{usuarioId}")
                .then()
                .assertThat()
                .statusCode(404);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta acorde al error");
    }

    @Test
    @Tag("smoke")
    public void aCrearUsuarioMenorDeEdad(){
        test = report.createTest("Test de Crear Usuario menor de edad");
        test.log(Status.INFO, "Inicia el Test");
        JSONObject user = new JSONObject();
        user.put("name", "Juan");
        user.put("lastName", "Ruiz");
        user.put("dni", "11111111");
        user.put("email", "juanr@gmail.com");
        user.put("password", "password");
        user.put("birthdate", "2019-05-01");
        test.log(Status.INFO, "Se configura la petición");
        given().config(RestAssured.config().encoderConfig(encoderConfig().appendDefaultContentCharsetToContentTypeIfUndefined(false))).
                contentType("application/json")
                .body(user.toString())
                .when()
                .post(baseURLUsuarios+"/register")
                .then()
                .assertThat()
                .statusCode(400);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void aCrearUsuarioSinCorreo(){
        test = report.createTest("Test de Crear Usuario sin correo");
        test.log(Status.INFO, "Inicia el Test");
        JSONObject user = new JSONObject();
        user.put("name", "Juan");
        user.put("lastName", "Ruiz");
        user.put("dni", "11111111");
//        user.put("email", "juanr@gmail.com");
        user.put("password", "password");
        user.put("birthdate", "2019-05-01");
        test.log(Status.INFO, "Se configura la petición");
        given().config(RestAssured.config().encoderConfig(encoderConfig().appendDefaultContentCharsetToContentTypeIfUndefined(false))).
                contentType("application/json")
                .body(user.toString())
                .when()
                .post(baseURLUsuarios+"/register")
                .then()
                .assertThat()
                .statusCode(400);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }
    @Test
    @Tag("smoke")
    public void aCrearUsuarioConcorreoExistente(){
        test = report.createTest("Test de Crear Usuario con correo existente");
        test.log(Status.INFO, "Inicia el Test");
        JSONObject user = new JSONObject();
        user.put("name", "Juan");
        user.put("lastName", "Ruiz");
        user.put("dni", "11111111");
        user.put("email", "loreperez2003@gmail.com");
        user.put("password", "password");
        user.put("birthdate", "2019-05-01");
        test.log(Status.INFO, "Se configura la petición");
        given().config(RestAssured.config().encoderConfig(encoderConfig().appendDefaultContentCharsetToContentTypeIfUndefined(false))).
                contentType("application/json")
                .body(user.toString())
                .when()
                .post(baseURLUsuarios+"/register")
                .then()
                .assertThat()
                .statusCode(400);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }

    @Test
    @Tag("smoke")
    public void LogInUsuario(){
        test = report.createTest("Test de Logear Usuario");
        test.log(Status.INFO, "Inicia el Test");
        JSONObject user = new JSONObject();
        user.put("email", "loreperez2003@gmail.com");
        user.put("password", "1234");
        test.log(Status.INFO, "Se configura la petición");
        given().config(RestAssured.config().encoderConfig(encoderConfig().appendDefaultContentCharsetToContentTypeIfUndefined(false))).
                contentType("application/json")
                .body(user.toString())
                .when()
                .post(baseURLUsuarios+"/token")
                .then()
                .assertThat()
                .statusCode(201);
        test.log(Status.INFO, "Se resuelve la petición");
        test.log(Status.PASS, "Se ejecuta la petición de manera exitosa");
        test.log(Status.PASS, "Se obtiene respuesta exitosa");
    }






    @AfterAll
    public void cerrarReporte(){

        report.flush();
    }

}
