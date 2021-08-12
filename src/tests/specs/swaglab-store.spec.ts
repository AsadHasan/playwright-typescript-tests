import {expect, Page, test} from '@playwright/test';
import 'dotenv-defaults/config';
import {Homepage} from '../pageobjects/homepage';

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
    await homepage.login(username as string, password as string);
    const header: string = await page.innerText('.title');
    expect(header).toEqual('PRODUCTS');
  });
});
