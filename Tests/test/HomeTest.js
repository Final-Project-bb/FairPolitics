// const {Builder, Key} =require("selenium-webdriver");
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const {By,Key} = require('selenium-webdriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
async function first() {


    var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    await driver.get("https://www.google.co.il")

    await driver.findElement(By.className("gLFyf gsfi")).sendKeys("first search example", Key.RETURN);

    // await driver.quit();
}
first()