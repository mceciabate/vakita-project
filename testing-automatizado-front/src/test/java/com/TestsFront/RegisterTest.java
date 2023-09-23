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
        home.url("http://54.221.139.107/");
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

    @Test
    @Tag("smoke")
    public void testEmptyRegisterAccount()  {
        test = extent.createTest("Test mensaje de error al crear cuenta sin datos");
        test.log(Status.INFO, "Inicia el Test");
        home= new HomePage(driver);
        home.clickRegisterPage();
        test.log(Status.PASS, "Ingreso al Registro");
        register = new RegisterPage(driver);
        register.enterName("");
        test.log(Status.PASS, "Ingreso nombre");
        register.enterLastname("");
        test.log(Status.PASS, "Ingreso apellido");
        register.enterDNI("");
        test.log(Status.PASS, "Ingreso DNI");
        register.enterEmail("");
        test.log(Status.PASS, "Ingreso email");
        register.enterBirth("");
        test.log(Status.PASS, "Ingreso fecha de nacimiento");
        register.enterPassword("");
        test.log(Status.PASS, "Ingreso contraseña");
        register.confirmPassword("");
        test.log(Status.PASS, "Confirmo contraseña");
        register.checkboxClick();
        test.log(Status.PASS, "Confirmo que los datos son correctos");
        register.clickRegisterButton();

        test.log(Status.INFO, "Finaliza test de Registro");
        String resultTextOfName = register.checkMessageName();
        assertTrue(resultTextOfName.contains("Nombre es requerido"));

        String resultTextOfLastname = register.checkMessageLastname();
        assertTrue(resultTextOfLastname.contains("Apellido es requerido"));

        String resultTextOfUsername = register.checkMessageUsername();
        assertTrue(resultTextOfUsername.contains("Nombre de usuario es requerido"));

        String resultTextOfDni = register.checkMessageDni();
        assertTrue(resultTextOfDni.contains("Dni es requerido"));

        String resultTextOfEmail = register.checkMessageEmail();
        assertTrue(resultTextOfEmail.contains("Correo es requerido"));

        String resultTextOfBirthday = register.checkMessageBirthday();
        assertTrue(resultTextOfBirthday.contains("Fecha de nacimiento es requerida"));

        String resultTextOfPassword = register.checkMessagePassword();
        assertTrue(resultTextOfPassword.contains("Contraseña es requerida"));

        String resultTextOfPasswordCheck = register.checkMessagePasswordCheck();
        assertTrue(resultTextOfPasswordCheck.contains("Confirmación de contraseña es requerida"));
        System.out.println("Resultado: " + resultTextOfUsername + " "+resultTextOfLastname +" "+resultTextOfUsername+" "+resultTextOfDni+" "+ resultTextOfBirthday+ " "+resultTextOfPassword+" "+resultTextOfPasswordCheck);

    }





    @AfterAll
    public void exit(){
        extent.flush();
        register.exit();
    }




}
