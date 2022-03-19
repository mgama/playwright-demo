import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
//   globalSetup: require.resolve('./global-setup'),
  use: {
    baseURL: 'https://lovevery.com/',
    // storageState: 'storageState.json',
  },
};
export default config;