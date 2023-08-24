package com.TestsFront;

import com.ExtentReports.ExtentFactory;
import com.Pages.HomePage;
import com.Pages.RegisterPage;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;


@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class RegisterTest {
    static WebDriver driver;
    static WebDriverWait wait;
    RegisterPage register;
    HomePage home;
  static ExtentSparkReporter spark = new ExtentSparkReporter("target/REPORTES.html");
    static ExtentReports extent;
    ExtentTest test;





    @BeforeAll
    public void setUpDriver(){
        driver= home.setup();
        home.url("http://localhost:5173/");
        wait = new WebDriverWait(driver, Duration.ofSeconds(5));
    extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);


    }

    @Test
    @Tag("smoke")
    public void testRegisterAccount()  {
        test = extent.createTest("Test Register");
        test.log(Status.INFO, "Inicia el Test");
        home= new HomePage(driver);
        home.clickRegisterPage();
        test.log(Status.PASS, "Ingreso al Registro");
        register = new RegisterPage(driver);
        register.enterName("John");
        test.log(Status.PASS, "Ingreso nombre");
        register.enterLastname("Pepa");
        test.log(Status.PASS, "Ingreso apellido");
        register.enterDNI("12345");
        test.log(Status.PASS, "Ingreso DNI");
        register.enterEmail("pepe@gmail.com");
        test.log(Status.PASS, "Ingreso email");
        register.enterBirth("02/02/2000");
        test.log(Status.PASS, "Ingreso fecha de nacimiento");
        register.enterPassword("1234");
        test.log(Status.PASS, "Ingreso contraseña");
        register.confirmPassword("1234");
        test.log(Status.PASS, "Confirmo contraseña");
        register.clickRegisterButton();

        test.log(Status.INFO, "Finaliza test de Registro");
        String resultTextOfRegister= register.checkMessage();
        assertTrue(resultTextOfRegister.contains("Registro realizado con éxito"));
        System.out.println("Resultado: " + resultTextOfRegister);

    }





    @Test
    @Tag("smoke")
    public void testWrongRegisterAccount()  {
        test = extent.createTest("Test mensaje de error al crear cuenta");
        test.log(Status.INFO, "Inicia el Test");
        home= new HomePage(driver);
        home.clickRegisterPage();
        test.log(Status.PASS, "Ingreso al Registro");
        register = new RegisterPage(driver);
        register.enterName("John");
        test.log(Status.PASS, "Ingreso nombre");
        register.enterLastname("Pepa");
        test.log(Status.PASS, "Ingreso apellido");
        register.enterDNI("12345");
        test.log(Status.PASS, "Ingreso DNI");
        register.enterEmail("cindy.s@live.com.ar");
        test.log(Status.PASS, "Ingreso email");
        register.enterBirth("02/02/2000");
        test.log(Status.PASS, "Ingreso fecha de nacimiento");
        register.enterPassword("1234");
        test.log(Status.PASS, "Ingreso contraseña");
        register.confirmPassword("1234");
        test.log(Status.PASS, "Confirmo contraseña");
        register.clickRegisterButton();

        test.log(Status.INFO, "Finaliza test de Registro");
        String resultTextOfRegister= register.checkMessage();
        assertTrue(resultTextOfRegister.contains("Algo salió mal :("));
        System.out.println("Resultado: " + resultTextOfRegister);

    }





    @AfterAll
    public void exit(){
        extent.flush();
        register.exit();
    }




}
