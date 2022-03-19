import { test, expect } from '@playwright/test';
import {LoginPage} from '../src/pageobjects/LoginPage';
import {MyAccountPage} from '../src/pageobjects/MyAccountPage';

// This works
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginUser();
  });

test('Change User First Name from Profile Info Page and Cancel Changes smoketest', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    const profileInfoPage = await myAccountPage.goToProfileInfo();
    // console.log(await profileInfoPage.contactDetailsName.innerText());
    const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
    await editContactDetailsPage.changeFirstName('test');
    // await expect(editContactDetailsPage.firstNameInput).toHaveValue('test'); //Locator not working yet
    // await page.pause(); //For debug UI only
    await expect(editContactDetailsPage.firstNameInput).toHaveValue('test');
    await editContactDetailsPage.cancelChanges();
});

test('Change User First Name from Profile Info Page and Save Changes smoketest', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    const profileInfoPage = await myAccountPage.goToProfileInfo();
    const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
    await editContactDetailsPage.changeFirstName('test');
    await expect(editContactDetailsPage.firstNameInput).toHaveValue('test');
    // await page.pause(); //For debug UI only
    // await editContactDetailsPage.saveChanges(); //Enable to save the changes
});

test('Change User Last Name from Profile Info Page and Cancel Changes smoketest', async ({ page }) => {
  const myAccountPage = new MyAccountPage(page);
  const profileInfoPage = await myAccountPage.goToProfileInfo();
  // console.log(await profileInfoPage.contactDetailsName.innerText());
  const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
  await editContactDetailsPage.changeLastName('test');
  // await expect(editContactDetailsPage.firstNameInput).toHaveValue('test'); //Locator not working yet
  // await page.pause(); //For debug UI only
  await expect(editContactDetailsPage.lastNameInput).toHaveValue('test');
  await editContactDetailsPage.cancelChanges();
});

test('Change User Last Name from Profile Info Page and Save Changes smoketest', async ({ page }) => {
  const myAccountPage = new MyAccountPage(page);
  const profileInfoPage = await myAccountPage.goToProfileInfo();
  // console.log(await profileInfoPage.contactDetailsName.innerText());
  const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
  await editContactDetailsPage.changeLastName('test');
  // await expect(editContactDetailsPage.firstNameInput).toHaveValue('test'); //Locator not working yet
  // await page.pause(); //For debug UI only
  await expect(editContactDetailsPage.lastNameInput).toHaveValue('test');
  // await editContactDetailsPage.saveChanges(); //Enable to save the changes
});

test('Change User First and Last Name from Profile Info Page and Save Changes smoketest', async ({ page }) => {
  const myAccountPage = new MyAccountPage(page);
  const profileInfoPage = await myAccountPage.goToProfileInfo();
  // console.log(await profileInfoPage.contactDetailsName.innerText());
  const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
  await editContactDetailsPage.changeFirstName('testFirstName');
  await expect(editContactDetailsPage.firstNameInput).toHaveValue('testFirstName');
  await editContactDetailsPage.changeLastName('testLastName');
  await expect(editContactDetailsPage.lastNameInput).toHaveValue('testLastName');
  // await editContactDetailsPage.saveChanges(); //Enable to save the changes
});

test('Change User First and Last Name from Profile Info Page and Cancel Changes smoketest', async ({ page }) => {
  const myAccountPage = new MyAccountPage(page);
  const profileInfoPage = await myAccountPage.goToProfileInfo();
  // console.log(await profileInfoPage.contactDetailsName.innerText());
  const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
  await editContactDetailsPage.changeFirstName('testFirstName');
  await expect(editContactDetailsPage.firstNameInput).toHaveValue('testFirstName');
  await editContactDetailsPage.changeLastName('testLastName');
  await expect(editContactDetailsPage.lastNameInput).toHaveValue('testLastName');
  await editContactDetailsPage.cancelChanges();
});

// This does not work
// test.use({storageState: 'storageState.json'});
// test('Sign In, Change User Profile Info smoketest', async ({ page }) => {
//         await page.goto('/');
//         // expect 
//     });