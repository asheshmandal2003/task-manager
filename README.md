# Task Management Application

Welcome to task management application. Here you can create your task using create, update and delete your tasks using AWS Lambda with DynamoDB and API Gateway integration.

## Features

- **User Registration and Authentication**: Users can sign up, log in, and securely manage their accounts using Passport.js for authentication.

- **Task Managemet**: Registered users can add new tasks, also they can update and delete the task using AWS serverless services.

- **JWT authentication**: JWT authentication is added for secure user access.

- **Responsive Design**: The entire application is built up using Reat js and Material Ui also it has an reponsive UI for every screen sizes.

## Technologies Used

- React.js
- Redux.js
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- Passport.js for user authentication
- Material UI
- Serverless Framework

## Installation and Setup

1. Clone the GitHub repository:

   ```shell
   https://github.com/asheshmandal2003/task-manager.git
   ```

2. Navigate to the project directory:

   ```shell
   cd task-manager
   ```
3. Navigate to the server directory:

   ```shell
   cd server
   ```
4. Install backend dependencies:

   ```shell
   yarn
   ```
5. Create a `.env` file using the `.example.env` file.

6. Run the backend development server:

   ```shell
   yarn run devServer
   ```

7. Navigate to the client directory(from project directory):

   ```shell
   cd client
   ```

8. Create a `.env` file using the `.example.env` file.

9. Install frontend dependencies:

   ```shell
   yarn
   ```
10. Start frontend development server:
    
   ```shell
   yarn dev
   or 
   yarn dev --port ${port}
   ```

11. Navigate to the aws-task-manager directory(from project directory):
    ```shell
    cd aws-task-manager
    ```
12. Install all dependencies:
    ```shell
    npm install
    ```
13. Check you have `serverless` installed or not, if not then install it using the below command:
    ```shell
    npm i -g serverless
    ```
14. Create an AWS IAM user attached with required policies, and create an access key for the IAM user and copy the  `access-key-id` and `secret-access-key`.

15. Connect AWS with serverless
    ```bash
    export AWS_ACCESS_KEY_ID=${yourIAMaccesskeyid}
    export AWS_SECRET_ACCESS_KEY=${yourIAMsecretaccesskey}
    ```
16. Deploy serverless:
    ```bash
    sls deploy
    ```

## Project Structure


   - `client/`: Contains the React.js frontend application.
   - `server/`: Contains the Node.js backend API.
   - `aws-task-manager/`: Contains serverless framework configurations and files.
   - `server/routes/`: Defines the API routes.
   - `server/controllers/`: Implements the route controllers.
   - `server/models/`: Defines the database models (using mongoose ODM).
   - `client/src/components`: Contains React components.
   - `client/src/state`: Contains Redux js cofigurations

