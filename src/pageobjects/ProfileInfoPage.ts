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
    // Brittle locator but was neccesary since there is not a test-id or id to use
    this.contactDetailsName = page.locator('#page-container-desktop > div > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div > div:nth-of-type(2)');
    this.editContactDetailsButton = page.locator('button#edit-contact-details');
    this.changePasswordButton = page.locator('button#edit-contact-details'); //Extra locator. Not needed for current test cases
    this.editChildDetailsButton = page.locator('button#child-0-edit'); //Temporary harcoded to only first child
    this.childDetailsName = page.locator('#page-container-desktop > div > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2)');
}

  async goToEditContactDetails() {
    await this.editContactDetailsButton.click();
    return new EditContactDetailsPage(this.page);
  }

  async goToEditChildDetails() {
    await this.editChildDetailsButton.click();
    return new EditChildDetailsPage(this.page);
  }
}