import {ElementHandle, Page} from '@playwright/test';
import {Item} from './item';

export class Inventory {
  readonly page: Page;
  headerTitleSelector = '.title';
  sortDropdownSelector = '[data-test=product_sort_container]';
  pricesSelector = '.inventory_item_price';
  itemsSelector = '.inventory_item_description';

  constructor(page: Page) {
    this.page = page;
  }

  getHeaderTitle(): Promise<string> {
    return this.page.innerText(this.headerTitleSelector);
  }

  getItems(): Promise<ElementHandle[]> {
    return this.page.$$(this.itemsSelector);
  }

  async sortByNameAscending(): Promise<Inventory> {
    await this.sortProductsByValue('az');
    return this;
  }
  async sortByNameDescending(): Promise<Inventory> {
    await this.sortProductsByValue('za');
    return this;
  }
  async sortByPriceAscending(): Promise<Inventory> {
    await this.sortProductsByValue('lohi');
    return this;
  }
  async sortByPriceDescending(): Promise<Inventory> {
    await this.sortProductsByValue('hilo');
    return this;
  }

  async getPrices(): Promise<number[]> {
    const priceTagElements: ElementHandle[] = await this.page.$$(
      this.pricesSelector
    );
    return Promise.all(
      priceTagElements.map(
        async priceTagElement =>
          +(await priceTagElement.innerText()).replace('$', '')
      )
    );
  }

  async openItemPage(element: ElementHandle): Promise<Item> {
    (await element.$(' .inventory_item_name'))?.click();
    return new Item(this.page);
  }

  private async sortProductsByValue(value: string): Promise<void> {
    await this.page.selectOption(this.sortDropdownSelector, value);
  }
}
