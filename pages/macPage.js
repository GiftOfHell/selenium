const BasePage = require("./basePage");

class MacPage extends BasePage {
  static PAGE_URL = 'https://www.apple.com/mac';

  openPage = async () => super.openPage(MacPage.PAGE_URL);

  async clickBuyButton() {
    const button = await this.findByXpath(`//*[contains(@class, 'macbook-air')]//a[contains(text(), 'Buy')]`);
    await button.click();

    return this;
  }
}

module.exports = MacPage;
