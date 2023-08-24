package com.Pages;

import com.Base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class HomePage extends BasePage {

    WebDriver driver;
    WebDriverWait wait;


    public HomePage(WebDriver driver) {
        this.driver = driver;
    }

    public void clickRegisterPage() {
        wait = new WebDriverWait(driver, Duration.ofSeconds(4));
        wait.until(ExpectedConditions.elementToBeClickable(By.id("Crear-cuenta")));
        WebElement register = driver.findElement(By.id("Crear-cuenta"));
       register.click();


    }

    public void clickLogInPage() {

            wait = new WebDriverWait(driver, Duration.ofSeconds(1));
            wait.until(ExpectedConditions.elementToBeClickable(By.id("Iniciar-sesion")));
            WebElement logInButton = driver.findElement(By.id("Iniciar-sesion"));
            logInButton.click();



    }

    public String checkMessageHome() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(8));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[2]/div[1]/p")));
        WebElement message = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[1]/p"));
        String messageText = message.getText();
        return messageText;
    }




}
