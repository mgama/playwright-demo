import { test, expect } from '@playwright/test';
import {LoginPage} from '../src/pageobjects/LoginPage';
import {MyAccountPage} from '../src/pageobjects/MyAccountPage';
import GenerateRandomData from '../src/data/GenerateRandomData';

test.describe('Change Child Details Smoketests', () => {
    const generateRandomData = new GenerateRandomData();
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginUser();
    });

    test('Change Child Name from Profile Info Page and Cancel Changes smoketest', async ({ page }) => {
        const myAccountPage = new MyAccountPage(page);
        const profileInfoPage = await myAccountPage.goToProfileInfo();
        // console.log(await profileInfoPage.contactDetailsName.innerText());
        const editChildDetailsPage = await profileInfoPage.goToEditChildDetails();
        const randomStringForTestData = await generateRandomData.generateRandomString();
        await editChildDetailsPage.changeName(randomStringForTestData);
        // await expect(editContactDetailsPage.firstNameInput).toHaveValue('test'); //Locator not working yet
        // await page.pause(); //For debug UI only
        await expect(editChildDetailsPage.nameInput).toHaveValue(randomStringForTestData);
        await editChildDetailsPage.cancelChanges();
    });

    test('Change Child Name from Profile Info Page and Save Changes smoketest', async ({ page }) => {
        const myAccountPage = new MyAccountPage(page);
        const profileInfoPage = await myAccountPage.goToProfileInfo();
        // console.log(await profileInfoPage.contactDetailsName.innerText());
        const editChildDetailsPage = await profileInfoPage.goToEditChildDetails();
        const randomStringForTestData = await generateRandomData.generateRandomString();
        await editChildDetailsPage.changeName(randomStringForTestData);
        // await expect(editContactDetailsPage.firstNameInput).toHaveValue('test'); //Locator not working yet
        // await page.pause(); //For debug UI only
        await expect(editChildDetailsPage.nameInput).toHaveValue(randomStringForTestData);
        // await editChildDetailsPage.saveChanges();
    });
});
