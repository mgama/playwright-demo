import { expect, Locator, Page } from '@playwright/test';
import { EditChildDetailsPage } from './EditChildDetailsPage';
import { EditContactDetailsPage } from './EditContactDetailsPage';

export class ProfileInfoPage {
  page: Page;
  contactDetailsHeader: Locator;
  editContactDetailsButton: Locator;
  changePasswordButton: Locator;
  editChildDetailsButton: Locator;
  contactDetailsName: Locator;
  contactDetailsEmail: Locator;
  childDetailsName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactDetailsHeader = page.locator('h4[text=Contact Details]');
    // this.contactDetailsName = page.locator("div[text='Name:']");
    this.contactDetailsName = page.locator('text=Name:');
    this.editContactDetailsButton = page.locator('button#edit-contact-details');
    this.changePasswordButton = page.locator('button#edit-contact-details'); //Extra locator. Not needed for current test cases
    this.editChildDetailsButton = page.locator('button#child-0-edit'); //Temporary harcoded to only first child
  }

  async goToEditContactDetails() {
    // expect(this.editContactDetailsButton).toBeVisible();
    await this.editContactDetailsButton.click();
    return new EditContactDetailsPage(this.page);
  }

  async goToEditChildDetails() {
    // expect(this.editChildDetailsButton).toBeVisible();
    await this.editChildDetailsButton.click();
    return new EditChildDetailsPage(this.page);
  }
}