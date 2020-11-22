# Realtime Chat App
Summary:\
A Realtime Chat Application produced with React.js and delivers jsx to the client. It is deployed on a node server which implements MongoDB's "Atlas Database Cluster"\.
Additionally, this project was bootstrapped with [Create React App || CRA](https://github.com/facebook/create-react-app).

# Setup Instructions:
### 1 | Install Dependencies
#### `npm install`
In order to deploy this app you must install dependencies in all 3 directories:\
**Project Root**\
**Client**\
**Server**

### 2 | Run the App
#### `cd client | "Followed by" | npm run start`
**It is required to visit the page itself**\
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any errors in the console.
### 3 | Run the Server
#### `cd server | "Followed by" | npm run dev`
**It is required to allow the application to transmit server side requests.**

### Documentation
This App uses React: [React documentation](https://reactjs.org/).

### Compatibility
#### Browsers
**Does not work with some Adblockers on Firefox**\
**Firefox May Block API Calls Axios**\
Works In Chrome\
Works In Edge\
Works In Opera\
    
#### Socket and API
**Above Version 2.3.0 Socket produces Cors Errors**\
**Unhandled Cors causes many Errors as well for Axios**\


## Tech Stack
As a base this app has been initialised with `npx create-react-app` which provided the boilerplate for this application.

## Justification


## Libraries used:
This application implements a number of libraries when tool chaining.
### client:
#### `use-sound`
As with any chat application sound is a major indication of interactivity

#### `react-bootstrap`
A well-rounded library of visual and functional components to quickly put together an application which looks\
professional and maintainable.

#### `socket.io-client`
Socket for client side 

#### `uuid`
To generate ID's

#### `react-use`
Extra hooks

### server:
#### `socket.io`
Socket for Server side

#### `nodemon`
Restart Development Server

#### `express`
Manage Requests

#### `mongoose`
Database modelling and schema for MongoDB

#### `mongodb`
Mongo Connector

#### `moment`
Timestamp

#### `body-parser`
Parsing data

### root:
#### `axios`
Handle requests between the server and client-side
