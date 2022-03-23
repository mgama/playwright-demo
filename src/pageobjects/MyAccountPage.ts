import { expect, Locator, Page } from '@playwright/test';
import { ProfileInfoPage } from './ProfileInfoPage';
import { AccountSettingsPage } from './AccountSettingsPage';

export class MyAccountPage {
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

  async goTo() {
    await this.page.goto('/account');
  }

  async goToProfileInfo() {
    // expect(this.profileInfoMenuOption).toBeVisible();
    await this.profileInfoMenuOption.click();
    return new ProfileInfoPage(this.page);
  }

  async goToAccountSettings() {
    // expect(this.accountSettingsMenuOption).toBeVisible();
    await this.accountSettingsMenuOption.click();
    return new AccountSettingsPage(this.page);
  }
}