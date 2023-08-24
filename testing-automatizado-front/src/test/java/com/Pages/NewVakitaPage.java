package com.Pages;

import com.Base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class NewVakitaPage extends BasePage {

    WebDriver driver;
    WebDriverWait wait;

    public NewVakitaPage(WebDriver driver) {
        this.driver = driver;
    }


    public void enterName(String name) {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"name\"]")));
        WebElement nameInput = driver.findElement(By.xpath("//*[@id=\"name\"]"));
       nameInput.clear();
        nameInput.sendKeys(name);
    }

    public void enterAmountVakita(String enterAmount) {

        wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("amount")));
        WebElement amountInput = driver.findElement(By.id("amount"));
        amountInput.clear();
        amountInput.sendKeys(enterAmount);
    }

    public void enterStartDate(String startDate) {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"startDate\"]")));
        WebElement startDateInput = driver.findElement(By.xpath("//*[@id=\"startDate\"]"));
       startDateInput.clear();
        startDateInput.sendKeys(startDate);
    }


    public void enterEndDate(String endDate) {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"endDate\"]")));
        WebElement endDateInput = driver.findElement(By.xpath("//*[@id=\"endDate\"]"));
        endDateInput.clear();
        endDateInput.sendKeys(endDate);
    }

    public void enterDescription(String description) {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"description\"]")));
        WebElement descriptionInput = driver.findElement(By.xpath("//*[@id=\"description\"]"));
        descriptionInput.clear();
      descriptionInput.sendKeys(description);
    }

    public void enterAmount(String amount) {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"cumulativeAmount\"]")));
        WebElement amountInput = driver.findElement(By.xpath("//*[@id=\"cumulativeAmount\"]"));
        amountInput.clear();
        amountInput.sendKeys(amount);
    }

    public void enterMember(String member) {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"email\"]")));
        WebElement descriptionInput = driver.findElement(By.xpath("//*[@id=\"email\"]"));
        descriptionInput.clear();
        descriptionInput.sendKeys(member);
    }

    public void clickAddMember() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div/div[2]/form/div[2]/div[1]/div/div[3]/button")));
        WebElement addMemberButton = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div/div[2]/form/div[2]/div[1]/div/div[3]/button"));
        addMemberButton.click();
    }

    public void clickNewVakitaButton() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(8));
        wait.until(ExpectedConditions.elementToBeClickable(By.id("buttonNewVakita")));
        WebElement logInButton = driver.findElement(By.id("buttonNewVakita"));
        logInButton.click();
    }

    public String checkMessageNewVakita() {

        wait = new WebDriverWait(driver, Duration.ofSeconds(8));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"swal2-title\"]/strong")));
        WebElement message = driver.findElement(By.xpath("//*[@id=\"swal2-title\"]/strong"));
        String messageText = message.getText();
        return messageText;
    }

}
