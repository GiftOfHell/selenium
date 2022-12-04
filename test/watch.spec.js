const { expect } = require('chai');
const { Builder, Browser, } = require('selenium-webdriver');

const Driver = require("../driver/Driver");
const WatchPage = require("../pages/watch.page");
const DataReaderService = require("../services/dataReader.service");
const Constants = require("../config/constants");
const CartPage = require('../pages/cart.page');

describe('Add apple watch to the bag.', () => {
  before(async function () {
    const props = await DataReaderService.getTestData('watch.properties');
    for (const key in props) {
      this[key] = props[key];
    }
  })

  beforeEach(async function () {
    this.driver = await Driver.createDriver();
  });

  it('Should add Apple watch to the bag.', async function () {
    const watchPage = new WatchPage(this.driver);
    await watchPage.openPage();
    await watchPage.clickGetStarted();
    await watchPage.clickSaveButton();
    await watchPage.clickDone();
    await watchPage.selectStorageOption();
    await watchPage.clickAddToBag();
    await watchPage.reviewBag();

    const cartPage = new CartPage(this.driver);

    const productTitle = await cartPage.getProductName();
    const productNameText = await productTitle.getText();
    expect(productNameText).to.be.equal(this.productNameText);

    const productPrice = await cartPage.getProductPrice();
    const productPriceText = await productPrice.getText();
    expect(productPriceText).to.contain(this.productPriceValue);
  }).timeout(Constants.TEST_TIMEOUT);

  it('Should add Apple watch with paprameters to the bag.', async function () {
    const watchPage = new WatchPage(this.driver);
    await watchPage.openPage();
    await watchPage.clickGetStarted();
    await watchPage.selectCollection();
    await watchPage.selectSize();
    await watchPage.clickSaveButton();
    await watchPage.clickDone();
    await watchPage.selectStorageOption();
    await watchPage.selectBandSizeOption();
    await watchPage.clickAddToBag();
    await watchPage.reviewBag();

    const cartPage = new CartPage(this.driver);

    const productTitle = await cartPage.getProductName();
    const productNameText = await productTitle.getText();
    expect(productNameText).to.be.equal(this.productWithParametersNameText);

    const productPrice = await cartPage.getProductPrice();
    const productPriceText = await productPrice.getText();
    expect(productPriceText).to.contain(this.productWithParametersPriceValue);
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
