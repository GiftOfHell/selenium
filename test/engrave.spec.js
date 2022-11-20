const { expect } = require('chai');
const { Builder, Browser, } = require('selenium-webdriver');
const MacPage = require("../pages/macPage");
const MacAirPage = require("../pages/macAirPage");
const AirpodsPage = require('../pages/airpodsPage');

describe('Should engrave items.', () => {
  beforeEach(async function () {
    this.driver = new Builder().
    forBrowser(Browser.CHROME).
    build();
    await this.driver.manage().window().maximize();
  });

  it('Should engrave items with text.', async function () {
    const value = "HELLO";

    const page = new AirpodsPage(this.driver);
    await page.openPage();
    await page.clickEngraveButton();
    await page.inputValidEngravingValue(value);

    const img = await page.getEngraveImage();
    const link = await img.getAttribute('src');
    expect(link).to.contain(value);
  }).timeout(30000);

  it('Should handle bad engrave words.', async function () {
    const value = "SHIT";
    const message = "Please resubmit your engraving message. Personalize with a name, initials, phone number, or date.";

    const page = new AirpodsPage(this.driver);
    await page.openPage();
    await page.clickEngraveButton();
    await page.inputValidEngravingValue(value);

    const text = await page.getEngraveValidationMessage();
    const textContent = await text.getText();
    expect(textContent).to.contain(message);
  }).timeout(30000);

  afterEach(async function () {
    await new Promise((resolve) => {
      setTimeout(async () => {
        resolve();
      }, 100);
    })
    await this.driver.quit();
  })
});
