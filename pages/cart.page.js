const { Select } = require('selenium-webdriver')

const BasePage = require("./base.page");
const logger = require("../logger");

class CartPage extends BasePage {
  static PRODUCT_NAME_XPATH = `//*[@data-autom='bag-item-name']`;
  static PRODUCT_PRICE_XPATH = `//*[contains(@class, 'rs-iteminfo-pricedetails')]/div[contains(@class, 'rs-iteminfo-price')]`;
  static REMOVE_ITEM_BUTTON_XPATH = `//*[@data-autom='bag-item-remove-button']`
  static HEADING_XPATH = '//h1';
  static AMOUNT_OF_ITEMS_XPATH = `//*[@data-autom='item-quantity-dropdown']`

  async getProductName() {
    logger.info("Getting the product name.");
    return this.findByXpath(CartPage.PRODUCT_NAME_XPATH);
  }

  async getProductPrice() {
    logger.info("Getting the product price.");
    return this.findByXpath(CartPage.PRODUCT_PRICE_XPATH);
  }

  async removeItemFromCart() {
    logger.info("Removing the item from the cart.");
    const button = await this.findByXpath(CartPage.REMOVE_ITEM_BUTTON_XPATH);
    await button.click();
    await this.driver.sleep(5000);

    return this;
  }

  async getHeading() {
    logger.info("Getting the cart page heading");

    return this.findByXpath(CartPage.HEADING_XPATH);
  }
}

module.exports = CartPage;