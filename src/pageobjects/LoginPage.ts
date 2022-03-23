import { Locator, Page } from '@playwright/test';
import creds from '../data/creds.json';

export class LoginPage {
  page: Page;
  emailInput: Locator;
  passwordInput: Locator;
  submitButton: Locator;
  baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.emailInput = page.locator('input#email');
    this.passwordInput = page.locator('input#password');
    this.submitButton = page.locator('button#form-submit-button');
    this.baseUrl = baseUrl;
  }

  async loginUser() {
    await this.page.goto(this.baseUrl + '/login');
    await this.emailInput.fill(creds.emailAddress);
    await this.passwordInput.fill(creds.password);
    await Promise.all([this.page.waitForNavigation(), this.submitButton.click()]);
  }
}