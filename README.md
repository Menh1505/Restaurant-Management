# Restaurant-Management
This document defines the basic requirements for a restaurant management system. The website will assist in managing key operations such as menu management, table management, and order processing.

# Install dependencies
After clone project, run this script to auto install all dependencies for both front-end and back-end:
```bash
npm install
```

## How to start
### Single start
- Client (front-end) run this scipt:
```bash
npm run start:client
```

- Server (back-end) run this scipt:
```bash
npm run start:server
```

### Multiple start
- To start both client (front-end) and server (back-end) run this script:
```bash
npm start
```

#Working folders
/restaurant-management-project
│
├── /client                   # Folder for React (front end)
│   ├── /public
│   ├── /src
│   ├── package.json
│   └── .env
│
├── /server                   # Folder for Express.js (back end)
│   ├── /src
│   ├── /controllers
│   ├── /models
│   ├── /routes
│   ├── package.json
│   └── .env
│
├── /scripts                  # Scripts use for both front end and back end
│   └── deploy.sh             # Example: script autos deploy
│
├── /config                   # Common configuration for client and server
│   └── .eslintrc.json        # Ex: Common ESLint configuration
│
├── .gitignore                # Files/directories that don't need to be committed to Git
├── README.md                 # Project doc
└── package.json              # Manage scripts run for both client and server
