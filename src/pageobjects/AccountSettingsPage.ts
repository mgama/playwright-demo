import { expect, Locator, Page } from '@playwright/test';

export class AccountSettingsPage {
  page: Page;
  accountPopOverName: Locator;
  profileInfoMenuOption: Locator;
  accountSettingsMenuOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountPopOverName = page.locator('my-account-popover-name');
    this.profileInfoMenuOption = page.locator('text=Profile Info');
    this.accountSettingsMenuOption = page.locator('text=Account Settings');
  }

  async goToProfileInfo() {
    expect(this.profileInfoMenuOption).toBeVisible();
    await this.profileInfoMenuOption.click();
  }

  async goToAccountSettings() {
    expect(this.accountSettingsMenuOption).toBeVisible();
    await this.accountSettingsMenuOption.click();
  }
}