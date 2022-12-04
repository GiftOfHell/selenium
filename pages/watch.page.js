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

  openPage = async () => super.openPage(WatchPage.PAGE_URL);

  async clickGetStarted() {
    logger.info("Clicking the get started button.");
    const button = await this.findByXpath(WatchPage.GET_STARTED_BUTTON_XPATH);
    await button.click();

    return this;
  }

  async clickSave() {
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

  async clickReviewBag() {
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
}

module.exports = WatchPage;