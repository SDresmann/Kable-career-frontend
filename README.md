# Kable Career (frontend)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Deploying on Render (fix 404 on /login, /section/1, etc.)

This app uses React Router. So that direct URLs like `/login` or `/section/1` work (and don’t return 404), add a **rewrite rule** in the Render Dashboard:

1. Open your **Static Site** (e.g. kable-career) on [Render Dashboard](https://dashboard.render.com/).
2. Go to the **Redirects / Rewrites** tab.
3. Add a rule:
   - **Source Path:** `/*`
   - **Destination Path:** `/index.html`
   - **Action:** **Rewrite**
4. Save. Redeploy if needed.

After this, every path (e.g. `kable-career.onrender.com/login`) will serve `index.html`, and React Router will show the correct page.

**Video and audio on week pages:** The app loads video/audio from the **Kable Career backend** (`/api/media/week/...`). The backend looks in `backend/media/WeekN/` then `public/WeekN/`. **For production:** copy `public/Week1`–`public/Week12` into `backend/media/` and deploy the backend with that folder. Media files live in `public/Week1`–`public/Week12` (each with `video/` and `audio/` folders). Render serves static files first, so `/Week1/video/…` and `/Week1/audio/…` will work **only if** those folders and files are in your repo and included in the build. Ensure `public/Week1` through `public/Week12` (and their contents) are committed. If the player shows “couldn’t load”, use the “Open in new tab” / “Download” links; if those also fail, the media files are not in the deployed build.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
