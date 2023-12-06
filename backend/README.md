# Backend - MVC Model

This repository contains the backend code for the application, structured around a Model-View-Controller (MVC) architecture to manage User, Pass, and Place entities.

## Models

### User
- `_id` (unique, auto-generated)
- `pass_id` (unique)
- `first_name`
- `last_name`
- `age` (18 to 150)
- `phone_number` (unique)
- `password`
- `address`

### Pass
- `_id` (unique, auto-generated)
- `level` (1 to 5)
- `created_at` (auto-generated)
- `updated_at` (auto-generated, auto-updated)

### Place
- `address`
- `phone_number` (unique)
- `required_pass_level` (1 to 5)
- `required_age_level` (18 to 150)

## Routes

### User Routes
- `POST /users`: Create a user
- `GET /users`: Get all users
- `GET /users/{id}`: Get user by ID
- `PUT /users/{id}`: Update user by ID
- `DELETE /users/{id}`: Delete user by ID
- `POST /users/{id}/access`: Grant access to a place for a user
- `GET /users/{id}/places`: Get available places for a user

### Pass Routes
- `POST /passes`: Create a pass
- `GET /passes`: Get all passes
- `GET /passes/{id}`: Get pass by ID
- `PUT /passes/{id}`: Update pass by ID
- `DELETE /passes/{id}`: Delete pass by ID

### Place Routes
- `POST /places`: Create a place
- `GET /places`: Get all places
- `GET /places/{id}`: Get place by ID
- `PUT /places/{id}`: Update place by ID
- `DELETE /places/{id}`: Delete place by ID

## Controllers

### UserController
- `get`: Retrieve all users or specific user(s)
- `create`: Create a new user
- `update`: Update an existing user
- `delete`: Delete an existing user
- `getById`: Get user by ID
- `getAccess`: Grant access to places for a user
- `getPlaces`: Get available places for a user

### PassController
- `get`: Retrieve all passes or specific pass(es)
- `create`: Create a new pass
- `update`: Update an existing pass
- `delete`: Delete an existing pass
- `getById`: Get pass by ID

### PlaceController
- `get`: Retrieve all places or specific place(s)
- `create`: Create a new place
- `update`: Update an existing place
- `delete`: Delete an existing place
- `getById`: Get place by ID

## Swagger Route

A Swagger route has been implemented to document the API endpoints. Visit `/api-docs` to explore the API documentation.

## Data Initialization

To populate the database with initial data, a `data.json` file and a `load_data.js` script are provided. Provide data into the .json file and then run `node load_data.js` to push data from the API to the server.

## Tests

Tests have been included to ensure the functionalities of the backend work as expected. Check the `/backend/tests` directory for test files.

## Docker

A Dockerfile is included to facilitate containerization of the backend application. Use the following commands to build and run the Docker container:

### Build Docker Image

```bash docker build -t backend-app .```

### Run Docker Container

docker run -p 3000:3000 backend-app

### Environment Variables

This application utilizes environment variables for configuration. Create a `.env` file in the `/backend` directory with the following variables:

`plaintext
MONGO_URI=your_database_connection_string
PORT=3000`

## Folder Structure

  /backend\
  ├── controllers/\
  |   ├── authController.js\
  │   ├── userController.js\
  │   ├── passController.js\
  │   └── placeController.js\
  ├── models/\
  │   ├── User.js\
  │   ├── Pass.js\
  │   └── Place.js\
  ├── routes/\
  │   ├── authRoutes.js\
  │   ├── userRoutes.js\
  │   ├── passRoutes.js\
  │   └── placeRoutes.js\
  ├── tests/\
  │   ├── models/\
  │   ├── routes/\
  │   ├── helpers.test.js\
  │   └── validators.test.js\
  ├── data.json\
  └── load_data.js\

## Authors

- Martins Kevin
