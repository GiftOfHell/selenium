const BasePage = require("./base.page");
const logger = require("../logger");

class MacPage extends BasePage {
  static PAGE_URL = 'https://www.apple.com/mac';
  static BUY_BUTTON_XPATH = `//*[contains(@class, 'macbook-air')]//a[contains(text(), 'Buy')]`;

  openPage = async () => super.openPage(MacPage.PAGE_URL);

  async clickBuyButton() {
    logger.info("Clicking the buy button.");
    const button = await this.findByXpath(MacPage.BUY_BUTTON_XPATH);
    await button.click();

    return this;
  }
}

module.exports = MacPage;
