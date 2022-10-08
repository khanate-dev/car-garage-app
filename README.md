# Car Garage Mobile App
React Native Application With Expo Managed Workflow

## Technologies
- React
- React Native (Expo Managed Workflow)
- Typescript
- UI Kitten for theming and components
- Sentry for logging and error reporting
- Yarn for package management

---

## Scripts
Start: `yarn start`

Start (Android): `yarn android`

Start (iOS): `yarn ios`

Build: `yarn build`

Build A Preview Version: `yarn build:preview`

Build A Development Version (APK): `yarn build:development`

Build An Independent APK: `expo build:android -t apk`

Publish: `expo publish`

Convert svg icons to components: `yarn svgr`

Lint the code: `yarn lint`

---

## Environment Variables

Environment variables are securely stored with dotenv-vault.

Environment example format: [![fork with dotenv-vault](https://badge.dotenv.org/fork.svg?r=1)](https://vault.dotenv.org/project/vlt_8f91ebc5a8666c01b1e1a91e6045d35c22b76f2b98c00d3b7b9910f32b7e19b8/example)

Open dotenv-vault: `yarn env:open`

Pull environment from dotenv-vault: `yarn env:pull`

Push environment to dotenv-vault: `yarn env:push`
