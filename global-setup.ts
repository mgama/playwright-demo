import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from './src/pageobjects/LoginPage';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const loginPage = new LoginPage(page, baseURL);
  await loginPage.loginUser();
  await loginPage.page.context().storageState({ path: 'login-state.json' });
  await browser.close();
}

// import { request } from '@playwright/test';

// async function globalSetup(config: FullConfig) {
//   const { baseURL } = config.projects[0].use;
//   const requestContext = await request.newContext();
//   await requestContext.post(baseURL + 'account/login', {
//     form: {
//       'user': creds.emailAddress,
//       'password': creds.password
//     }
//   });
//   // Save signed-in state to 'storageState.json'.
//   await requestContext.storageState({ path: './login-state.json' });
//   await requestContext.dispose();
// //   const browser = await chromium.launch();
// //   const page = await browser.newPage();
// //   await page.context().storageState({ path: 'storageState.json' });
// //   await browser.close();
// }

export default globalSetup;