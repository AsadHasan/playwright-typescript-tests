import {expect, Page, test} from '@playwright/test';
import 'dotenv-defaults/config';
import {Homepage} from '../pageobjects/homepage';
import {Inventory} from '../pageobjects/inventory';

const url: string | undefined = process.env.BASE_URL;
const username: string | undefined = process.env.USERNAME;
const password: string | undefined = process.env.PASSWORD;

test.describe('E2E product purchase', () => {
  let page: Page;
  let homepage: Homepage;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    homepage = new Homepage(page);
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
    const inventoryPage: Inventory = new Inventory(page);
    const expectedPriceSort = (await inventoryPage.getPrices()).sort(
      (a, b) => a - b
    );
    await inventoryPage.sortByPriceAscending();
    expect(await inventoryPage.getPrices()).toStrictEqual(expectedPriceSort);
  });
});
