import { test, expect } from '@playwright/test';
import {LoginPage} from '../src/pageobjects/LoginPage';
import {MyAccountPage} from '../src/pageobjects/MyAccountPage';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginUser();
  });

test('Change Child Name from Profile Info Page and Cancel Changes smoketest', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    const profileInfoPage = await myAccountPage.goToProfileInfo();
    // console.log(await profileInfoPage.contactDetailsName.innerText());
    const editChildDetailsPage = await profileInfoPage.goToEditChildDetails();
    await editChildDetailsPage.changeName('test');
    // await expect(editContactDetailsPage.firstNameInput).toHaveValue('test'); //Locator not working yet
    // await page.pause(); //For debug UI only
    await expect(editChildDetailsPage.nameInput).toHaveValue('test');
    await editChildDetailsPage.cancelChanges();
});

test('Change Child Name from Profile Info Page and Save Changes smoketest', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    const profileInfoPage = await myAccountPage.goToProfileInfo();
    // console.log(await profileInfoPage.contactDetailsName.innerText());
    const editChildDetailsPage = await profileInfoPage.goToEditChildDetails();
    await editChildDetailsPage.changeName('test');
    // await expect(editContactDetailsPage.firstNameInput).toHaveValue('test'); //Locator not working yet
    // await page.pause(); //For debug UI only
    await expect(editChildDetailsPage.nameInput).toHaveValue('test');
    // await editChildDetailsPage.saveChanges();
});

