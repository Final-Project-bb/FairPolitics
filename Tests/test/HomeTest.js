// const {Builder, Key} =require("selenium-webdriver");
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const {By,Key} = require('selenium-webdriver');
const assert = require("assert");
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

// We want to check if the site is upload
async function home() {


    var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    await driver.get("http://localhost:3000/")
   
    var url= await driver.getCurrentUrl()
    assert.strictEqual(url,"http://localhost:3000/");
    assert.notStrictEqual(url,"http://localhost:3000/connection/sigh-up");

    await driver.quit();
}
home()