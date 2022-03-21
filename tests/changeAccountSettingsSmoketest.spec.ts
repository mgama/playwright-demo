import { test, expect } from '@playwright/test';
import {LoginPage} from '../src/pageobjects/LoginPage';
import {MyAccountPage} from '../src/pageobjects/MyAccountPage';
// import originalAccountSettingsTestData from '../src/data/originalAccountSettingsTestData.json';
import GenerateRandomData from '../src/data/GenerateRandomData';

test.describe('Change Account Settings Smoketests', () => {

    const generateRandomData = new GenerateRandomData()
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginUser();
    });

    /*test.afterEach(async ({ page }) => {
        // Procedure to restore the original test data
        const myAccountPage = new MyAccountPage(page);
        const accountSettingsPage = await myAccountPage.goToAccountSettings();
        const originalAddress = await accountSettingsPage.displayedAddress.innerText();
        const editShippingAddressPage = await accountSettingsPage.goToEditAddressBook();
        await editShippingAddressPage.changeFirstName(originalAccountSettingsTestData.firstName);
        await expect(editShippingAddressPage.firstNameInput).toHaveValue(originalAccountSettingsTestData.firstName);
        await editShippingAddressPage.changeLastName(originalAccountSettingsTestData.lastName);
        await expect(editShippingAddressPage.lastNameInput).toHaveValue(originalAccountSettingsTestData.lastName);
        await editShippingAddressPage.changeCompany(originalAccountSettingsTestData.company);
        await expect(editShippingAddressPage.companyInput).toHaveValue(originalAccountSettingsTestData.company);
        await editShippingAddressPage.changeStreetAddress(originalAccountSettingsTestData.streetAddress);
        await expect(editShippingAddressPage.streetAddressInput).toHaveValue(originalAccountSettingsTestData.streetAddress);
        await editShippingAddressPage.changeApt(originalAccountSettingsTestData.apt);
        await expect(editShippingAddressPage.aptInput).toHaveValue(originalAccountSettingsTestData.apt);
        await editShippingAddressPage.changeCity(originalAccountSettingsTestData.city);
        await expect(editShippingAddressPage.cityInput).toHaveValue(originalAccountSettingsTestData.city);
        await editShippingAddressPage.selectCountry(originalAccountSettingsTestData.country);
        await expect(editShippingAddressPage.countryDropdown).toHaveValue(originalAccountSettingsTestData.country);
        await editShippingAddressPage.selectState(originalAccountSettingsTestData.state);
        await expect(editShippingAddressPage.stateDropdown).toHaveValue(originalAccountSettingsTestData.state);
        await editShippingAddressPage.changeZipCode(originalAccountSettingsTestData.zipCode);
        await expect(editShippingAddressPage.zipCodeInput).toHaveValue(originalAccountSettingsTestData.zipCode);
        await editShippingAddressPage.changePhoneNumber(originalAccountSettingsTestData.phoneNumber);
        await expect(editShippingAddressPage.phoneNumberInput).toHaveValue(originalAccountSettingsTestData.phoneNumber);
        await editShippingAddressPage.saveChanges();
        await editShippingAddressPage.waitForSuccessfulAddressUpdateNotification();
        await editShippingAddressPage.goBackToAccountSettings();
        const displayedAddressAfterSavingChanges = await accountSettingsPage.displayedAddress.innerText();
        expect(displayedAddressAfterSavingChanges).not.toMatch(originalAddress);
    });*/

    test('Change All Address Values (valid US Address) on Account Settings and Cancel Changes smoketest', async ({ page }) => {
        const myAccountPage = new MyAccountPage(page);
        const accountSettingsPage = await myAccountPage.goToAccountSettings();
        const originalAddress = await accountSettingsPage.displayedAddress.innerText();
        const editShippingAddressPage = await accountSettingsPage.goToEditAddressBook();
        const randomStringForTestData = await generateRandomData.generateRandomString();
        await editShippingAddressPage.changeFirstName(randomStringForTestData);
        await expect(editShippingAddressPage.firstNameInput).toHaveValue(randomStringForTestData);
        await editShippingAddressPage.changeLastName(randomStringForTestData);
        await expect(editShippingAddressPage.lastNameInput).toHaveValue(randomStringForTestData);
        await editShippingAddressPage.changeCompany(randomStringForTestData);
        await expect(editShippingAddressPage.companyInput).toHaveValue(randomStringForTestData);
        await editShippingAddressPage.changeStreetAddress(randomStringForTestData);
        await expect(editShippingAddressPage.streetAddressInput).toHaveValue(randomStringForTestData);
        await editShippingAddressPage.changeApt(randomStringForTestData);
        await expect(editShippingAddressPage.aptInput).toHaveValue(randomStringForTestData);
        await editShippingAddressPage.changeCity(randomStringForTestData);
        await expect(editShippingAddressPage.cityInput).toHaveValue(randomStringForTestData);
        await editShippingAddressPage.selectCountry('United States');
        await expect(editShippingAddressPage.countryDropdown).toHaveValue('United States');
        await editShippingAddressPage.selectState('Massachusetts');
        await expect(editShippingAddressPage.stateDropdown).toHaveValue('Massachusetts');
        await editShippingAddressPage.changeZipCode('02131');
        await expect(editShippingAddressPage.zipCodeInput).toHaveValue('02131');
        await editShippingAddressPage.changePhoneNumber('6175552340');
        await expect(editShippingAddressPage.phoneNumberInput).toHaveValue('6175552340');
        await editShippingAddressPage.cancelChanges();
        // Verify the original address on the Account Settings Page is still in place since the changes were cancelled
        const displayedAddressAfterCancellingChanges = await accountSettingsPage.displayedAddress.innerText();
        expect(displayedAddressAfterCancellingChanges).toMatch(originalAddress);
    });

    test('Change All Address Values (valid US Address) on Account Settings and Save Changes smoketest', async ({ page }) => {
        const myAccountPage = new MyAccountPage(page);
        const accountSettingsPage = await myAccountPage.goToAccountSettings();
        const originalAddress = await accountSettingsPage.displayedAddress.innerText();
        const editShippingAddressPage = await accountSettingsPage.goToEditAddressBook();
        const randomStringForTestData = await generateRandomData.generateRandomString();
        await editShippingAddressPage.changeFirstName(randomStringForTestData);
        await expect(editShippingAddressPage.firstNameInput).toHaveValue(randomStringForTestData);
        await editShippingAddressPage.changeLastName(randomStringForTestData);
        await expect(editShippingAddressPage.lastNameInput).toHaveValue(randomStringForTestData);
        await editShippingAddressPage.changeCompany(randomStringForTestData);
        await expect(editShippingAddressPage.companyInput).toHaveValue(randomStringForTestData);
        await editShippingAddressPage.changeStreetAddress(randomStringForTestData);
        await expect(editShippingAddressPage.streetAddressInput).toHaveValue(randomStringForTestData);
        await editShippingAddressPage.changeApt(randomStringForTestData);
        await expect(editShippingAddressPage.aptInput).toHaveValue(randomStringForTestData);
        await editShippingAddressPage.changeCity(randomStringForTestData);
        await expect(editShippingAddressPage.cityInput).toHaveValue(randomStringForTestData);
        await editShippingAddressPage.selectCountry('United States');
        await expect(editShippingAddressPage.countryDropdown).toHaveValue('United States');
        await editShippingAddressPage.selectState('Massachusetts');
        await expect(editShippingAddressPage.stateDropdown).toHaveValue('Massachusetts');
        await editShippingAddressPage.changeZipCode('02131');
        await expect(editShippingAddressPage.zipCodeInput).toHaveValue('02131');
        await editShippingAddressPage.changePhoneNumber('6175552340');
        await expect(editShippingAddressPage.phoneNumberInput).toHaveValue('6175552340');
        await editShippingAddressPage.saveChanges();
        await editShippingAddressPage.waitForSuccessfulAddressUpdateNotification();
        await editShippingAddressPage.goBackToAccountSettings();
        // Verify the displayed address on the Account Settings Page has been updated to the changes done on this test
        const displayedAddressAfterSavingChanges = await accountSettingsPage.displayedAddress.innerText();
        expect(displayedAddressAfterSavingChanges).not.toMatch(originalAddress);
    });

});