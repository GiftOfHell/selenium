const BasePage = require("./basePage");

class MacAirPage extends BasePage {

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

  async getProceedButton() { 
    return this.findByXpath(`//*[@data-autom='proceed']`);
  }

  async getProductName() {
    return this.findByXpath(`//*[@data-autom='summaryHeaderTitle']`);
  }
}

module.exports = MacAirPage;