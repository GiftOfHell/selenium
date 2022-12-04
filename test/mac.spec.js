const { expect } = require('chai');
const { Builder, Browser, } = require('selenium-webdriver');

const Driver = require("../driver/Driver");
const MacPage = require("../pages/mac.page");
const MacAirPage = require("../pages/macAir.page");
const DataReaderService = require("../services/dataReader.service");
const Constants = require("../config/constants");

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
    await macAirPage.clickReviewBag();

    const productTitle = await macAirPage.getProductName();
    const productNameText = await productTitle.getText();
    expect(productNameText).to.be.equal(this.productNameText);

    const productPrice = await macAirPage.getProductPrice();
    const productPriceText = await productPrice.getText();
    expect(productPriceText).to.contain(this.productPriceValue);
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
