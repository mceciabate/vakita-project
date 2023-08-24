package com.Pages;

import com.Base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class MyVakitaPage extends BasePage {

    WebDriver driver;
    WebDriverWait wait;

    public MyVakitaPage(WebDriver driver) {
        this.driver = driver;
    }


    public void clickMyVakitaPayButton() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(8));
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div/div[1]/div[1]/button")));
        WebElement logInButton = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div/div[1]/div[1]/button"));
        logInButton.click();
    }

}
