# Exploding Kittens Backend

## Description
This is the backend server for the Exploding Kittens game application. It provides the necessary APIs and functionalities to support the gameplay and interactions between users.

## Setup Instructions
1. **Clone the repository:** `git clone <repository-url>`
2. **Install dependencies:** `npm install`
3. **Set up environment variables:**
    - Create a `.env` file in the root directory
    - Define the following variables:
        ```makefile
        PORT=3000
        MONGODB_URI=<your-mongodb-uri>
        JWT_SECRET=<your-jwt-secret>
        ```
4. **Start the server:** `npm run server`

## Dependencies
- **bcrypt:** ^5.1.1
- **cors:** ^2.8.5
- **dotenv:** ^16.4.5
- **express:** ^4.18.3
- **jsonwebtoken:** ^9.0.2
- **mongoose:** ^8.2.1
- **nodemon:** ^3.1.0

## Scripts
- `npm run server`: Starts the server using nodemon for automatic reloading during development.
- `npm test`: Runs the tests for the backend (currently not implemented).
  
Other scripts can be added as needed for development, testing, and deployment purposes.

## License
This project is licensed under the ISC License.
