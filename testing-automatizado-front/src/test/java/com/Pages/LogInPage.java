package com.Pages;

import com.Base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;


public class LogInPage extends BasePage {


    WebDriver driver;
    WebDriverWait wait;

    public LogInPage(WebDriver driver) {
        this.driver = driver;
    }


    public void enterEmail(String email) {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("email")));
        WebElement emailInput = driver.findElement(By.id("email"));
        emailInput.clear();
        emailInput.sendKeys(email);
    }

    public void enterPassword(String password) {

        wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("password")));
        WebElement passwordInput = driver.findElement(By.id("password"));
        passwordInput.clear();
        passwordInput.sendKeys(password);
    }

    public void clickLogInButton() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id=\"root\"]/div/div[2]/div/form/button")));
        WebElement logInButton = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/form/button"));
        logInButton.click();
    }

    public String checkMessageLogIn() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(8));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("swal2-title")));
        WebElement message = driver.findElement(By.id("swal2-title"));
        String messageText = message.getText();
        return messageText;
    }

    public String checkMessageEmailLogIn() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(8));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[2]/div/form/div[2]/span")));
        WebElement message = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/form/div[2]/span"));
        String messageText = message.getText();
        return messageText;
    }

    public String checkMessagePasswordLogIn() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(8));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[2]/div/form/div[3]/span")));
        WebElement message = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/form/div[3]/span"));
        String messageText = message.getText();
        return messageText;
    }

    public void clickOkSucessModal() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/div[2]/div/div[6]/button[1]")));
        WebElement okButton = driver.findElement(By.xpath("/html/body/div[2]/div/div[6]/button[1]"));
        okButton.click();
    }
}
