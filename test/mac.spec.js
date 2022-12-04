const { expect } = require('chai');
const { Builder, Browser, } = require('selenium-webdriver');

const Driver = require("../driver/Driver");
const MacPage = require("../pages/mac.page");
const MacAirPage = require("../pages/macAir.page");
const DataReaderService = require("../services/dataReader.service");

describe('Add items to bag.', () => {
  before(async function () {
    const props = await DataReaderService.getTestData('mac.properties');
    for (const key in props) {
      this[key] = props[key];
    }
  })

  beforeEach(async function () {
    this.driver = await Driver.createDriver();
  });

  it('Should add 13inch mac air to the bag.', async function () {
    const macPage = new MacPage(this.driver);
    await macPage.openPage();
    await macPage.clickBuyButton();

    const macAirPage = new MacAirPage(this.driver);
    await macAirPage.clickSelectButton();
    await macAirPage.clickAddToBag();
    
    const proceedButton = await macAirPage.getProceedButton();
    const proceedButtonText = await proceedButton.getText();
    expect(proceedButtonText).to.be.equal(this.proceedButtonText);

    const productTitle = await macAirPage.getProductName();
    const productNameText = await productTitle.getText();
    expect(productNameText).to.be.equal(this.productNameText);
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
