package com.TestsFront;


import com.ExtentReports.ExtentFactory;
import com.Pages.HomePage;
import com.Pages.LogInPage;
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
public class LogInTest {

    static WebDriver driver;
    static WebDriverWait wait;
    LogInPage login;
    HomePage home;
   static ExtentSparkReporter spark = new ExtentSparkReporter("target/REPORTES.html");
    static ExtentReports extent;
    ExtentTest test;



    @BeforeAll
    public void setUpDriver(){
        driver= home.setup();
        home.url("http://54.221.139.107/");
        wait = new WebDriverWait(driver, Duration.ofSeconds(5));
       extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);



    }

    @Test
    @Tag("smoke")
    public void testLogIn()  {
        test = extent.createTest("Test Log In");
        test.log(Status.INFO, "Inicia el Test");
        home= new HomePage(driver);
        home.clickLogInPage();
        test.log(Status.PASS, "Ingreso a la página Log In");
        login = new LogInPage(driver);
        login.enterEmail("cindy.s@live.com.ar");
        test.log(Status.PASS, "Ingreso email");
        login.enterPassword("1234");
        test.log(Status.PASS, "Ingreso contraseña");


        login.clickLogInButton();

        test.log(Status.INFO, "Finaliza test de LogIn");
        String resultTextOfLogIn= login.checkMessageLogIn();
        assertTrue(resultTextOfLogIn.contains("Inicio exitoso"));
        System.out.println("Resultado: " + resultTextOfLogIn);

    }


    @Test
    @Tag("smoke")
    public void testWrongLogIn()  {
        test = extent.createTest("Inicio de sesión incorrecto");
        test.log(Status.INFO, "Inicia el Test");
        home= new HomePage(driver);
        home.clickLogInPage();
        test.log(Status.PASS, "Ingreso a la página Log In");
        login = new LogInPage(driver);
        login.enterEmail("test@gmail.com");
        test.log(Status.PASS, "Ingreso email");
        login.enterPassword("1234");
        test.log(Status.PASS, "Ingreso contraseña");


        login.clickLogInButton();

        test.log(Status.INFO, "Finaliza test de LogIn");
        String resultTextOfLogIn= login.checkMessageLogIn();
        assertTrue(resultTextOfLogIn.contains("Error"));
        System.out.println("Resultado: " + resultTextOfLogIn);

    }

    @Test
    @Tag("smoke")
    public void testWithoutDataLogIn()  {
        test = extent.createTest("Inicio de sesión incorrecto");
        test.log(Status.INFO, "Inicia el Test");
        home= new HomePage(driver);
        home.clickLogInPage();
        test.log(Status.PASS, "Ingreso a la página Log In");
        login = new LogInPage(driver);
//        login.enterEmail("test@gmail.com");
//        test.log(Status.PASS, "Ingreso email");
//        login.enterPassword("1234");
//        test.log(Status.PASS, "Ingreso contraseña");


        login.clickLogInButton();

        test.log(Status.INFO, "Finaliza test de LogIn");
        String resultTextOfLogIn= login.checkMessageLogIn();
        assertTrue(resultTextOfLogIn.contains("Error"));
        System.out.println("Resultado: " + resultTextOfLogIn);

    }

    @Test
    @Tag("smoke")
    public void testEmptyLogIn()  {
        test = extent.createTest("Inicio de sesión sin datos");
        test.log(Status.INFO, "Inicia el Test");
        home= new HomePage(driver);
        home.clickLogInPage();
        test.log(Status.PASS, "Ingreso a la página Log In");
        login = new LogInPage(driver);
        login.enterEmail("");
        test.log(Status.PASS, "Ingreso email vacio");
        login.enterPassword("");
        test.log(Status.PASS, "Ingreso contraseña");

        login.clickLogInButton();

        test.log(Status.INFO, "Finaliza test de LogIn");
//        String resultTextOfLogIn= login.checkMessageLogIn();
        String resultTextOfEmail= login.checkMessageEmailLogIn();
        String resultTextOfPassword= login.checkMessagePasswordLogIn();

//        assertTrue(resultTextOfLogIn.contains("Error"));
        assertTrue(resultTextOfEmail.contains("Email es requerido"));
        assertTrue(resultTextOfPassword.contains("Contraseña es requerida"));

        System.out.println("Resultado: " + resultTextOfEmail + " "+resultTextOfPassword);

    }




    @AfterAll
    public void exit(){
        extent.flush();
       login.exit();
    }




}
