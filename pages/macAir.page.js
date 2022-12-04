const BasePage = require("./base.page");
const logger = require("../logger");

class MacAirPage extends BasePage {
  static SELECT_BUTTON_XPATH = `//*[@data-autom='proceed-13inch-better']`;
  static ADD_TO_BAG_BUTTON_XPATH = `//*[@data-autom='addToCart']`;
  static PROCEED_BUTTON_XPATH = `//*[@data-autom='proceed']`;
  static PRODUCT_NAME_XPATH = `//*[@data-autom='bag-item-name']`;
  static PRODUCT_PRICE_XPATH = `//*[contains(@class, 'rs-iteminfo-pricedetails')]/div[contains(@class, 'rs-iteminfo-price')]`;

  async clickSelectButton() {
    logger.info("Clicking the select button.");
    const button = await this.findByXpath(MacAirPage.SELECT_BUTTON_XPATH);
    await button.click();

    return this;
  }

  async clickAddToBag() {
    logger.info("Clicking the add to bag button.");
    const button = await this.findByXpath(MacAirPage.ADD_TO_BAG_BUTTON_XPATH);
    await button.click();

    return this;
  }

  async getProceedButton() { 
    logger.info("Clicking proceed button.");
    return this.findByXpath(MacAirPage.PROCEED_BUTTON_XPATH);
  }

  async getProductName() {
    logger.info("Getting the product name.");
    return this.findByXpath(MacAirPage.PRODUCT_NAME_XPATH);
  }

  async clickReviewBag() {
    logger.info("Clicking the review bag.");
    const button = await this.getProceedButton();
    await button.click();

    return this;
  }

  async getProductPrice() {
    logger.info("Getting the product price.");
    return this.findByXpath(MacAirPage.PRODUCT_PRICE_XPATH);
  }
}

module.exports = MacAirPage;