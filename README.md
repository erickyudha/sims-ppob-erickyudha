# SIMS PPOB - Erick Yudha PS

This project is a create-react-app app built using React, TypeScript, and Redux. It serves as a PPOB (Payment Point Online Bank) system, providing a user-friendly interface for managing customer relationships and processing payments.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/sims-ppob.git
    ```

2. **Navigate to the project directory:**

    ```sh
    cd sims-ppob
    ```

3. **Install the dependencies:**

    Using npm:

    ```sh
    npm install
    ```

    Or using yarn:

    ```sh
    yarn install
    ```

## Running the Application

After installing the dependencies, you can start the development server.

Using npm:

```sh
npm start
```

Or using yarn:

```sh
yarn start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Folder Structure

The project structure follows a standard CRA setup with some additional folders for organization:

```
sims-ppob-erickyudha/
├── node_modules/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── app/
│   │   ├── hooks.ts
│   │   ├── store.ts
│   │   ├── userSlice.ts
│   │   └── ...
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── InputBox.tsx
│   │   ├── ModalLoading.tsx
│   │   ├── ModalMessage.tsx
│   │   └── ...
│   ├── pages/
│   │   └── ...
│   ├── layout/
│   │   └── ...
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── serviceWorker.ts
│   └── setupTests.ts
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## Dependencies

The project uses the following main dependencies:

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Redux**: A predictable state container for JavaScript apps.
- **React-Redux**: Official React bindings for Redux.
- **@fortawesome/react-fontawesome**: Font Awesome icons for React.

For a full list of dependencies, refer to the `package.json` file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
