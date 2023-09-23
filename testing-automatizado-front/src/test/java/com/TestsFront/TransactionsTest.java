package com.TestsFront;

import com.ExtentReports.ExtentFactory;
import com.Pages.*;
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
public class TransactionsTest {


    static WebDriver driver;
    static WebDriverWait wait;
    LogInPage login;
    HomePage home;
    DashboardPage dashboard;
    TransactionsPage transactions;

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
    public void testViewTransactions(){
        test = extent.createTest("Test ver transacciones");
        test.log(Status.INFO, "Inicia el Test");
        home= new HomePage(driver);
        home.clickLogInPage();
        test.log(Status.PASS, "Ingreso a la página Log In");
        login = new LogInPage(driver);
        login.enterEmail("loreperez2003@gmail.com");
        test.log(Status.PASS, "Ingreso email");
        login.enterPassword("1234");
        test.log(Status.PASS, "Ingreso contraseña");
        login.clickLogInButton();
        test.log(Status.PASS, "Click en botón log in");
        dashboard= new DashboardPage(driver);
        dashboard.clickMenuTransactionButton();
        test.log(Status.PASS, "Click link Transsacciones en el menú del dashboard");
        transactions = new TransactionsPage(driver);
        transactions.clickDownloadButton();
        test.log(Status.PASS, "Click en descargar reporte");
        test.log(Status.INFO, "Finaliza la descarga del reporte");
    }



    @AfterAll
    public void exit(){
        extent.flush();
        transactions.exit();
    }


}
