import {Page} from '@playwright/test';

export class Item {
  readonly page: Page;
  headerTitleSelector = '[data-test=back-to-products]';
  cartAddRemoveButtonSelector = '.btn_inventory';
  cartBadgeSelector = '.shopping_cart_badge';

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

  async isAddedToShoppingCart(): Promise<boolean> {
    const cartButtonText: string = await this.page.innerText(
      this.cartAddRemoveButtonSelector
    );
    const numberOfProductsAddedToCart: string = await this.page.innerText(
      this.cartBadgeSelector
    );
    return cartButtonText === 'REMOVE' && numberOfProductsAddedToCart === '1';
  }
}
