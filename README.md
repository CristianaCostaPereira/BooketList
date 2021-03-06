# BooketList 👻📚📖
Final project for the <ins>ITGest Academy</ins>. <br>
Combining all the FrontEnd and BackEnd skills learned into a capstone project.

<img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/49ccf758592393.5a02159d4090a.jpg" width="850" height="650">

<br>

## Introduction
The main focus of this Web App (built in Vue.js) will be a readList and its core concept is a list of books you want to read in your lifetime.

You will be able to search for your favorite book or writer and create your very own and personal readList.

## Project setup
Clone or fork the project. <br>
Then, install all the required packages:

`cd` into your new folder and in there run:
```
npm install
```

#### Dependencies for <ins>`FrontEnd`</ins> (client folder):
    "axios": "^0.21.1",
    "bootstrap": "^5.0.1",
    "popper.js": "^1.16.1",
    "@popperjs/core": "^2.9.2",
    "jquery": "^3.6.0",
    "core-js": "^3.6.5",
    "vue": "^2.6.11",
    "vue-router": "^3.2.0",
    "vuetify": "^2.4.0",
    "vuex": "^3.4.0"

#### Dependencies for <ins>`BackEnd`</ins> (server folder):
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "indicative": "^7.4.4",
    "jsonwebtoken": "^8.5.1",
    "mysql2": "^2.2.5"

### Set the API
An account must be created to access the information needed and to validate the requests.
* [Google Books API](https://developers.google.com/books/docs/v1/getting_started)

### Environment Variables
Declare your API key and five other necessary variables so you can run the code.<br>
Create a `.env file`; should look like:
```
API_KEY=your-api-key
DB_HOST=your-db-host
DB_USER=you-db-user
DB_PASS=your-db-password
DB_DATABASE=your-db-schema-name
AUTHENTICATION_SECRET=your-secret
VUE_APP_API_KEY=your-api-key (this one will be in the .env file of the client-side)
```

## Set the App
This repository contains both the FrontEnd and the BackEnd code.<br>
So, to run the project for the FrontEnd, open the terminal in the root directory and run the command:

```
npm run serve
```

To run the server-side, open terminal in the root directory and run the command:

```
npm run start
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Author
[Cristiana Costa Pereira](https://github.com/CristianaCostaPereira) :octocat:

## Special Thanks to:
#### Copyright (c) 2021 by Julie Park (https://codepen.io/juliepark/pen/erOoeZ)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

