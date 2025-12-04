# shoppingwebsite

## Project setup
```
npm install
```

### Firebase Setup
This project uses Firebase for its backend (Authentication and Realtime Database).
You will need to create a `.env` file in the root of the project and add your Firebase project's configuration.

1. Create a file named `.env` in the project root.
2. Add the following content to the `.env` file:

```
VUE_APP_FIREBASE_API_KEY="YOUR_API_KEY"
VUE_APP_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
VUE_APP_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
VUE_APP_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
VUE_APP_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
VUE_APP_FIREBASE_APP_ID="YOUR_APP_ID"
VUE_APP_FIREBASE_MEASUREMENT_ID="YOUR_MEASUREMENT_ID"
VUE_APP_FIREBASE_DATABASE_URL="YOUR_DATABASE_URL"
```

3. You can get these values from your Firebase project's settings. After creating a web app in your Firebase project, you will be given a `firebaseConfig` object containing these values.

**Note on `VUE_APP_FIREBASE_DATABASE_URL`:** The `databaseURL` might not be present in the `firebaseConfig` object by default. You can find it in your Firebase console in the "Realtime Database" section. It usually follows the format `https://<YOUR_PROJECT_ID>-default-rtdb.<REGION>.firebasedatabase.app`.


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
