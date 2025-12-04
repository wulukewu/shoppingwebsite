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

### Docker and Docker Compose
The application is designed to be run in a Docker container with runtime environment variable configuration.

**1. Configure Environment Variables:**
Ensure you have a `.env` file in the project root, as described in the "Firebase Setup" section.

**2. Run the Application with Docker Compose:**
This command will pull the pre-built image `ghcr.io/wulukewu/shoppingwebsite:latest` and start the service. The running container will be configured with the variables from your `.env` file. The application will be accessible at `http://localhost:8080`.
```bash
docker-compose up
```
The application is now configured at runtime, making the same Docker image reusable across different environments.

**3. Running with Docker CLI:**
If you prefer to use the Docker CLI directly, follow these steps:

   **a. Log in to GitHub Container Registry (if not already logged in):**
   ```bash
   echo YOUR_PAT | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
   ```
   Replace `YOUR_PAT` with your GitHub Personal Access Token (with `read:packages` scope) and `YOUR_GITHUB_USERNAME` with your GitHub username.

   **b. Pull the Docker Image:**
   ```bash
   docker pull ghcr.io/wulukewu/shoppingwebsite:latest
   ```

   **c. Run the Docker Container:**
   Ensure you have your `.env` file in your current directory, configured as described in the "Firebase Setup" section.
   ```bash
   docker run -d -p 8080:80 --env-file .env ghcr.io/wulukewu/shoppingwebsite:latest
   ```
   The application will be accessible at `http://localhost:8080`.

### GitHub Actions (CI/CD)
This project includes GitHub Actions workflows for continuous integration and deployment. The workflows are set up to build a Docker image that is configured at runtime.

*   `.github/workflows/deploy-pr.yml`: This workflow builds a Docker image for every Pull Request and comments the image tag on the PR.
*   `.github/workflows/deploy.yml`: This workflow builds and publishes a Docker image to GitHub Container Registry when a new release is published. This is the image that is used in the `docker-compose.yml` file.
*   `.github/workflows/release-please.yml`: This workflow automates releases based on conventional commits. It requires a `PAT` (Personal Access Token) secret to be configured in your GitHub repository settings with `repo` and `workflow` scopes. The `PAT` should be named `PAT`.

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
