import { expect, Locator, Page } from '@playwright/test';

export class ManagePaymentMethodPage {
  page: Page;
  backToAccountSettingsButton: Locator;
  managePaymentMethodHeader: Locator;
  addPaymentMethodButton: Locator;
  nameInput: Locator;
  saveButton: Locator;
  cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backToAccountSettingsButton = page.locator('text=Back to Account Settings');
    this.managePaymentMethodHeader = page.locator('text=Manage Payment Method');
    this.addPaymentMethodButton = page.locator('a#add-payment-method');
  }

  async goToAddPaymentMethod() {
    await this.addPaymentMethodButton.click();
  }
}