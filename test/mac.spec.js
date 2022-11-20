const { expect } = require('chai');
const { Builder, Browser, } = require('selenium-webdriver');
const MacPage = require("../pages/macPage");
const MacAirPage = require("../pages/macAirPage");

describe('Add items to bag.', () => {
  beforeEach(async function () {
    this.driver = new Builder().
    forBrowser(Browser.CHROME).
    build();
    await this.driver.manage().window().maximize();
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
    expect(proceedButtonText).to.be.equal("Review Bag");

    const productTitle = await macAirPage.getProductName();
    const productNameText = await productTitle.getText();
    expect(productNameText).to.be.equal("MacBook Air with M2 chip - Midnight");
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
