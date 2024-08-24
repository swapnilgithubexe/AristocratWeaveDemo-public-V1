# AristoCrat Weave

## Overview

This project is a full-fledged e-commerce application built using the MERN stack. It includes backend and frontend functionalities, with features such as product management, user authentication, and various product-related operations. The project uses a range of libraries, components, and hooks to ensure a smooth and responsive user experience.

## How to Run the Project

1.  Clone the repository.
2.  Install dependencies for both frontend and backend using `npm install`.
3.  Set up environment variables in a `.env` file.
4.  Run the backend server using `npm run dev` (for development).
5.  Run the frontend using `npm start`.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Features](#features)
- [Frontend Details](#frontend-details)
  - [Libraries](#libraries)
  - [Hooks](#hooks)
  - [State Management](#state-management)
- [Backend Details](#backend-details)
- [Challenges Faced and Solutions](#challenges-faced-and-solutions)
- [How to Run the Project](#how-to-run-the-project)
- [Acknowledgements](#acknowledgements)

## Technologies Used

### Frontend:

- React 18
- Redux 4.x
- Axios
- react-redux
- react-toastify
- react-helmet-async
- react-rating-stars-component
- react-js-pagination
- Material-UI

### Backend:

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

## Project Structure

`root
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── app.js
│   ├── server.js
│   └── ...
└── frontend
    ├── public
    ├── src
    │   ├── components
    │   ├── redux
    │   ├── pages
    │   ├── App.js
    │   ├── index.js
    │   └── ...`

## Features

### Frontend:

- **Home Page**: Banner with a scroll button, product listings with pagination.
- **Product Details Page**: Displays detailed information about a product, including images, ratings, and reviews.
- **User Authentication**: Login and registration forms with form validation and avatar upload.
- **User Profile**: Display user details and allow profile updates.
- **Product Search**: Search functionality with filtering options for categories, price range, and ratings.

### Backend:

- **User Authentication**: Includes routes for registration, login, logout, and user details.
- **Product Management**: CRUD operations for products, including image uploads.
- **Error Handling**: Custom error handling for routes and middleware.

## Frontend Details

### Libraries

- **@redux-devtools/extension**: Used to integrate Redux DevTools for better debugging.
- **react-helmet-async**: Manages document head data asynchronously.
- **react-redux**: Connects React with Redux for state management.
- **react-toastify**: Displays notifications and alerts in the application.
- **redux**: Centralized state management for the application.
- **redux-thunk**: Middleware for handling asynchronous actions in Redux.
- **react-rating-stars-component**: Displays star ratings for products.
- **react-js-pagination**: Adds pagination functionality to product listing

### Hooks

- **useEffect**: Handles side effects in functional components.
- **useState**: Manages state within functional components.
- **useWindowSize**: Custom hook to adjust component layout based on window size.
- **useParams**: Extracts URL parameters in React Router.
- **useAlert**: Custom hook to manage alerts and notifications.
- **useSelector**: Accesses Redux state within components.
- **useDispatch**: Dispatches actions to Redux store.
- **useNavigate**: Navigates programmatically in React Router.

### State Management

- **Redux Store**: Manages global state for the application.
  - **Actions**: Handles asynchronous requests, error management, and state updates.
  - **Reducers**: Manages state changes based on dispatched actions.
  - **Constants**: Defines action types for consistency across actions and reducers.

## Backend Details

- **Express**: Handles routing and middleware for the server.
- **Mongoose**: Manages MongoDB connections and schemas.
- **dotenv**: Loads environment variables from a `.env` file.
- **Routes**: Defines API endpoints for user and product operations.
- **Controllers**: Handles business logic for routes.
- **Middleware**: Custom middleware for authentication, error handling, and more.

## Challenges Faced and Solutions

- **Version Compatibility**: Encountered issues with library versions. Resolved by researching and updating to compatible versions.
- **Redux Complexity**: Initially struggled with Redux setup. Solved by breaking down Redux into manageable parts: actions, reducers, and constants.
- **Error Handling**: Implemented custom error handling middleware to streamline error management across the application.

## Author

I am Swapnil Dutta. Hello! I worked at Capgemini India for a year and a half, and during that time I gained a lot of experience. Since then, I have made my way to the top of the web development industry.
My dream is to launch a clothing line, and I have started working on it by creating a trial website. Take a look, and do not forget to provide comments. and there is always room for development, therefore, please feel free to contribute to this project. I hope you have an amazing day!

## Acknowledgements

Special thanks to the TA for guidance on Redux, metadata management, and overall project structure. Additional resources include official documentation for React, Redux, and other libraries used.
