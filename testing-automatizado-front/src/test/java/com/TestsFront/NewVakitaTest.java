package com.TestsFront;

import com.ExtentReports.ExtentFactory;
import com.Pages.DashboardPage;
import com.Pages.HomePage;
import com.Pages.LogInPage;
import com.Pages.NewVakitaPage;
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
public class NewVakitaTest {


    static WebDriver driver;
    static WebDriverWait wait;
    LogInPage login;
    HomePage home;
    DashboardPage dashboard;
    NewVakitaPage newVakita;
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
    public void testNewVakita()  {
        test = extent.createTest("Test crear una vaca");
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
        test.log(Status.PASS, "Click en botón log in");
        dashboard= new DashboardPage(driver);
        dashboard.clickMenuNewVakita();
        test.log(Status.PASS, "Click link Nueva Vaca en el menú del dashboard");
       newVakita= new NewVakitaPage(driver);
       newVakita.enterName("Cumple de Marta");
        test.log(Status.PASS, "Ingreso de nombre de vakita");
        newVakita.enterAmountVakita("10000");
        test.log(Status.PASS, "Ingreso monto a ahorrar de la vakita");
        newVakita.enterStartDate("25/08/2023");
        test.log(Status.PASS, "Ingreto fecha de incio de vakita");
        newVakita.enterEndDate("30/08/2023");
        test.log(Status.PASS, "Ingreso fecha de finalizacion de vakita");
        newVakita.enterDescription("cumple");
        test.log(Status.PASS, "Ingreso decripcion de la vakita");
        newVakita.enterAmount("100");
        test.log(Status.PASS, "Ingreso importe a cargar en la vakita");
        newVakita.enterMember("diazjuan@gmail.com");
        test.log(Status.PASS, "Ingreso integrante");
        newVakita.clickAddMember();
        test.log(Status.PASS, "Click agregar integrante");
        newVakita.clickNewVakitaButton();
        test.log(Status.PASS, "Click boton crear vaca");




        String resultTextOfNewVakita= newVakita.checkMessageNewVakita();
        assertTrue(resultTextOfNewVakita.contains("Vaquita creada con éxito"));
        System.out.println("Resultado: " + resultTextOfNewVakita);

        test.log(Status.INFO, "Finaliza crear vaca");

    }




    @AfterAll
    public void exit(){
        extent.flush();
        newVakita.exit();
    }


}
