import { Locator, Page } from '@playwright/test';

export class EditShippingAddressPage {
  page: Page;
  backToAccountSettingsButton: Locator;
  editShippingAddressHeader: Locator;
  firstNameLabel: Locator;
  firstNameInput: Locator;
  lastNameLabel: Locator;
  lastNameInput: Locator;
  companyLabel: Locator;
  companyInput: Locator;
  streetAddressLabel: Locator;
  streetAddressInput: Locator;
  aptLabel: Locator;
  aptInput: Locator;
  cityLabel: Locator;
  cityInput: Locator;
  countryLabel: Locator;
  countryDropdown: Locator;
  stateLabel: Locator;
  stateDropdown: Locator;
  zipCodeLabel: Locator;
  zipCodeInput: Locator;
  phoneNumberLabel: Locator;
  phoneNumberInput: Locator;
  saveButton: Locator;
  cancelButton: Locator;
  successfulAddressUpdateNotification: Locator;
  errorOnAddressUpdateNotification: Locator;
  requiredFieldErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backToAccountSettingsButton = page.locator('text=Back to Account Settings');
    this.editShippingAddressHeader = page.locator('text=Edit Shipping Address');
    this.firstNameLabel = page.locator('label[text=First Name]');
    this.firstNameInput = page.locator('input[name=first_name]');
    this.lastNameLabel = page.locator('label[text=Last Name]');
    this.lastNameInput = page.locator('input[name=last_name]');
    this.companyLabel = page.locator('label[text=Company (optional)]');
    this.companyInput = page.locator('input[name=company]');
    this.streetAddressLabel = page.locator('label[text=Street Address]');
    this.streetAddressInput = page.locator("input[placeholder='Street Address']");
    this.aptLabel = page.locator('label[text=Apt, Suite, or Floor (optional)]');
    this.aptInput = page.locator('input[name=line2]');
    this.cityLabel = page.locator('label[text=City]');
    this.cityInput = page.locator('input[name=city]');
    this.countryLabel = page.locator('label[text=Country]');
    this.countryDropdown = page.locator('select[name=country]');
    this.stateLabel = page.locator('label[text=State]');
    this.stateDropdown = page.locator('select[name=state]');
    this.zipCodeLabel = page.locator('label[text=ZIP code]');
    this.zipCodeInput = page.locator('input[name=zip_code]');
    this.phoneNumberLabel = page.locator('label[text=Phone Number (optional)]');
    this.phoneNumberInput = page.locator('input[name=phone_number]');
    this.saveButton = page.locator('button#lovevery-address-form-submit');
    this.cancelButton = page.locator('button#lovevery-address-form-cancel');
    this.successfulAddressUpdateNotification = page.locator('text=Address successfully updated');
    this.errorOnAddressUpdateNotification = page.locator('text=Error updating address');
    this.requiredFieldErrorMessage = page.locator('text=Required');
  }

  async changeFirstName(firstName: string) {
    await this.firstNameInput.click();
    await this.firstNameInput.fill(firstName);
  }

  async changeLastName(lastName: string) {
    await this.lastNameInput.click();
    await this.lastNameInput.fill(lastName);
  }

  async changeCompany(company: string) {
    await this.companyInput.click();
    await this.companyInput.fill(company);
  }

  async changeStreetAddress(company: string) {
    await this.streetAddressInput.click();
    await this.streetAddressInput.fill(company);
  }

  async changeApt(apt: string) {
    await this.aptInput.click();
    await this.aptInput.fill(apt);
  }

  async changeCity(city: string) {
    await this.cityInput.click();
    await this.cityInput.fill(city);
  }

  async selectCountry(country: string) {
    await this.countryDropdown.selectOption(country);
  }

  async selectState(state: string) {
    await this.stateDropdown.selectOption(state);
  }

  async changeZipCode(zipCode: string) {
    await this.zipCodeInput.click();
    await this.zipCodeInput.fill(zipCode);
  }

  async changePhoneNumber(phoneNumber: string) {
    await this.phoneNumberInput.click();
    await this.phoneNumberInput.fill(phoneNumber);
  }

  async saveChanges() {
    await this.saveButton.click();
  }

  async cancelChanges() {
    await Promise.all([this.page.waitForNavigation(), await this.cancelButton.click()]);
  }

  async waitForSuccessfulAddressUpdateNotification() {
    await this.successfulAddressUpdateNotification.waitFor({state: 'visible'});
  }

  async waitForErrorOnAddressUpdateNotification() {
    await this.errorOnAddressUpdateNotification.waitFor({state: 'visible'});
  }

  async goBackToAccountSettings() {
    await Promise.all([this.page.waitForNavigation(), await this.backToAccountSettingsButton.click()]);
  }

  async waitForRequiredFieldErrorMessage() {
    await this.requiredFieldErrorMessage.waitFor({state: 'visible'});
  }
}