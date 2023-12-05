# Frontend README

This repository contains the frontend code for the application, responsible for user interactions with the backend database, providing a smooth and comfortable user experience.

## Installation and Setup

### Prerequisites
- Node.js installed locally.

### Steps
1. Clone this repository.
2. Navigate to the `/frontend` directory.
3. Run `yarn` to install frontend dependencies.
4. Configure the backend API endpoint URLs in the React code, usually in `src/api.js` or environment variables.

## Available Routes

### User Creation
- `/`: Sign-in page for creating a new user using the `User.create` functionality.

### Profile Management
- `/profile`: Update user information and access your pass profile.
- `/passes/pass_id`: Update pass level for a specific pass.

### Places
- `/places`: Access all available places.
- `/places/id`: Specific page for a particular place.

### User Access
- `/user/user_id/access`: Allow access if the user has permission.
- `/user/user_id/places`: Show available places for the user (filtered).

### Other Routes
- `/home`: Home page.
- `/404`: 404 Error page.

### Testing

The frontend includes tests to ensure its functionalities work as expected.

#### Running Tests
- Run `yarn test` in the `/frontend` directory to execute the tests.

## Usage

1. Run `yarn start` in the `/frontend` directory or the `./client.sh`in the root folder to start the React development server.
2. Access the application in your browser at `http://localhost:frontend_port`.

## Folder Structure

    /frontend
    ├── public/
    ├── src/
        ├── tests/
    ├── package.json
    └── tailwind.config.js
    .gitignore
    client.sh
    server.sh

## Contributing
- Contributions to the frontend are welcome! Follow the general contribution guidelines in the main README.

## Authors
- List of contributors to the frontend implementation.

## License
- This frontend part is under the same license as the fullstack application (usually MIT License).