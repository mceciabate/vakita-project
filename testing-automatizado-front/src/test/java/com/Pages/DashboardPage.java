package com.Pages;

import com.Base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;


public class DashboardPage extends BasePage {
    WebDriver driver;
    WebDriverWait wait;

    public DashboardPage(WebDriver driver) {
        this.driver = driver;
    }

    public void clickMenuNewVakita() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id=\"root\"]/div/div[2]/section[1]/div[2]/a[2]")));
        WebElement linkNewVakita = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/section[1]/div[2]/a[2]"));
        linkNewVakita.click();
    }

    public String checkRenderNewVakita() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(8));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div/div[1]/h2")));
        WebElement message = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div/div[1]/h2"));
        String messageText = message.getText();
        return messageText;
    }

    public void clickMenuInicio() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id=\"root\"]/div/div[2]/section[1]/div[2]/a[1]")));
        WebElement linkNewVakita = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/section[1]/div[2]/a[1]"));
        linkNewVakita.click();
    }


    public String checkRenderMenuInicio() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(8));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[2]/section[2]/div/div[1]/div/div/h2[1]")));
        WebElement message = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/section[2]/div/div[1]/div/div/h2[1]"));
        String messageText = message.getText();
        return messageText;
    }


    public void clickMenuMyVakitas() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id=\"root\"]/div/div[2]/section/div[2]/a[3]")));
        WebElement linkNewVakita = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/section/div[2]/a[3]"));
        linkNewVakita.click();
    }


    public String checkRenderMenuMyVakita() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(8));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[2]/div/h2")));
        WebElement message = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/h2"));
        String messageText = message.getText();
        return messageText;
    }

    public void clickMenuExitButton() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id=\"root\"]/div/div[2]/section/div[2]/button")));
        WebElement linkNewVakita = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/section/div[2]/button"));
        linkNewVakita.click();
    }

}
