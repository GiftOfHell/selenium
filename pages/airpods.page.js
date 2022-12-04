const { Key, until, By } = require("selenium-webdriver");

const BasePage = require("./base.page");
const logger = require("../logger");

class AirpodsPage extends BasePage {
  static PAGE_URL = 'https://www.apple.com/shop/product/MQD83AM/A/airpods-pro';
  static ENGRAVE_BUTTON_XPATH = `//*[contains(@data-autom, 'addEngraving-app')]`;
  static ENGRAVING_INPUT_XPATH = `//*[contains(@data-autom, 'Engraveline1')]`;
  static ENGRAVE_IMAGE_XPATH = `//*[contains(@data-autom, 'preview-image')]`;
  static ENGRAVE_VALIDATION_MESSAGE_XPATH = `//*[contains(@data-autom, 'engraveValidationMsg')]`;

  openPage = async () => super.openPage(AirpodsPage.PAGE_URL);

  async clickEngraveButton() {
    logger.info("Clicking the engrave button.");
    const button = await this.findByXpath(AirpodsPage.ENGRAVE_BUTTON_XPATH);
    await button.click();

    return this;
  }

  async inputValidEngravingValue(text) {
    logger.info("Entering the valid engraving value.");
    const textInput = await this.findByXpath(AirpodsPage.ENGRAVING_INPUT_XPATH);
    await textInput.sendKeys(text, Key.ENTER);

    return this;
  }

  async getEngraveImage() {
    logger.info("Getting the engrave image.");
    await this.driver.sleep(5000);
    return this.findByXpath(AirpodsPage.ENGRAVE_IMAGE_XPATH);
  }

  async getEngraveValidationMessage() {
    logger.info("Getting the engrave validation message.");
    await this.driver.sleep(5000);
    return this.findByXpath(AirpodsPage.ENGRAVE_VALIDATION_MESSAGE_XPATH);
  }
}

module.exports = AirpodsPage;
