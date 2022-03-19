import { expect, Locator, Page } from '@playwright/test';
import creds from '../data/creds.json';

export class LoginPage {
  page: Page;
  emailInput: Locator;
  passwordInput: Locator;
  submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input#email');
    this.passwordInput = page.locator('input#password');
    this.submitButton = page.locator('button#form-submit-button');
  }

  async goto() {
    await this.page.goto('https://playwright.dev');
  }

  async loginUser() {
    await this.page.goto('account/login');
    // expect(this.emailInput).toBeVisible();
    // expect(this.passwordInput).toBeVisible();
    await this.emailInput.fill(creds.emailAddress);
    await this.passwordInput.fill(creds.password);
    await Promise.all([this.page.waitForNavigation(), this.submitButton.click()]);
  }
}