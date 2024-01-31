 # Character API

This project is a simple API that saves characters from a JSON file into a PostgreSQL database. It uses the Express framework for Node.js and the Sequelize ORM.

## Installation

To install the dependencies, run the following command in the project directory:

```
npm install
```

## Configuration

The database connection is configured in the `config/config.json` file. You will need to provide the following information:

* `host`: The hostname of the database server.
* `port`: The port number of the database server.
* `database`: The name of the database.
* `username`: The username to connect to the database.
* `password`: The password to connect to the database.

## Usage

To start the API, run the following command in the project directory:

```
npm start
```

The API will listen on port 3001.

## Code Overview

The `app.js` file is the entry point of the application. It creates an Express app and configures the database connection.

The `src/db/index.js` file establishes the connection to the database.

The `src/Controllers/SaveCharactersOnDb.js` file contains the logic to save the characters from the JSON file into the database.

## Step-by-Step Explanation

1. The `app.js` file imports the Express framework and the `conn` object from the `src/db/index.js` file.
2. It creates an Express app and configures the database connection.
3. It starts the API on port 3001.
4. The `src/db/index.js` file establishes the connection to the database using the Sequelize ORM.
5. The `src/Controllers/SaveCharactersOnDb.js` file reads the characters from the JSON file and saves them into the database.

## Conclusion

This project is a simple example of how to use the Express framework and the Sequelize ORM to create a REST API. It can be used as a starting point for more complex projects.