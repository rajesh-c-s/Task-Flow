# Task-Flow

## Task-Flow is a simple task management tool that allows you to create, manage, and track tasks. It is a simple and easy to use tool that helps you to manage your tasks and keep track of your progress.

## Installation
- Check if you have git installed on your system by running `git --version` in your terminal. If you don't have git installed, you can download it from [here](https://git-scm.com/downloads).
- Clone the repository by running `git clone` in your terminal.
- Navigate to the project directory by running `cd task-flow` in your terminal.
- Open the project in VS code editor by running `code .` in your terminal.
- In code editor terminal, cd server and run `npm install` to install the server dependencies.
- Create a .env file in the server directory and add the variable in the .env.example file.
- Please note that you should have a MongoDB database to connect to the server. You can create a free MongoDB database [here](https://www.mongodb.com/try).
- Also note that you should have a gmail account to send verification email. You can create a free gmail account [here](https://accounts.google.com/signup/v2/webcreateaccount?hl=en&flowName=GlifWebSignIn&flowEntry=SignUp).
- In the .env file SERVER_EMAIL and SERVER_PASSWORD are the email and password of the gmail account you created.
- Your usual gmail account password cannot be used for this purpose. You need to create an app password for this purpose. You can create an app password [here](https://myaccount.google.com/apppasswords).
- To create app password, `Goto to My Account -> Security -> Less secure app access -> Turn on access. -> Generate app password.`
- In the server directory, run `npm run dev` to start the server.
- In terminal if you get a message "Server listening on port 3000", then the server is running successfully.
- Open a new terminal and cd client and run `npm install` to install the client dependencies.
- In the client directory, run `npm run dev` to start the client.
- Open your browser and navigate to `http://localhost:5173/` to view the application.

## Features
- Create a task
- Update a task
- Delete a task
- Authenticate user
- Send verification email
- Reset password
- View all tasks

## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose
- React
- Tailwind CSS
- Nodemailer

## Contributing
- Fork the repository
- Clone the repository
- Create a new branch
- Make your changes
- Push your changes
- Create a pull request
- Please note that this is a simple project and I am not looking for any contributions at the moment.
- If you have any suggestions or improvements, please feel free to create an issue.

