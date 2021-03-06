import { Locator, Page } from '@playwright/test';

export class EditContactDetailsPage {
  page: Page;
  backToProfileInfoButton: Locator;
  editContactDetailsHeader: Locator;
  firstNameLabel: Locator;
  firstNameInput: Locator;
  lastNameLabel: Locator;
  lastNameInput: Locator;
  emailLabel: Locator;
  emailInput: Locator;
  saveButton: Locator;
  cancelButton: Locator;
  profileSuccesfullyUpdatedNotification: Locator;
  errorOnProfileUpdateNotification: Locator;
  requiredFieldError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backToProfileInfoButton = page.locator('text=< Back to Profile Info');
    this.editContactDetailsHeader = page.locator('text=Edit Contact Details');
    this.firstNameLabel = page.locator('label[text=First Name]');
    this.firstNameInput = page.locator('input[name=first_name]');
    this.lastNameLabel = page.locator('label[text=Last Name]');
    this.lastNameInput = page.locator('input[name=last_name]');
    this.emailLabel = page.locator('label[text=Email]'); //Extra locator not required for current test cases
    this.emailInput = page.locator('input[name=email]'); //Extra locator not required for current test cases
    this.saveButton = page.locator('button#user-details-submit');
    this.cancelButton = page.locator('button#user-details-cancel');
    this.profileSuccesfullyUpdatedNotification = page.locator('text=Profile info successfully updated');
    this.errorOnProfileUpdateNotification = page.locator('text=Error updating profile info');
    this.requiredFieldError = page.locator('text=Required');
  }

  async changeFirstName(firstName: string) {
    await this.firstNameInput.click();
    await this.firstNameInput.fill(firstName);
  }

  async changeLastName(lastName: string) {
    await this.lastNameInput.click();
    await this.lastNameInput.fill(lastName);
  }

  async saveChanges() {
    await this.saveButton.click();
  }

  async cancelChanges() {
    await Promise.all([this.page.waitForNavigation(), await this.cancelButton.click()]);
  }

  async waitForSuccessfulProfileUpdateNotification() {
    await this.profileSuccesfullyUpdatedNotification.waitFor({state: 'visible'});
  }

  async waitForErrorOnProfileUpdateNotification() {
    await this.errorOnProfileUpdateNotification.waitFor({state: 'visible'});
  }

  async goBackToProfileInfo() {
    await Promise.all([this.page.waitForNavigation(), await this.backToProfileInfoButton.click()]);
  }

  async waitForRequiredFieldError() {
    await this.requiredFieldError.waitFor({state: 'visible'});
  }
}