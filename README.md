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
**Firefox May Block Axios Requests to Server, such that adding "New Rooms" is not possible**\
Works In Chrome\
Works In Edge\
Works In Opera
    
#### Socket and API
**Above Version 2.3.0 Socket produces Cors Errors**\
**Unhandled Cors causes many Errors as well for Axios**




# Rationale:
### MERN Stack
As a base this app has been initialised with `npx create-react-app` which provided the boilerplate for this application.
Much of the code is driven by the React, and a Websocket Frontend providing access to backend API's and Data. 
MongoDB is used to store relevant data like the chat rooms users create and persists them in models which mongoose handles.
Express then routes between the client and server allowing me to fetch the list of rooms and map them
into room components so that users who join those rooms can interact using WebSocket. 
A brief description of the tool chain is that when a user makes a room an ajax request is made to save the data from the
request body, and it is then saved into a room model. After which the users browser will refresh and display the room 
they have made in real time.

### Frontend
##### React.js
The Realtime Chat App Application uses React.js as this was specified in the brief however I am also aware of other
paradigms including Vue.js which is another widely available javascript framework. The project is initialised 
by `create-react-app`, for rapid
prototyping including some base dependencies which are required to develop using React. 
I utilised some component packages from npm like `react-bootstrap` to quickly configure my component layouts 
and imported some of my own css classnames for position and styling.
`bootsrap` is an extension of the former, `bootstrap.css` it houses a variety of components and modules 
which can be slotted into an application like building blocks.

For some purposes like styling it is not necessary to use the default styled components which is why
 I implemented my own CSS to conditionally render specific styles and 
position the elements I wanted within the chat component, or the list of rooms component.



##### Axios 
I am using axios to store new rooms into the database and then ordering them back when I want to 
fetch all the chat rooms. With the data I fetch back from axios I unpack it into a list of room components 
to then display all rooms from the server. Ajax requests handle a bulk of the work as imported functions and can be
re-used anywhere in code.


### Backend
##### Mongoose 
Using [Mongoose](https://mongoosejs.com/docs/index.html) I can provide a way to unpack axios requests and mantle the data from`request.body`
into a new model. I do this when adding a room I create a new room from the room model which is
a required import and connects incoming data with the room schema.

##### Http & Socket.io 
I store messages in `socket.io` on the server side via a set of helper functions. When a user connects to a room socket 
provides a new connection and joins the user to that room on the server. It then listens for and displays new messages
passed from other clients to the server within the specified room.

### Persistence
##### React Use Hooks
Using Custom React Hooks I have implemented the use of Local Storage from within the browser 
for persistence I have used a custom hook which can store the userId as a generated ID or Nickname which is stored 
locally similar to a phone number however for user inputted IDs they're not validated meaning users can have whatever 
name they input. Anything more than that would require complex persistence using mongoDB so to keep things simple within
the timeframe of the MVP I decided to store names locally. As long as the user cache is not reset
 or they are on an incognito tab
their user id will remain.

##### MongoDB
In addition to Mongoose is MongoDB which provides the database and context for Mongoose to connect to. I am using A
cloud-based database via the Atlas Cluster which is freely available to developers and has payment options for large
scaled projects. MongoDB is a NoSQL language and as a paradigm it is easy to visualise data into objects which can be
used. 

### Paradigms
##### JavaScript, ES6, React Hooks, Http, Express
React is a great framework for producing single page apps with many functional components which focus more on
show and tell which is a great aspect of the javascript paradigm. There are many features from EcmaScript 6 which
make producing functions and components much simpler. The syntax itself can be difficult making it a hindrance to learn
how to structure the code. A feature separate to JavaScript is react hooks within the [React.js] library, hooks help
to convert most classes to functional components with less code and readability. An added benefit of this is that 
it reflects the separation of concerns.
In some instances refreshing is unavoidable, when you create a new room you have to refresh the list of rooms 
to see the newly added room across multiple browsers or on first load. On another note of Importance [ExpressJs] requires
some knowledge of http transactions.[Anatomy of Http](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)
I applied some of these principles when producing my application within the node server.js file.
##### Snippets:
1.[Toolbar Component, ReactJs, Bootstrap and hooks](https://git.cardiff.ac.uk/c1843439/realtime-chat-app/-/snippets/18)

2.[Axios, Express to Mongo](https://git.cardiff.ac.uk/c1843439/realtime-chat-app/-/snippets/17)

3.[Socket Helper Functions](https://git.cardiff.ac.uk/c1843439/realtime-chat-app/-/snippets/16)

4.[Message Formatting Function, Moment returns Message Object](https://git.cardiff.ac.uk/c1843439/realtime-chat-app/-/snippets/15)

### Testing
##### Jest
There is no test coverage for this application due to the constraints of learning new software paradigms.
Adding test coverage for the whole application would produce cleaner code in production as well
 as fix some deployment bugs.




## Libraries used:
This application implements a number of libraries when tool chaining.
### client:
#### `use-sound`
As with any chat application sound is a major indication of interactivity which is why I have 
implemented a library which has a built in set of tools for playing sound within the app [use sound](https://www.npmjs.com/package/use-sound)

#### `react-bootstrap`
A well-rounded library of visual and functional components to quickly put together an application which looks\
professional and maintainable. [React BootStrap](https://react-bootstrap.github.io/)

#### `socket.io-client`
Socket for client side, use with hooks to listen and update virtual dom with newly emitted messages from server.

#### `uuid`
To generate secure IDs for users I have included this library as a function of the landing page [UUIDv4](https://www.npmjs.com/package/uuidv4)

#### `react-use`
I made use of this library to avoid coding my own useLocalStorage hook as it would have been unnecessary [React Use Hooks](https://www.npmjs.com/package/react-use)

### server:
#### `socket.io`
Socket for Server side

#### `nodemon`
Restart Development Server [Nodemon, Node Server Watcher](https://nodemon.io/)

#### `express`
Manage Requests and Routing for the client, server and database operations across http at realtime for backend 
operations. [ExpressJs](https://expressjs.com/)

#### `mongoose`
Database modelling and schema for MongoDB[MongooseJs](https://mongoosejs.com/docs/)


#### `mongodb`
Mongo Connector

#### `moment`
Used to format user messages to locale time [MomentJs](https://momentjs.com/)

#### `body-parser`
Parsing data can fail, this functions as an express middleware [Body Parser Middleware](https://www.npmjs.com/package/body-parser)

### root:
#### `axios`
Handle promises between the server and client-side [Axios](https://github.com/axios/axios)

## License
[MIT License]
