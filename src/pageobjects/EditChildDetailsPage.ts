import { expect, Locator, Page } from '@playwright/test';

export class EditChildDetailsPage {
  page: Page;
  backToProfileInfoButton: Locator;
  editChildDetailsHeader: Locator;
  nameLabel: Locator;
  nameInput: Locator;
  saveButton: Locator;
  cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backToProfileInfoButton = page.locator('text=Back to Profile Info');
    this.editChildDetailsHeader = page.locator('text=Edit Child Details');
    this.nameLabel = page.locator('label[text=Name]');
    this.nameInput = page.locator('input[name=name]');
    this.saveButton = page.locator('button#child-details-submit');
    this.cancelButton = page.locator('button#child-details-cancel');
  }

  async changeName(name: string) {
    // expect(this.nameInput).toBeEnabled();
    await this.nameInput.click();
    await this.nameInput.fill(name);
  }

  async saveChanges() {
    await this.saveButton.click();
  }

  async cancelChanges() {
    await Promise.all([this.page.waitForNavigation(), await this.cancelButton.click()]);
  }
}