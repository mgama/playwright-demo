import { expect, Locator, Page } from '@playwright/test';

export class EditChildDetailsPage {
  page: Page;
  backToProfileInfoButton: Locator;
  editChildDetailsHeader: Locator;
  nameLabel: Locator;
  nameInput: Locator;
  saveButton: Locator;
  cancelButton: Locator;
  childInfoSuccesfullyUpdatedNotification: Locator;
  errorOnChildInfoUpdateNotification: Locator;
  requiredChildNameError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backToProfileInfoButton = page.locator('text=< Back to Profile Info');
    this.editChildDetailsHeader = page.locator('text=Edit Child Details');
    this.nameLabel = page.locator('label[text=Name]');
    this.nameInput = page.locator('input[name=name]');
    this.saveButton = page.locator('button#child-details-submit');
    this.cancelButton = page.locator('button#child-details-cancel');
    this.errorOnChildInfoUpdateNotification = page.locator('text=Error updating child info');
    this.childInfoSuccesfullyUpdatedNotification = page.locator('text=Child info successfully updated');
    this.requiredChildNameError = page.locator('text=Required');
}

  async changeName(name: string) {
    await this.nameInput.click();
    await this.nameInput.fill(name);
  }

  async saveChanges() {
    await this.saveButton.click();
  }

  async cancelChanges() {
    await Promise.all([this.page.waitForNavigation(), await this.cancelButton.click()]);
  }

  async waitForSuccessfulChildInfoUpdateNotification() {
    await this.childInfoSuccesfullyUpdatedNotification.waitFor({state: 'visible'});
  }

  async waitForErrorOnChildInfoUpdateNotification() {
    await this.errorOnChildInfoUpdateNotification.waitFor({state: 'visible'});
  }

  async goBackToProfileInfo() {
    await Promise.all([this.page.waitForNavigation(), await this.backToProfileInfoButton.click()]);
  }

  async waitForErrorOnRequiredChildNameField() {
    await this.requiredChildNameError.waitFor({state: 'visible'});
  }  
}