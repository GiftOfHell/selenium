const { Key, until, By } = require("selenium-webdriver");

const BasePage = require("./basePage");

class AirpodsPage extends BasePage {
  static PAGE_URL = 'https://www.apple.com/shop/product/MQD83AM/A/airpods-pro';

  openPage = async () => super.openPage(AirpodsPage.PAGE_URL);

  async clickEngraveButton() {
    const button = await this.findByXpath(`//*[contains(@data-autom, 'addEngraving-app')]`);
    await button.click();

    return this;
  }

  async inputValidEngravingValue(text) {
    const textInput = await this.findByXpath(`//*[contains(@data-autom, 'Engraveline1')]`);
    await textInput.sendKeys(text, Key.ENTER);

    return this;
  }

  async getEngraveImage() {
    await this.driver.sleep(5000);
    return this.findByXpath(`//*[contains(@data-autom, 'preview-image')]`);
  }

  async getEngraveValidationMessage() {
    await this.driver.sleep(5000);
    return this.findByXpath(`//*[contains(@data-autom, 'engraveValidationMsg')]`);
  }
}

module.exports = AirpodsPage;
