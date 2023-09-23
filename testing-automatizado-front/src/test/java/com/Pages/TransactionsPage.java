package com.Pages;

import com.Base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class TransactionsPage extends BasePage {

    WebDriver driver;
    WebDriverWait wait;

    public TransactionsPage(WebDriver driver) {
        this.driver = driver;
    }




    public void clickDownloadButton() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div/button")));
        WebElement downloadButton = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div/button"));
        downloadButton.click();
    }


}
