// import { chromium, FullConfig } from '@playwright/test';
// import creds from './src/data/creds.json';

// // async function globalSetup(config: FullConfig) {
// // //   const { baseURL, storageState } = config.projects[0].use;
// //   const { baseURL } = config.projects[0].use;
// //   const browser = await chromium.launch();
// //   const page = await browser.newPage();
// //   await page.goto(baseURL + 'account/login');
// //   await page.fill('input#email', creds.emailAddress);
// //   await page.fill('input#password', creds.password);
// //   await page.click('button#form-submit-button');
// //   await page.context().storageState({ path: 'storageState.json' });
// //   await browser.close();
// // }

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
//   await requestContext.storageState({ path: 'storageState.json' });
//   await requestContext.dispose();
// //   const browser = await chromium.launch();
// //   const page = await browser.newPage();
// //   await page.context().storageState({ path: 'storageState.json' });
// //   await browser.close();
// }

// export default globalSetup;