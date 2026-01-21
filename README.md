# Playoff Fantasy

## Tech Stack

### Frontend
- **React** – Handles the user interface and client-side logic

### Backend
- **Express.js** – REST API for handling requests, business logic, and communication with the database

### Authentication & Database
- **Supabase**
  - User authentication (email/password)
  - Data storage
  - Built on **PostgreSQL**


## Architecture Overview

- The **React frontend** communicates with the Express backend via HTTP requests.
- The **Express backend** handles API routes and server-side logic.
- **Supabase** manages:
  - User authentication
  - PostgreSQL database storage
- Environment variables are used to securely store API keys and database credentials


## Setup & Installation

### Prerequisites
- Node.js
- npm
- Supabase account

### Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

## How to Run
### Backend (Express)

```bash
cd server
npm install
npm run dev
```

### Frontend (React) 
```bash 
cd client 
npm install
npm run start
```