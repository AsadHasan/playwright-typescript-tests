import {Page} from '@playwright/test';
import {Inventory} from './inventory';

export class Homepage {
  readonly page: Page;
  usernameFieldSelector = '[data-test=username]';
  passwordFieldSelector = '[data-test=password]';
  loginButtonSelector = '[data-test=login-button]';

  constructor(page: Page) {
    this.page = page;
  }

  async open(url: string): Promise<Homepage> {
    await this.page.goto(url);
    return this;
  }

  async login(username: string, password: string): Promise<Inventory> {
    await this.page.type(this.usernameFieldSelector, username);
    await this.page.type(this.passwordFieldSelector, password);
    await this.page.click(this.loginButtonSelector);
    return new Inventory(this.page);
  }
}
