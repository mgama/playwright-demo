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
    const editContactDetailsPage = await profileInfoPage.goToEditContactDetails();
    await editContactDetailsPage.changeFirstName('test');
    await expect(editContactDetailsPage.firstNameInput).toHaveValue('test');
    // await page.pause(); //For debug UI only
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

// This does not work
// test.use({storageState: 'storageState.json'});
// test('Sign In, Change User Profile Info smoketest', async ({ page }) => {
//         await page.goto('/');
//         // expect 
//     });