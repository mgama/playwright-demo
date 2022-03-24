import { Locator, Page } from '@playwright/test';

export class AddCardPage {
  page: Page;
  backToManagePaymentMethodButton: Locator;
  addPaymentMethodHeader: Locator;
  cardholderNameInput: Locator;
  creditCardNumberInput: Locator;
  expirationDateInput: Locator;
  cvcInput: Locator;
  saveButton: Locator;
  cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backToManagePaymentMethodButton = page.locator('text=Back to Manage Payment Method');
    this.addPaymentMethodHeader = page.locator('text=Add Payment Method');
    this.cardholderNameInput = page.locator('input[name=cardHolderName]');
    this.creditCardNumberInput = page.locator('div#lovfield-cardInput');
    this.expirationDateInput = page.locator(''); //Pending analysis of Stripe iframe
    this.cvcInput = page.locator(''); //Pending analysis of Stripe iframe
    this.saveButton = page.locator('button#stripe-add-card-submit');
    this.cancelButton = page.locator('button#stripe-add-card-cancel');
  }

  async changeCardholderName(name: string) {
    await this.cardholderNameInput.click();
    await this.cardholderNameInput.fill(name);
  }

  async changeCardNumber(cardNumber: string) {
    await this.cardholderNameInput.click();
    await this.cardholderNameInput.fill(cardNumber);
  }

  async changeExpirationDate(expirationDate: string) {
    await this.expirationDateInput.click();
    await this.expirationDateInput.fill(expirationDate);
  }

  async changeCvc(cvc: string) {
    await this.cvcInput.click();
    await this.cvcInput.fill(cvc);
  }

  async saveChanges() {
    await this.saveButton.click();
  }

  async cancelChanges() {
    await this.cancelButton.click();
  }
}