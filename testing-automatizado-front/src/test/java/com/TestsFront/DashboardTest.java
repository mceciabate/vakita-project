package com.TestsFront;


import com.ExtentReports.ExtentFactory;
import com.Pages.DashboardPage;
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
public class DashboardTest {

    static WebDriver driver;
    static WebDriverWait wait;
    LogInPage login;
    DashboardPage dashboard;
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
    public void testRenderNewVakita()  {
        test = extent.createTest("Test dashboard renderizado de Nueva Vaca");
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
        test.log(Status.PASS, "Click a continuar");
       // login.clickOkSucessModal();
        //test.log(Status.PASS, "Click a botón Ok a modal de inicio de sesión exitoso");
        dashboard= new DashboardPage(driver);
        dashboard.clickMenuNewVakita();
        test.log(Status.PASS, "Click link Nueva Vaca en el menú del dashboard");


        String resultTextRenderNewVakita= dashboard.checkRenderNewVakita();
        assertTrue(resultTextRenderNewVakita.contains("Hagamos una vaquita"));
       System.out.println("Resultado: " + resultTextRenderNewVakita);
        test.log(Status.INFO, "Finaliza test");

    }


    @Test
    @Tag("smoke")
    public void testRenderInicio()  {
        test = extent.createTest("Test dashboard renderizado de Inicio");
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
        test.log(Status.PASS, "Click a continuar");
       // login.clickOkSucessModal();
       // test.log(Status.PASS, "Click a botón Ok a modal de inicio de sesión exitoso");
        dashboard= new DashboardPage(driver);
        dashboard.clickMenuInicio();
        test.log(Status.PASS, "Click link Inicio en el menú del dashboard");


        String resultTextRenderInicio= dashboard.checkRenderMenuInicio();
        assertTrue(resultTextRenderInicio.contains("NO TE PIERDAS LA OPORTUNIDAD DE AYUDAR CON LAS VAQUITAS SOLIDARIAS"));
        System.out.println("Resultado: " + resultTextRenderInicio);
        test.log(Status.INFO, "Finaliza test");

    }


    @Test
    @Tag("smoke")
    public void testRenderMyVakita()  {
        test = extent.createTest("Test dashboard renderizado de Mis vaquitas");
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
        test.log(Status.PASS, "Click a continuar");
        // login.clickOkSucessModal();
        // test.log(Status.PASS, "Click a botón Ok a modal de inicio de sesión exitoso");
        dashboard= new DashboardPage(driver);
        dashboard.clickMenuMyVakitas();
        test.log(Status.PASS, "Click link Mis Vaquitas en el menú del dashboard");


        String resultTextRenderMyVakita= dashboard.checkRenderMenuMyVakita();
        assertTrue( resultTextRenderMyVakita.contains("Mis vaquitas"));
        System.out.println("Resultado: " + resultTextRenderMyVakita);
        test.log(Status.INFO, "Finaliza test");

    }

    @Test
    @Tag("smoke")
    public void testExitButton()  {
        test = extent.createTest("Test botón salir y que se redericcione a home");
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
        test.log(Status.PASS, "Click a continuar");
        dashboard= new DashboardPage(driver);
        dashboard.clickMenuExitButton();
        test.log(Status.PASS, "Click botón salir");


        String resultText= home.checkMessageHome();
        assertTrue( resultText.contains("¡Hacer una vaquita con tus amigos nunca habia sido tan fácil!"));
        System.out.println("Resultado: " + resultText);
        test.log(Status.INFO, "Finaliza test en página home");

    }




    @AfterAll
    public void exit(){
        extent.flush();
        dashboard.exit();
    }


}
