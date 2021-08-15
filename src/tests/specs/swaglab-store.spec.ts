import {ElementHandle, expect, Page, test} from '@playwright/test';
import 'dotenv-defaults/config';
import {Homepage} from '../pageobjects/homepage';
import {Inventory} from '../pageobjects/inventory';
import {Item} from '../pageobjects/item';

const url: string | undefined = process.env.BASE_URL;
const username: string | undefined = process.env.USERNAME;
const password: string | undefined = process.env.PASSWORD;

test.describe('E2E product purchase', () => {
  let page: Page;
  let homepage: Homepage;
  let inventoryPage: Inventory;
  let itemPage: Item;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    homepage = new Homepage(page);
    inventoryPage = new Inventory(page);
    itemPage = new Item(page);
  });

  test('Open homepage', async () => {
    await homepage.open(url as string);
    expect(await page.title()).toBe('Swag Labs');
  });

  test('Login', async () => {
    const header: string = await (
      await homepage.login(username as string, password as string)
    ).getHeaderTitle();
    expect(header).toEqual('PRODUCTS');
  });

  test('Sort products by price: Lowest to Highest', async () => {
    const expectedPriceSort = (await inventoryPage.getPrices()).sort(
      (a, b) => a - b
    );
    await inventoryPage.sortByPriceAscending();
    expect(await inventoryPage.getPrices()).toStrictEqual(expectedPriceSort);
  });

  test("Open most expensive item's page", async () => {
    const highetPrice: string = (await inventoryPage.getPrices())
      .slice(-1)[0]
      .toString();
    const mostExpensiveItem: ElementHandle = (
      await inventoryPage.getItems()
    ).slice(-1)[0];
    expect(await mostExpensiveItem.textContent()).toContain(highetPrice);
    await inventoryPage.openItemPage(mostExpensiveItem);
    expect(await itemPage.getHeaderTitle()).toEqual('BACK TO PRODUCTS');
  });

  test('Add most expensive item to shopping cart', async () => {
    await itemPage.addToShoppingCart();
    expect(await itemPage.isAddedToShoppingCart()).toBeTruthy();
  });
});
