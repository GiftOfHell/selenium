const { expect } = require('chai');
const { Builder, Browser, } = require('selenium-webdriver');
const MacPage = require("../pages/macPage");

describe('Buy mac item.', () => {
  const pageUrl = 'https://www.apple.com/mac';

  beforeEach(async function () {
    this.driver = new Builder().
    usingServer('http://localhost:4444/wd/hub').
    build();
    await this.driver.manage().window().maximize();
  });

  it('Should test blabla.', async function () {
    const macPage = new MacPage(this.driver);
    await macPage.openPage(pageUrl);
    await macPage.clickBuyButton();
    await macPage.clickSelectButton();
    await macPage.clickAddToBag();
    await macPage.reviewBagRendered();
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
