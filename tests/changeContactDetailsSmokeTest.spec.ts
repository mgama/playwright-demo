import { test, expect } from '@playwright/test';
import {LoginPage} from '../src/pageobjects/LoginPage';
import {MyAccountPage} from '../src/pageobjects/MyAccountPage';
import GenerateRandomData from '../src/data/GenerateRandomData';

test.describe('Change Contact Details Smoketests', () => {
  const generateRandomData = new GenerateRandomData();

  test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.loginUser();
    });

  test('Change User First Name from Profile Info Page and Cancel Changes smoketest', async ({ page }) => {
      const myAccountPage = new MyAccountPage(page);
      const profileInfoPage = await myAccountPage.goToProfileInfo();
      const currentContactDetailsName = await profileInfoPage.contactDetailsName.innerText();
      const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
      const randomStringForTestData = await generateRandomData.generateRandomString();
      await editContactDetailsPage.changeFirstName(randomStringForTestData);
      await expect(editContactDetailsPage.firstNameInput).toHaveValue(randomStringForTestData);
      await editContactDetailsPage.cancelChanges();
      const contactDetailsNameAfterCancellingChanges = await profileInfoPage.contactDetailsName.innerText();
      expect(contactDetailsNameAfterCancellingChanges).toMatch(currentContactDetailsName);
  });

  
  test('Change User First Name from Profile Info Page and Save Changes smoketest', async ({ page }) => {
      const myAccountPage = new MyAccountPage(page);
      const profileInfoPage = await myAccountPage.goToProfileInfo();
      const currentContactDetailsName = await profileInfoPage.contactDetailsName.innerText();
      const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
      const randomStringForTestData = await generateRandomData.generateRandomString();
      await editContactDetailsPage.changeFirstName(randomStringForTestData);
      await expect(editContactDetailsPage.firstNameInput).toHaveValue(randomStringForTestData);
      await editContactDetailsPage.saveChanges();
      await editContactDetailsPage.waitForSuccessfulProfileUpdateNotification();
      await editContactDetailsPage.goBackToProfileInfo();
      const contactDetailsNameAfterSavingChanges = await profileInfoPage.contactDetailsName.innerText();
      expect(contactDetailsNameAfterSavingChanges).not.toMatch(currentContactDetailsName);
  });

  test('Change User Last Name from Profile Info Page and Cancel Changes smoketest', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    const profileInfoPage = await myAccountPage.goToProfileInfo();
    const currentContactDetailsName = await profileInfoPage.contactDetailsName.innerText();
    const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
    const randomStringForTestData = await generateRandomData.generateRandomString();
    await editContactDetailsPage.changeLastName(randomStringForTestData);
    await expect(editContactDetailsPage.lastNameInput).toHaveValue(randomStringForTestData);
    await editContactDetailsPage.cancelChanges();
    const contactDetailsNameAfterCancellingChanges = await profileInfoPage.contactDetailsName.innerText();
    expect(contactDetailsNameAfterCancellingChanges).toMatch(currentContactDetailsName);
  });

  test('Change User Last Name from Profile Info Page and Save Changes smoketest', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    const profileInfoPage = await myAccountPage.goToProfileInfo();
    const currentContactDetailsName = await profileInfoPage.contactDetailsName.innerText();
    const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
    const randomStringForTestData = await generateRandomData.generateRandomString();
    await editContactDetailsPage.changeLastName(randomStringForTestData);
    await expect(editContactDetailsPage.lastNameInput).toHaveValue(randomStringForTestData);
    await editContactDetailsPage.saveChanges();
    await editContactDetailsPage.waitForSuccessfulProfileUpdateNotification();
    await editContactDetailsPage.goBackToProfileInfo();
    const contactDetailsNameAfterSavingChanges = await profileInfoPage.contactDetailsName.innerText();
    expect(contactDetailsNameAfterSavingChanges).not.toMatch(currentContactDetailsName);
  });

  test('Change User First and Last Name from Profile Info Page and Save Changes smoketest', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    const profileInfoPage = await myAccountPage.goToProfileInfo();
    const currentContactDetailsName = await profileInfoPage.contactDetailsName.innerText();
    const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
    const randomStringForTestData = await generateRandomData.generateRandomString();
    await editContactDetailsPage.changeFirstName(randomStringForTestData);
    await expect(editContactDetailsPage.firstNameInput).toHaveValue(randomStringForTestData);
    const secondRandomStringForTestData = await generateRandomData.generateRandomString();
    await editContactDetailsPage.changeLastName(secondRandomStringForTestData);
    await expect(editContactDetailsPage.lastNameInput).toHaveValue(secondRandomStringForTestData);
    await editContactDetailsPage.saveChanges();
    await editContactDetailsPage.waitForSuccessfulProfileUpdateNotification();
    await editContactDetailsPage.goBackToProfileInfo();
    const contactDetailsNameAfterSavingChanges = await profileInfoPage.contactDetailsName.innerText();
    expect(contactDetailsNameAfterSavingChanges).not.toMatch(currentContactDetailsName);
  });

  test('Change User First and Last Name from Profile Info Page and Cancel Changes smoketest', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    const profileInfoPage = await myAccountPage.goToProfileInfo();
    const currentContactDetailsName = await profileInfoPage.contactDetailsName.innerText();
    const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
    const randomStringForTestData = await generateRandomData.generateRandomString();
    await editContactDetailsPage.changeFirstName(randomStringForTestData);
    await expect(editContactDetailsPage.firstNameInput).toHaveValue(randomStringForTestData);
    const secondRandomStringForTestData = await generateRandomData.generateRandomString();
    await editContactDetailsPage.changeLastName(secondRandomStringForTestData);
    await expect(editContactDetailsPage.lastNameInput).toHaveValue(secondRandomStringForTestData);
    await editContactDetailsPage.cancelChanges();
    const contactDetailsNameAfterCancellingChanges = await profileInfoPage.contactDetailsName.innerText();
    expect(contactDetailsNameAfterCancellingChanges).toMatch(currentContactDetailsName);
  });
});