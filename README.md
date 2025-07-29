# Football Fantasy Backend

This is the backend service for the Football Fantasy application. It manages teams, players, transfers, authentication, and more. The app uses Node.js, Express, MongoDB (via Mongoose), and JWT for authentication.

## Core Features

# Football Fantasy Backend

This is the backend service for the Football Fantasy application. It provides RESTful APIs for user authentication, team management, player transfers, and more. Built with Node.js, Express, MongoDB (Mongoose), and JWT authentication.

---

## Folder Structure

```
server/
│   package.json           // Project dependencies and scripts
│   tsconfig.json          // TypeScript configuration
│   nodemon.json           // Nodemon config for development
│   README.md              // Project documentation
│
├── src/
│   ├── @types/
│   │   └── express/
│   │       └── index.d.ts           // Express type definitions
│   ├── constants/
│   │   └── index.ts                 // Application-wide constants
│   ├── controllers/
│   │   ├── auth.ts                  // Auth route handlers
│   │   ├── team.ts                  // Team route handlers
│   │   └── transfer.ts              // Transfer route handlers
│   ├── data/
│   │   └── player_pool.json         // Static player pool data
│   ├── database/
│   │   └── mongoose.ts              // MongoDB connection setup
│   ├── middleware/
│   │   └── auth.ts                  // Authentication middleware
│   ├── models/
│   │   ├── auth.ts                  // Auth model
│   │   ├── players.ts               // Players model
│   │   ├── sessions.ts              // Sessions model
│   │   ├── team.ts                  // Team model
│   │   └── transfer.ts              // Transfer model
│   ├── routes/
│   │   ├── auth.ts                  // Auth routes
│   │   ├── index.ts                 // Main route index
│   │   ├── team.ts                  // Team routes
│   │   └── transfer.ts              // Transfer routes
│   ├── services/
│   │   ├── authService.ts           // Auth service logic
│   │   ├── playerService.ts         // Player service logic
│   │   ├── teamService.ts           // Team service logic
│   │   └── transferService.ts       // Transfer service logic
│   ├── utils/
│   │   ├── index.ts                 // Utility index
│   │   ├── jwt.ts                   // JWT helper functions
│   │   └── sendHttpResponses.ts     // HTTP response helpers
│   ├── index.ts                     // Main entry point
│   └── type.ts                      // Shared types
└── build/                           // Compiled JS output (after build)
```

### Description of Key Folders:

- **controllers/**: Handles business logic for API endpoints (authentication, team, transfer, etc.)
- **models/**: Mongoose schemas for MongoDB collections
- **routes/**: Defines REST API endpoints
- **services/**: Core business logic and data operations
- **middleware/**: Express middlewares (authentication, validation)
- **utils/**: Helper functions (JWT, error/response formatting)
- **data/**: Static data files
- **constants/**: Application-wide constants
- **@types/**: TypeScript type definitions

---

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn for package management
- MongoDB (running locally or remotely)

---

## Installation

Follow these steps to get the backend up and running:

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd football-fantasy-server
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root directory with the following:
   ```env
   MONGODB_URI = mongodb://localhost:27017/calo
   CLIENT_URL = http://localhost:3000
   JWT_ACCESS_SECRET = any_secret
   ```
4. **Start MongoDB server:**
   Make sure MongoDB is running locally or update the URI for remote connection.
5. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
6. **Build for production:**
   ```sh
   npm run build
   # or
   yarn build
   ```
   The compiled output will be in the `build/` directory.
7. **Start the production server:**
   ```sh
   npm start
   # or
   yarn start
   ```

---

## Usage

- **User Registration/Login:** Register new users and authenticate using JWT.
- **Team Creation:** Create and manage your fantasy football team.
- **Player Management:** View, list, and transfer players between teams.
- **Transfer Market:** List players for transfer, buy/sell players, and manage team budgets.
- **Squad Management:** Enforce squad size and budget rules.

---

## API Endpoints

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT token
- `GET /api/team` — Get the logged-in user's team
- `POST /api/team` — Create a new team
- `GET /api/players` — List all players
- `POST /api/transfer/list` — List a player for transfer
- `POST /api/transfer/buy` — Buy a player from the transfer market
- `POST /api/transfer/remove` — Remove a player from transfer list

> For more details, see the route files in `src/routes/`.

---

Feel free to contribute or open issues for improvements!
