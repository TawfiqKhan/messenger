# Messenger

Messenger is a full stack app built with React that allow users to chat with other users.

## App Features

- Chat with other users
- See who is online when searching for another user.
- See whether the sent messages has been read by the recipient.
- See when the other user is typing.

## Final Product

!["Homepage"](https://github.com/special3220/scheduler/blob/master/docs/home.jpeg?raw=true)

!["Chat"](https://github.com/special3220/scheduler/blob/master/docs/chat.jpeg?raw=true)

## Framework/Services

- React with redux
- Axios
- Sequlize with PSQL
- socket.io

## Initial Setup

Create the PostgreSQL database (these instructions may need to be adapted for your operating system):

```
psql
CREATE DATABASE messenger;
\q
```

Update db.js to connect with your local PostgreSQL set up. The [Sequelize documentation](https://sequelize.org/master/manual/getting-started.html) can help with this.

Create a .env file in the server directory and add your session secret (this can be any string):

```
SESSION_SECRET = "your session secret"
```

In the server folder, install dependencies and then seed the database:

```
cd server
npm install
npm run seed
```

In the client folder, install dependencies:

```
cd client
npm install
```

### Running the Application Locally

In one terminal, start the front end:

```
cd client
npm start
```

In a separate terminal, start the back end:

```
cd server
npm run dev
```
