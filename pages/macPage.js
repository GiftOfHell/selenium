const BasePage = require("./basePage");
const { By, until } = require("selenium-webdriver");

class MacPage extends BasePage {
  async clickBuyButton() {
    const button = await this.findByXpath(`//*[contains(@class, 'macbook-air')]//a[contains(text(), 'Buy')]`);
    await button.click();

    return this;
  }

  async clickSelectButton() {
    const button = await this.findByXpath(`//*[@data-autom='proceed-13inch-better']`);
    await button.click();

    return this;
  }

  async clickAddToBag() {
    const button = await this.findByXpath(`//*[@data-autom='addToCart']`);
    await button.click();

    return this;
  }

  async reviewBagRendered() {
    await this.findByXpath(`//*[@data-autom='proceed']`);

    return this;
  }
}

module.exports = MacPage;
