import { test, expect } from '@playwright/test';
import {MyAccountPage} from '../src/pageobjects/MyAccountPage';
import GenerateRandomData from '../src/data/GenerateRandomData';
import { ProfileInfoPage } from '../src/pageobjects/ProfileInfoPage';
import { EditContactDetailsPage } from '../src/pageobjects/EditContactDetailsPage';

test.use({
  // Reuse the login state in each test
  storageState: 'login-state.json'
})

test.describe('Change Contact Details Smoketests', () => {
  const generateRandomData = new GenerateRandomData();
  let profileInfoPage: ProfileInfoPage;
  let currentContactDetailsName = '';
  let editContactDetailsPage: EditContactDetailsPage;
  
  test.beforeEach(async ({ page }) => {
      const myAccountPage = new MyAccountPage(page);
      await myAccountPage.goTo();
      profileInfoPage = await myAccountPage.goToProfileInfo();
      currentContactDetailsName = await profileInfoPage.contactDetailsName.innerText();
      editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
  });

  test('Negative Test: Change User First Name from Profile Info Page and Cancel Changes smoketest', async ({ page }) => {
      const randomStringForTestData = await generateRandomData.generateRandomString();
      await editContactDetailsPage.changeFirstName(randomStringForTestData);
      await expect(editContactDetailsPage.firstNameInput).toHaveValue(randomStringForTestData);
      await editContactDetailsPage.cancelChanges();
      const contactDetailsNameAfterCancellingChanges = await profileInfoPage.contactDetailsName.innerText();
      expect(contactDetailsNameAfterCancellingChanges).toMatch(currentContactDetailsName);
  });

  
  test('Change User First Name from Profile Info Page and Save Changes smoketest', async ({ page }) => {
      const randomStringForTestData = await generateRandomData.generateRandomString();
      await editContactDetailsPage.changeFirstName(randomStringForTestData);
      await expect(editContactDetailsPage.firstNameInput).toHaveValue(randomStringForTestData);
      await editContactDetailsPage.saveChanges();
      await editContactDetailsPage.waitForSuccessfulProfileUpdateNotification();
      await editContactDetailsPage.goBackToProfileInfo();
      const contactDetailsNameAfterSavingChanges = await profileInfoPage.contactDetailsName.innerText();
      expect(contactDetailsNameAfterSavingChanges).toContain(randomStringForTestData);
      expect(contactDetailsNameAfterSavingChanges).not.toMatch(currentContactDetailsName);
  });

  test(`Negative Test: Change User First Name to empty value from Profile Info Page 
  and Verify error on Required field smoketest`, async ({ page }) => {
    await editContactDetailsPage.changeFirstName('');
    await expect(editContactDetailsPage.firstNameInput).toHaveValue('');
    await editContactDetailsPage.saveChanges();
    await editContactDetailsPage.waitForRequiredFieldError();
    await expect(editContactDetailsPage.requiredFieldError).toBeVisible();
    await expect(editContactDetailsPage.firstNameInput).toHaveValue('');
    await editContactDetailsPage.goBackToProfileInfo();
    const contactDetailsNameAfterAttemptedFirstNameChanges = await profileInfoPage.contactDetailsName.innerText();
    expect(contactDetailsNameAfterAttemptedFirstNameChanges).toMatch(currentContactDetailsName);
  });

  // Currently failing since there is a bug. Last Name is not a required field
  // on the Edit Contact Details Page
  test(`Negative Test: Change User Last Name to empty value from Profile Info Page 
  and Verify error on Required field smoketest`, async ({ page }) => {
    await editContactDetailsPage.changeLastName('');
    await expect(editContactDetailsPage.lastNameInput).toHaveValue('');
    await editContactDetailsPage.saveChanges();
    await editContactDetailsPage.waitForRequiredFieldError();
    await expect(editContactDetailsPage.requiredFieldError).toBeVisible();
    await expect(editContactDetailsPage.firstNameInput).toHaveValue('');
    await editContactDetailsPage.goBackToProfileInfo();
    const contactDetailsNameAfterAttemptedLastNameChanges = await profileInfoPage.contactDetailsName.innerText();
    expect(contactDetailsNameAfterAttemptedLastNameChanges).toMatch(currentContactDetailsName);
  });

  test('Negative Test: Change User Last Name from Profile Info Page and Cancel Changes smoketest', async ({ page }) => {
    const randomStringForTestData = await generateRandomData.generateRandomString();
    await editContactDetailsPage.changeLastName(randomStringForTestData);
    await expect(editContactDetailsPage.lastNameInput).toHaveValue(randomStringForTestData);
    await editContactDetailsPage.cancelChanges();
    const contactDetailsNameAfterCancellingChanges = await profileInfoPage.contactDetailsName.innerText();
    expect(contactDetailsNameAfterCancellingChanges).toMatch(currentContactDetailsName);
  });

  test('Change User Last Name from Profile Info Page and Save Changes smoketest', async ({ page }) => {
    const randomStringForTestData = await generateRandomData.generateRandomString();
    await editContactDetailsPage.changeLastName(randomStringForTestData);
    await expect(editContactDetailsPage.lastNameInput).toHaveValue(randomStringForTestData);
    await editContactDetailsPage.saveChanges();
    await editContactDetailsPage.waitForSuccessfulProfileUpdateNotification();
    await editContactDetailsPage.goBackToProfileInfo();
    const contactDetailsNameAfterSavingChanges = await profileInfoPage.contactDetailsName.innerText();
    expect(contactDetailsNameAfterSavingChanges).toContain(randomStringForTestData);
  });

  test('Change User First and Last Name from Profile Info Page and Save Changes smoketest', async ({ page }) => {
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
    expect(contactDetailsNameAfterSavingChanges).toContain(randomStringForTestData);
    expect(contactDetailsNameAfterSavingChanges).toContain(secondRandomStringForTestData);
    expect(contactDetailsNameAfterSavingChanges).not.toMatch(currentContactDetailsName);
  });

  test('Negative Test: Change User First and Last Name from Profile Info Page and Cancel Changes smoketest', async ({ page }) => {
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