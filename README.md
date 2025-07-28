# Football Fantasy Backend

This is the backend service for the Football Fantasy application. It manages teams, players, transfers, authentication, and more. The app uses Node.js, Express, MongoDB (via Mongoose), and JWT for authentication.

## Core Features

- User authentication and session management
- Team creation and management
- Player management and transfers
- Transfer market with buy/sell logic
- Budget and squad size enforcement
- Secure API endpoints
- MongoDB integration for persistent storage
- JWT-based authentication

## Folder Structure

Here's the project structure:

```
├── constants/           # Contains constants and configuration variables
├── controllers/         # Implements business logic for handling API requests
├── data/                # Static data files (e.g., player pool)
├── database/            # MongoDB connection setup using Mongoose
├── middleware/          # Middleware for authentication and request handling
├── models/              # Mongoose models for MongoDB collections
├── routes/              # Defines the routes for the application (e.g., auth, team, transfer)
├── services/            # Business logic and service functions
├── utils/               # Reusable utility functions
├── @types/              # Application-wide TypeScript types and definitions
├── index.ts             # Main entry point for the application
├── package.json         # Project metadata and dependencies
├── tsconfig.json        # TypeScript configuration
├── nodemon.json         # Nodemon configuration for development
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI = mongodb://localhost:27017/calo
CLIENT_URL = http://localhost:3000
JWT_ACCESS_SECRET = any_secret
```

- `MONGODB_URI`: MongoDB connection string
- `CLIENT_URL`: URL of the frontend client
- `JWT_ACCESS_SECRET`: Secret key for signing JWT tokens

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (for data storage)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/salman-ansari-maju/football-fantasy-client.git
   cd football-fantasy-server
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Set up the `.env` file as described above.
4. Start MongoDB server.
5. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
6. The app should now be running on:
   ```
   http://localhost:5000
   ```

## API Endpoints

- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Login and receive JWT token
- **GET /api/team**: Get the logged-in user's team
- **POST /api/team**: Create a new team
- **GET /api/players**: List all players
- **POST /api/transfer/list**: List a player for transfer
- **POST /api/transfer/buy**: Buy a player from the transfer market
- **POST /api/transfer/remove**: Remove a player from transfer list

> For more details, see the route files in `src/routes/`.
