const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const {By,Key} = require('selenium-webdriver');
const assert = require("assert");
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

// We want to check if the register site is works
async function signUpInput() {


    var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    await driver.get("http://localhost:3000/")

    await driver.findElement(By.className("sc-eCApGN cISPFK navSignUplink")).click();
    var url= await driver.getCurrentUrl()

    assert.strictEqual(url,"http://localhost:3000/connection/register");
    assert.notStrictEqual(url,"http://localhost:3000/connection/sigh-up");
    await driver.findElement(By.className("inputPhoneNum")).sendKeys("0544567891");
    await driver.findElement(By.className("inputPhoneNum")).sendKeys(Key.RETURN);
    // await driver.sendKeys(Key.RETURN);
    await driver.switchTo().alert().accept();

    await driver.findElement(By.className("inputPhoneNum")).sendKeys(Key.RETURN);
    var alertText= await driver.switchTo().alert().getText();
    assert.strictEqual(alertText,"The name you entered was: 1225");
    
    // await driver.quit(); sc-jSFkmK hgHVIU
}
signUpInput()