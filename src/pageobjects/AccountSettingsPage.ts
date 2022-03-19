import { Locator, Page } from '@playwright/test';
import { EditShippingAddressPage } from './EditShippingAddressPage';
import { ManagePaymentMethodPage } from './ManagePaymentMethodPage';

export class AccountSettingsPage {
  page: Page;
  editAddressBookButton: Locator;
  displayedAddress: Locator;
  addPaymentMethodButton: Locator;
  reactivateSubscriptionButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.displayedAddress = page.locator('div.global-address-display address-text');
    this.editAddressBookButton = page.locator('button#edit-address-0');
    this.addPaymentMethodButton = page.locator('button#add-payment-method');
    this.reactivateSubscriptionButton = page.locator('button#reactivate-subscription-0');
  }

  async goToEditAddressBook() {
    await this.editAddressBookButton.click();
    return new EditShippingAddressPage(this.page);
  }

  async goToManagePaymentMethod() {
    await this.addPaymentMethodButton.click();
    return new ManagePaymentMethodPage(this.page);
  }

  async goToReactivateSubscription() {
    await this.reactivateSubscriptionButton.click();
  }
}