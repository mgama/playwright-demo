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
      // console.log(await profileInfoPage.contactDetailsName.innerText());
      const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
      const randomStringForTestData = await generateRandomData.generateRandomString();
      await editContactDetailsPage.changeFirstName(randomStringForTestData);
      // await expect(editContactDetailsPage.firstNameInput).toHaveValue('test'); //Locator not working yet
      // await page.pause(); //For debug UI only
      await expect(editContactDetailsPage.firstNameInput).toHaveValue(randomStringForTestData);
      await editContactDetailsPage.cancelChanges();
  });

  test('Change User First Name from Profile Info Page and Save Changes smoketest', async ({ page }) => {
      const myAccountPage = new MyAccountPage(page);
      const profileInfoPage = await myAccountPage.goToProfileInfo();
      // console.log(await profileInfoPage.contactDetailsName.innerText());
      const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
      const randomStringForTestData = await generateRandomData.generateRandomString();
      await editContactDetailsPage.changeFirstName(randomStringForTestData);
      // await expect(editContactDetailsPage.firstNameInput).toHaveValue('test'); //Locator not working yet
      // await page.pause(); //For debug UI only
      await expect(editContactDetailsPage.firstNameInput).toHaveValue(randomStringForTestData);
      // await editContactDetailsPage.saveChanges(); //Enable to save the changes
  });

  test('Change User Last Name from Profile Info Page and Cancel Changes smoketest', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    const profileInfoPage = await myAccountPage.goToProfileInfo();
    // console.log(await profileInfoPage.contactDetailsName.innerText());
    const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
    const randomStringForTestData = await generateRandomData.generateRandomString();
    await editContactDetailsPage.changeLastName(randomStringForTestData);
    // await expect(editContactDetailsPage.firstNameInput).toHaveValue('test'); //Locator not working yet
    // await page.pause(); //For debug UI only
    await expect(editContactDetailsPage.lastNameInput).toHaveValue(randomStringForTestData);
    await editContactDetailsPage.cancelChanges();
  });

  test('Change User Last Name from Profile Info Page and Save Changes smoketest', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    const profileInfoPage = await myAccountPage.goToProfileInfo();
    // console.log(await profileInfoPage.contactDetailsName.innerText());
    const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
    const randomStringForTestData = await generateRandomData.generateRandomString();
    await editContactDetailsPage.changeLastName(randomStringForTestData);
    // await expect(editContactDetailsPage.firstNameInput).toHaveValue('test'); //Locator not working yet
    // await page.pause(); //For debug UI only
    await expect(editContactDetailsPage.lastNameInput).toHaveValue(randomStringForTestData);
    // await editContactDetailsPage.saveChanges(); //Enable to save the changes
  });

  test('Change User First and Last Name from Profile Info Page and Save Changes smoketest', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    const profileInfoPage = await myAccountPage.goToProfileInfo();
    // console.log(await profileInfoPage.contactDetailsName.innerText());
    const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
    const randomStringForTestData = await generateRandomData.generateRandomString();
    await editContactDetailsPage.changeFirstName(randomStringForTestData);
    await expect(editContactDetailsPage.firstNameInput).toHaveValue(randomStringForTestData);
    const secondRandomStringForTestData = await generateRandomData.generateRandomString();
    await editContactDetailsPage.changeLastName(secondRandomStringForTestData);
    await expect(editContactDetailsPage.lastNameInput).toHaveValue(secondRandomStringForTestData);
    // await editContactDetailsPage.saveChanges(); //Enable to save the changes
  });

  test('Change User First and Last Name from Profile Info Page and Cancel Changes smoketest', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    const profileInfoPage = await myAccountPage.goToProfileInfo();
    // console.log(await profileInfoPage.contactDetailsName.innerText());
    const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
    const randomStringForTestData = await generateRandomData.generateRandomString();
    await editContactDetailsPage.changeFirstName(randomStringForTestData);
    await expect(editContactDetailsPage.firstNameInput).toHaveValue(randomStringForTestData);
    const secondRandomStringForTestData = await generateRandomData.generateRandomString();
    await editContactDetailsPage.changeLastName(secondRandomStringForTestData);
    await expect(editContactDetailsPage.lastNameInput).toHaveValue(secondRandomStringForTestData);
    await editContactDetailsPage.cancelChanges();
  });

});

// This does not work
// test.use({storageState: 'storageState.json'});
// test('Sign In, Change User Profile Info smoketest', async ({ page }) => {
//         await page.goto('/');
//         // expect 
//     });