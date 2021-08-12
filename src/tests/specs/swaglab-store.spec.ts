import {expect, test} from '@playwright/test';
import 'dotenv-defaults/config';
import {Homepage} from '../pageobjects/homepage';

const url: string | undefined = process.env.BASE_URL;
const username: string | undefined = process.env.USERNAME;
const password: string | undefined = process.env.PASSWORD;

test.describe('E2E product purchase', () => {
  test('Login', async ({page}) => {
    const homepage: Homepage = new Homepage(page);
    await (
      await homepage.open(url as string)
    ).login(username as string, password as string);
    const header: string = await page.innerText('.title');
    expect(header).toEqual('PRODUCTS');
  });
});
