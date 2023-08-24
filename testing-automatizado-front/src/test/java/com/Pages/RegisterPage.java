package com.Pages;

import com.Base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class RegisterPage extends BasePage {

    WebDriver driver;
    WebDriverWait wait;

    public RegisterPage(WebDriver driver) {
        this.driver = driver;
    }


    public void enterName(String name) {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"name\"]")));
        WebElement nameInput = driver.findElement(By.xpath("//*[@id=\"name\"]"));
        nameInput.clear();
        nameInput.sendKeys(name);
    }

    public void enterLastname(String lastName) {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"lastName\"]")));
        WebElement lastNameInput = driver.findElement(By.xpath("//*[@id=\"lastName\"]"));
        lastNameInput.clear();
        lastNameInput.sendKeys(lastName);
    }


    public void enterDNI(String dni) {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("dni")));
        WebElement dniInput = driver.findElement(By.id("dni"));
        dniInput.clear();
       dniInput.sendKeys(dni);
    }


    public void enterEmail(String birth) {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"email\"]")));
        WebElement emailInput = driver.findElement(By.xpath("//*[@id=\"email\"]"));
       emailInput.clear();
       emailInput.sendKeys(birth);
    }

    public void enterBirth(String birth) {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"birthdate\"]")));
        WebElement birthInput = driver.findElement(By.xpath("//*[@id=\"birthdate\"]"));
        birthInput.clear();
        birthInput.sendKeys(birth);
    }






    public void enterPassword(String password) {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"password\"]")));
        WebElement passwordInput = driver.findElement(By.xpath("//*[@id=\"password\"]"));
        passwordInput.clear();
        passwordInput.sendKeys(password);
    }

    public void confirmPassword(String password) {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"passwordConfirm\"]")));
        WebElement confirmPasswordInput = driver.findElement(By.xpath("//*[@id=\"passwordConfirm\"]"));
        confirmPasswordInput.clear();
        confirmPasswordInput.sendKeys(password);
    }



    public void clickRegisterButton() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id=\"root\"]/div/div[2]/div/form/button")));
        WebElement registerButton = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/form/button"));
        registerButton.click();
    }

    public String checkMessage() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(8));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("swal2-title")));
        WebElement message = driver.findElement(By.id("swal2-title"));
        String messageText = message.getText();
        return messageText;
    }




}
