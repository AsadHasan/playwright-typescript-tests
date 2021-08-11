import {expect, test} from '@playwright/test';
import 'dotenv-defaults/config';

const url: string | undefined = process.env.BASE_URL;
const username: string | undefined = process.env.USERNAME;
const password: string | undefined = process.env.PASSWORD;

test.describe('E2E product purchase', () => {
  test('Login', async ({page}) => {
    await page.goto(url as string);
    await page.type('[data-test=username]', username as string);
    await page.type('[data-test=password]', password as string);
    await page.click('[data-test=login-button]');
    const header: string = await page.innerText('.title');
    expect(header).toEqual('PRODUCTS');
  });
});
