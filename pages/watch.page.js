const BasePage = require("./base.page");
const logger = require("../logger");

class WatchPage extends BasePage {
  static PAGE_URL = 'https://www.apple.com/shop/studio/apple-watch';
  static GET_STARTED_BUTTON_XPATH = `//*[@data-autom='getStarted']`;
  static SAVE_BUTTON_XPATH = `//*[@class='rf-designstudio-button-container']/button`;
  static DONE_BUTTON_XPATH = `//*[@data-autom='done-button']`;
  static CONNECTIVITY_OPTION_XPATH = `//*[@data-autom='watch_cases_dimensionConnectiongps']`;
  static PROCEED_BUTTON_XPATH = `//*[@data-autom='proceed']`;
  static ADD_TO_BAG_BUTTON_XPATH = `//*[@data-autom='add-to-cart']`;
  static COLLECTIONS_BUTTON_XPATH = `//*[@data-autom='Collections']`;
  static COLLECTIONS_OPTION_XPATH = `//*[@data-autom='Apple Watch SE']`;
  static SIZE_BUTTON_XPATH = `//*[@data-autom='size']`;
  static SIZE_OPTION_XPATH = `//*[@data-autom='size-2']/..`;
  static BAND_SIZE_OPTION_XPATH = `//*[@data-autom='watch_bands_dimensionbandsize_12']`;

  openPage = async () => super.openPage(WatchPage.PAGE_URL);

  async clickGetStarted() {
    logger.info("Clicking the get started button.");
    const button = await this.findByXpath(WatchPage.GET_STARTED_BUTTON_XPATH);
    await button.click();

    return this;
  }

  async clickSaveButton() {
    logger.info("Clicking the save button.");
    await this.driver.sleep(2000);
    const button = await this.findByXpath(WatchPage.SAVE_BUTTON_XPATH);
    await button.click();

    return this;
  }

  async clickDone() { 
    logger.info("Clicking the done button.");
    const button = await this.findByXpath(WatchPage.DONE_BUTTON_XPATH);
    await button.click();
  }

  async getProceedButton() { 
    logger.info("Clicking proceed button.");
    return this.findByXpath(WatchPage.PROCEED_BUTTON_XPATH);
  }

  async reviewBag() {
    logger.info("Clicking the review bag.");
    const button = await this.getProceedButton();
    await button.click();

    return this;
  }

  async clickAddToBag() {
    logger.info("Clicking the add to bag button.");
    const button = await this.findByXpath(WatchPage.ADD_TO_BAG_BUTTON_XPATH);
    await button.click();

    return this;
  }

  async selectStorageOption() {
    logger.info("Selecting the connectivity option.");
    const button = await this.findByXpath(WatchPage.CONNECTIVITY_OPTION_XPATH);
    await this.driver.executeScript("arguments[0].click()", button)

    return this;
  }

  async clickCollections() { 
    logger.info("Clicking the collection button.");
    const button = await this.findByXpath(WatchPage.COLLECTIONS_BUTTON_XPATH);
    await button.click();
  }

  async selectCollection() {
    const collection = await this.clickCollections();
    logger.info("Selecting collection.");
    const button = await this.findByXpath(WatchPage.COLLECTIONS_OPTION_XPATH);
    await button.click();
  }

  async clickSize() { 
    logger.info("Clicking the size button.");
    await this.driver.sleep(2000);
    const button = await this.findByXpath(WatchPage.SIZE_BUTTON_XPATH);
    await button.click();
  }

  async selectSize() {
    const size = await this.clickSize();
    logger.info("Selecting size.");
    const button = await this.findByXpath(WatchPage.SIZE_OPTION_XPATH);
    await button.click();
  }

  async selectBandSizeOption() {
    logger.info("Selecting the band size option.");
    const button = await this.findByXpath(WatchPage.BAND_SIZE_OPTION_XPATH);
    await this.driver.executeScript("arguments[0].click()", button)

    return this;
  }
}

module.exports = WatchPage;