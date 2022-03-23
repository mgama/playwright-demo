import { test, expect } from '@playwright/test';
import {MyAccountPage} from '../src/pageobjects/MyAccountPage';
import GenerateRandomData from '../src/data/GenerateRandomData';
import { AccountSettingsPage } from '../src/pageobjects/AccountSettingsPage';
import { EditShippingAddressPage } from '../src/pageobjects/EditShippingAddressPage';

test.use({
    // Reuse the login state in each test
    storageState: 'login-state.json'
  })

test.describe('Change Account Settings Smoketests', () => {
    const generateRandomData = new GenerateRandomData()
    let accountSettingsPage: AccountSettingsPage;
    let originalAddress = '';
    let editShippingAddressPage: EditShippingAddressPage;
    
    test.beforeEach(async ({ page }) => {
        const myAccountPage = new MyAccountPage(page);
        await myAccountPage.goTo();
        accountSettingsPage = await myAccountPage.goToAccountSettings();
        originalAddress = await accountSettingsPage.displayedAddress.innerText();
        editShippingAddressPage = await accountSettingsPage.goToEditAddressBook();
    });

    test('Negative Test: Change All Address Values (valid US Address) on Account Settings and Cancel Changes', async ({ page }) => {
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

    test('Change All Address Values (valid US Address) on Account Settings and Save Changes', async ({ page }) => {
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

    test('Negative Test: Change Zip Code to empty value on Account Settings and Verify Error on Required field', async ({ page }) => {
        await editShippingAddressPage.changeZipCode('');
        await expect(editShippingAddressPage.zipCodeInput).toHaveValue('');
        await editShippingAddressPage.saveChanges();
        await editShippingAddressPage.waitForRequiredFieldErrorMessage();
        await expect(editShippingAddressPage.requiredFieldErrorMessage).toBeVisible();
        await expect(editShippingAddressPage.zipCodeInput).toHaveValue('');
        await editShippingAddressPage.goBackToAccountSettings();
        // Verify the displayed address on the Account Settings Page has not been updated to the zip code changes tried on this test
        const displayedAddressAfterAttemptedZipCodeChanges = await accountSettingsPage.displayedAddress.innerText();
        expect(displayedAddressAfterAttemptedZipCodeChanges).toMatch(originalAddress);
    });

    test('Negative Test: Change First Name to empty value on Account Settings and Verify Error on Required field', async ({ page }) => {
        await editShippingAddressPage.changeFirstName('');
        await expect(editShippingAddressPage.firstNameInput).toHaveValue('');
        await editShippingAddressPage.saveChanges();
        await editShippingAddressPage.waitForRequiredFieldErrorMessage();
        await expect(editShippingAddressPage.requiredFieldErrorMessage).toBeVisible();
        await expect(editShippingAddressPage.firstNameInput).toHaveValue('');
        await editShippingAddressPage.goBackToAccountSettings();
        // Verify the displayed address on the Account Settings Page has not been updated to the first name changes tried on this test
        const displayedAddressAfterAttemptedFirstNameChanges = await accountSettingsPage.displayedAddress.innerText();
        expect(displayedAddressAfterAttemptedFirstNameChanges).toMatch(originalAddress);
    });

    test('Negative Test: Change Last Name to empty value on Account Settings and Verify Error on Required field', async ({ page }) => {
        await editShippingAddressPage.changeLastName('');
        await expect(editShippingAddressPage.lastNameInput).toHaveValue('');
        await editShippingAddressPage.saveChanges();
        await editShippingAddressPage.waitForRequiredFieldErrorMessage();
        await expect(editShippingAddressPage.requiredFieldErrorMessage).toBeVisible();
        await expect(editShippingAddressPage.lastNameInput).toHaveValue('');
        await editShippingAddressPage.goBackToAccountSettings();
        // Verify the displayed address on the Account Settings Page has not been updated to the last name changes tried on this test
        const displayedAddressAfterAttemptedLastNameChanges = await accountSettingsPage.displayedAddress.innerText();
        expect(displayedAddressAfterAttemptedLastNameChanges).toMatch(originalAddress);
    });

    test('Negative Test: Change Street Address to empty value on Account Settings and Verify Error on Required field', async ({ page }) => {
        await editShippingAddressPage.changeStreetAddress('');
        await expect(editShippingAddressPage.streetAddressInput).toHaveValue('');
        await editShippingAddressPage.saveChanges();
        await editShippingAddressPage.waitForRequiredFieldErrorMessage();
        await expect(editShippingAddressPage.requiredFieldErrorMessage).toBeVisible();
        await expect(editShippingAddressPage.streetAddressInput).toHaveValue('');
        await editShippingAddressPage.goBackToAccountSettings();
        // Verify the displayed address on the Account Settings Page has not been updated to the Street Address changes tried on this test
        const displayedAddressAfterAttemptedStreetAddressChanges = await accountSettingsPage.displayedAddress.innerText();
        expect(displayedAddressAfterAttemptedStreetAddressChanges).toMatch(originalAddress);
    });

    test('Negative Test: Change City to empty value on Account Settings and Verify Error on Required field', async ({ page }) => {
        await editShippingAddressPage.changeCity('');
        await expect(editShippingAddressPage.cityInput).toHaveValue('');
        await editShippingAddressPage.saveChanges();
        await editShippingAddressPage.waitForRequiredFieldErrorMessage();
        await expect(editShippingAddressPage.requiredFieldErrorMessage).toBeVisible();
        await expect(editShippingAddressPage.cityInput).toHaveValue('');
        await editShippingAddressPage.goBackToAccountSettings();
        // Verify the displayed address on the Account Settings Page has not been updated to the City changes tried on this test
        const displayedAddressAfterAttemptedCityChanges = await accountSettingsPage.displayedAddress.innerText();
        expect(displayedAddressAfterAttemptedCityChanges).toMatch(originalAddress);
    });

});