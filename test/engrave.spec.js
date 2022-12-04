const { expect } = require('chai');
const { Builder, Browser, } = require('selenium-webdriver');

const Driver = require("../driver/Driver");
const MacPage = require("../pages/mac.page");
const MacAirPage = require("../pages/macAir.page");
const AirpodsPage = require("../pages/airpods.page");
const DataReaderService = require("../services/dataReader.service");
const Constants = require("../config/constants");

describe('Should engrave items.', () => {
  before(async function () {
    const props = await DataReaderService.getTestData('engrave.properties');
    for (const key in props) {
      this[key] = props[key];
    }
  })

  beforeEach(async function () {
    this.driver = await Driver.createDriver();
  });


  it("Should engrave items with text.", async function () {
      const page = new AirpodsPage(this.driver);
      await page.openPage();
      await page.clickEngraveButton();
      await page.inputValidEngravingValue(this.validEngravingValue);
  
      const img = await page.getEngraveImage();
      const link = await img.getAttribute('src');
      expect(link).to.contain(this.validEngravingValue);
  }).timeout(Constants.TEST_TIMEOUT);

  it('Should handle bad engrave words.', async function () {
    const page = new AirpodsPage(this.driver);
    await page.openPage();
    await page.clickEngraveButton();
    await page.inputValidEngravingValue(this.invalidEngravingValue);

    const text = await page.getEngraveValidationMessage();
    const textContent = await text.getText();
    expect(textContent).to.contain(this.engravingValidationErrorMessage);
  }).timeout(Constants.TEST_TIMEOUT);

  afterEach(async function () {
    await new Promise((resolve) => {
      setTimeout(async () => {
        resolve();
      }, 100);
    })
    await this.driver.quit();
  })
});
