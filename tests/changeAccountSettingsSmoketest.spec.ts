import { test, expect } from '@playwright/test';
import {LoginPage} from '../src/pageobjects/LoginPage';
import {MyAccountPage} from '../src/pageobjects/MyAccountPage';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginUser();
  });

test('Change Address Values (valid US Address) on Account Settings and Cancel Changes smoketest', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    const accountSettingsPage = await myAccountPage.goToAccountSettings();
    const editShippingAddressPage = await accountSettingsPage.goToEditAddressBook();
    await editShippingAddressPage.changeFirstName('Manuel');
    await expect(editShippingAddressPage.firstNameInput).toHaveValue('Manuel');
    await editShippingAddressPage.changeLastName('Gama');
    await expect(editShippingAddressPage.lastNameInput).toHaveValue('Gama');
    await editShippingAddressPage.changeCompany('Gama Inc.');
    await expect(editShippingAddressPage.companyInput).toHaveValue('Gama Inc.');
    await editShippingAddressPage.changeStreetAddress('25 Worcester Road');
    await expect(editShippingAddressPage.streetAddressInput).toHaveValue('25 Worcester Road');
    await editShippingAddressPage.changeApt('Apt 501');
    await expect(editShippingAddressPage.aptInput).toHaveValue('Apt 501');
    await editShippingAddressPage.changeCity('Boston');
    await expect(editShippingAddressPage.cityInput).toHaveValue('Boston');
    await editShippingAddressPage.selectCountry('United States');
    await expect(editShippingAddressPage.countryDropdown).toHaveValue('United States');
    await editShippingAddressPage.selectState('Massachusetts');
    await expect(editShippingAddressPage.stateDropdown).toHaveValue('Massachusetts');
    await editShippingAddressPage.changeZipCode('02131');
    await expect(editShippingAddressPage.zipCodeInput).toHaveValue('02131');
    await editShippingAddressPage.changePhoneNumber('6175552340');
    await expect(editShippingAddressPage.phoneNumberInput).toHaveValue('6175552340');
    await editShippingAddressPage.cancelChanges();
});
