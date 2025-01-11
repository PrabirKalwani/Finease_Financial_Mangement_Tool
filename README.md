# ACE Hackathon

## Prerequisites

Make sure you have the following installed:

- Node.js (v14+)
- NPM or Yarn
- Firebase Account

## Steps to Set Up the Backend

### 1. Clone the repository

### 2. Install Dependencies

Use the package manager of your choice to install all necessary dependencies:

```bash
npm install
# or
yarn install
```

### 3. Add `firebaseService.json`

Copy the `firebaseService.json` file to the following path in your backend directory:

```
/Backend/src/firebaseService.json
```

### 4. Add `.env` File

Create a `.env` file in the `/Backend/src/` directory and add your environment variables. Rename the provided file to `.env`:

```
/Backend/src/.env
```

### 5. Import API Calls for Testing

You can import the provided Insomnia or Postman JSON file for API testing:

- If you're using Postman or Insomnia, simply import the JSON file provided.

### 6. API Routes

The following API routes are available for user registration, login, logout, and password reset:

- **Register User**

  ```
  POST /api/register
  ```

- **Login User**

  ```
  POST /api/login
  ```

- **Logout User**

  ```
  POST /api/logout
  ```

- **Reset Password**
  ```
  POST /api/reset-password
  ```

### 7. JSON Body for Login and Logout

For `login` and `logout` requests, use the following JSON structure:

```json
{
  "email": "example email",
  "password": "test password"
}
```

## Running the Backend

To run the backend server, use the following command:

```bash
node app.js

```

Your backend should now be up and running!

---

### Author

- **Prabir Kalwani**
