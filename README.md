# React + Python Webapp Setup

Boilerplate code for a React + Python Webapp project.

## How to Setup the project

1. git clone this project
2. Change directory into the root of the repository
3. Install npm using this command:

```
sudo apt install npm
```

4. Install yarn using this command:

```
npm install --global yarn
```

5. Use this command to install dependencies and setup React:

```
yarn install
```

6. Install python3 venv
7. Run this command to setup the virtual environment for python

```
python3 -m venv venv
```

8. Enable the virtual environment by running this command:

```
source venv/bin/activate
```

9. Install the dependencies for the backend server api using this command:

```
pip3 install -r requirements.txt
```

10. Exit the virtual environment using this command:

```
deactivate
```

11. Activate the development React server using this command:

```
yarn start
```

12. Open another terminal in the root directory and use this command to start the development Python Flask server:

```
yarn start-api
```

13. Navigate to [http://localhost:3000](http://localhost:3000) to view the website.

## Commands

In the project directory, you can run:

### `yarn start`

Runs the frontend app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn start-api`

Runs the Python Flask backend api app in development mode.\
This service runs on http://localhost:5000.

This is not meant to be run for production. Check out the next command to find out more.

### `yarn prod-start-api`

Runs the Python Flask backend api app in production mode.\
This service runs on http://localhost:5000.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
