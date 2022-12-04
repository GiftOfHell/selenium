const { expect } = require('chai');
const { Builder, Browser, } = require('selenium-webdriver');

const Driver = require("../driver/Driver");
const MacPage = require("../pages/mac.page");
const MacAirPage = require("../pages/macAir.page");
const DataReaderService = require("../services/dataReader.service");
const Constants = require("../config/constants");
const CartPage = require('../pages/cart.page');

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

    const cartPage = new CartPage(this.driver);

    const productTitle = await cartPage.getProductName();
    const productNameText = await productTitle.getText();
    expect(productNameText).to.be.equal(this.productNameText);

    const productPrice = await cartPage.getProductPrice();
    const productPriceText = await productPrice.getText();
    expect(productPriceText).to.contain(this.productPriceValue);
  }).timeout(Constants.TEST_TIMEOUT);

  it("Should remove item from the cart", async function() {
    const macPage = new MacPage(this.driver);
    await macPage.openPage();
    await macPage.clickBuyButton();

    const macAirPage = new MacAirPage(this.driver);
    await macAirPage.clickSelectButton();
    await macAirPage.clickAddToBag();
    await macAirPage.clickReviewBag();

    const cartPage = new CartPage(this.driver);
    await cartPage.removeItemFromCart();

    const heading = await cartPage.getHeading();
    const headingText = await heading.getText();
    expect(headingText).to.be.equal(this.emptyCartHeading);
  }).timeout(Constants.TEST_TIMEOUT);

  it('Price should change according to the device configuration.', async function () {
    const macPage = new MacPage(this.driver);
    await macPage.openPage();
    await macPage.clickBuyButton();

    const macAirPage = new MacAirPage(this.driver);
    await macAirPage.clickSelectButton();
    await macAirPage.selectStorageOption();

    const productPrice = await macAirPage.getProductPrice();
    const productPriceText = await productPrice.getText();
    expect(productPriceText).to.contain(this.extendedStorageProductPriceValue);
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
