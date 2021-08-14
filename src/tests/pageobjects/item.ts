import {Page} from '@playwright/test';

export class Item {
  readonly page: Page;
  headerTitleSelector = '[data-test=back-to-products]';
  cartAddRemoveButtonSelector = '.btn_inventory';

  constructor(page: Page) {
    this.page = page;
  }

  async getHeaderTitle(): Promise<string> {
    return this.page.innerText(this.headerTitleSelector);
  }

  async addToShoppingCart(): Promise<Item> {
    await this.page.click(this.cartAddRemoveButtonSelector);
    return this;
  }
}
