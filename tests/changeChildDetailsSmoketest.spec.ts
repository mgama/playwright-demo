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
        const currentChildDetailsName = await profileInfoPage.childDetailsName.innerText();
        const editChildDetailsPage = await profileInfoPage.goToEditChildDetails();
        const randomStringForTestData = await generateRandomData.generateRandomString();
        await editChildDetailsPage.changeName(randomStringForTestData);
        await expect(editChildDetailsPage.nameInput).toHaveValue(randomStringForTestData);
        await editChildDetailsPage.cancelChanges();
        const childDetailsNameAfterCancellingChanges = await profileInfoPage.childDetailsName.innerText();
        expect(childDetailsNameAfterCancellingChanges).toMatch(currentChildDetailsName);
    });

    test('Change Child Name from Profile Info Page and Save Changes smoketest', async ({ page }) => {
        const myAccountPage = new MyAccountPage(page);
        const profileInfoPage = await myAccountPage.goToProfileInfo();
        const currentChildDetailsName = await profileInfoPage.childDetailsName.innerText();
        const editChildDetailsPage = await profileInfoPage.goToEditChildDetails();
        const randomStringForTestData = await generateRandomData.generateRandomString();
        await editChildDetailsPage.changeName(randomStringForTestData);
        await expect(editChildDetailsPage.nameInput).toHaveValue(randomStringForTestData);
        await editChildDetailsPage.saveChanges();
        await editChildDetailsPage.waitForSuccessfulChildInfoUpdateNotification();
        await editChildDetailsPage.goBackToProfileInfo();
        const childDetailsNameAfterSavingChanges = await profileInfoPage.childDetailsName.innerText();
        expect(childDetailsNameAfterSavingChanges).not.toMatch(currentChildDetailsName);
    });

    test('Change Child Name to Empty from Profile Info Page and Verify Error smoketest', async ({ page }) => {
        const myAccountPage = new MyAccountPage(page);
        const profileInfoPage = await myAccountPage.goToProfileInfo();
        const currentChildDetailsName = await profileInfoPage.childDetailsName.innerText();
        const editChildDetailsPage = await profileInfoPage.goToEditChildDetails();
        // Change the child name to be an empty string
        await editChildDetailsPage.changeName('');
        await expect(editChildDetailsPage.nameInput).toHaveValue('');
        // Try to save the changes
        await editChildDetailsPage.saveChanges();
        // Wait for the 'Required' error label to be displayed on Name field
        await editChildDetailsPage.waitForErrorOnRequiredChildNameField();
        // Verify the changes were not successful and 'Required' error label is still displayed
        await expect(editChildDetailsPage.requiredChildNameError).toBeVisible();
        await expect(editChildDetailsPage.childInfoSuccesfullyUpdatedNotification).not.toBeVisible();
        await expect(editChildDetailsPage.nameInput).toHaveValue('');
        await editChildDetailsPage.goBackToProfileInfo();
        // Verify the previous child name still exists on Profile Info Page
        const childDetailsNameAfterSavingChanges = await profileInfoPage.childDetailsName.innerText();
        expect(childDetailsNameAfterSavingChanges).toMatch(currentChildDetailsName);
    });
});
