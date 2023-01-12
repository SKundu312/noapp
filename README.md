# Noapp Assignment

Clone down this repository. You will need `node.js` and `git` installed globally on your machine.

## Routes in the app

1. Register user
2. Login user 
3. Upload csv file 
4. Authentication using jwt middleware

## 🛠 Installation and Setup Instructions

1. Installation: `npm install`
2. In the project directory, you can run: `npm start`

Runs the app in the development mode on [http://localhost:5000](http://localhost:5000) in your terminal.\

##  How to test the apis and routes

You may view the app on the url: [http://127.0.0.1:5000](http://127.0.0.1:5000).\
You can upload csv files(a sample `contactForm1.csv` file is provided in the directory), which then get stored in db and can also be found in public/uploads folder.\
The results can be viewed in the terminal.\

To test the jwt authentication middleware, you may use Postman/Thunder Client in your VSCode etc. to register and login the user. Every registered user will receive a `x-auth-token`.

Use this token with auth middleware to test other routes.





