package com.TestsFront;


import com.ExtentReports.ExtentFactory;
import com.Pages.DashboardPage;
import com.Pages.HomePage;
import com.Pages.LogInPage;
import com.Pages.MyVakitaPage;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Duration;



@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class MyVakitaTest {



    static WebDriver driver;
    static WebDriverWait wait;
    LogInPage login;
    HomePage home;
    DashboardPage dashboard;
    MyVakitaPage myvakitas;
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
    public void testMyVakitas()  {
        test = extent.createTest("Test renderizado de mis vaquitas");
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
        dashboard.clickMenuMyVakitas();
        test.log(Status.PASS, "Click link Mis vaquitas en el menú del dashboard");
        myvakitas= new MyVakitaPage(driver);
        myvakitas.clickMyVakitaPayButton();
        test.log(Status.PASS, "Click primer botón para cargar dinero de mi vaquita");
        test.log(Status.INFO, "Finaliza test");

    }

    @Test
    @Tag("smoke")
    public void testFunds()  {
        test = extent.createTest("Test renderizado de mis vaquitas");
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
        dashboard.clickMenuMyVakitas();
        test.log(Status.PASS, "Click link Mis vaquitas en el menú del dashboard");
        myvakitas= new MyVakitaPage(driver);
        myvakitas.clickMyVakitaPayButton();
        test.log(Status.PASS, "Click primer botón para cargar dinero de mi vaquita");
        test.log(Status.INFO, "Finaliza test");

    }


    @AfterAll
    public void exit(){
        extent.flush();
        myvakitas.exit();
    }


}
