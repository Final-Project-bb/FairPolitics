const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const {By,Key} = require('selenium-webdriver');
const assert = require("assert");
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

// We want to check if the navBar Works
async function signUpInput() {


    var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    await driver.get("http://localhost:3000/")

    await driver.findElement(By.className("sc-jSFkmK hgHVIU")).click();
    // var url= await driver.getCurrentUrl()

    // assert.strictEqual(url,"http://localhost:3000/connection/register");
    // assert.notStrictEqual(url,"http://localhost:3000/connection/sigh-up");
    await driver.findElement(By.className("sc-gtssRu dktAZX navProfilelink")).click();
     var url= await driver.getCurrentUrl()

    assert.strictEqual(url,"http://localhost:3000/profile");
    assert.notStrictEqual(url,"http://localhost:3000/home");
    await driver.findElement(By.className("addDiscussionLink")).sendKeys(Key.RETURN);
    url= await driver.getCurrentUrl()

    assert.strictEqual(url,"http://localhost:3000/profile/addDiscussion");
    assert.notStrictEqual(url,"http://localhost:3000/profile");
    await driver.findElement(By.className("tagInput")).sendKeys("tal",Key.RETURN);
    var alertText= await driver.switchTo().alert().getText();
    assert.strictEqual(alertText,"Add discussion submit works!");
    // await driver.sendKeys(Key.RETURN);
    // await driver.switchTo().alert().accept();

    // await driver.findElement(By.className("inputPhoneNum")).sendKeys(Key.RETURN);
    // var alertText= await driver.switchTo().alert().getText();
    // assert.strictEqual(alertText,"The name you entered was: 1225");'tagInput'
    //  sc-jSFkmK hgHVIU
    await driver.quit();
}
signUpInput()