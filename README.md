# Kieriantech Financial

Kieriantech Financial is a secure Nest.js-based API service for managing financial transactions. This test aplication allows you to handle transactions as an agent while providing a secure and extensible foundation for future financial services development.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Endpoints](#endpoints)
- [License](#license)

## Getting Started

### Prerequisites

Before running the application, you'll need the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

You also need a running instance of MongoDB, and you should have a MongoDB connection URI.

## API Documentation

You can explore and interact with the API using Swagger UI, which provides a user-friendly interface for testing and understanding the available endpoints and their functionality.

- **Swagger UI**: [API Documentation](http://localhost:3000/api/docs/)

Use the Swagger UI link above to access the API documentation. It allows you to try out API requests, view request and response details, and understand how to use the various endpoints provided by the application.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/kieriantech-financial.git
   ```

2. Change into project directory:

   ```bash
   cd kieriantech-financial
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the application:

```bash
npm run start:dev
```

## Endpoints

The following API endpoints are available:

- **Create Agent**: `POST /api/agent/create`

  - Create a new agent by sending a JSON payload with the appropriate properties.

- **Fetch Agents**: `GET /api/agent`

  - Fetch all agents.

- **Fetch Agent**: `GET /api/agent/:agentId`

  - Fetch an agent using their unique 12-digit agent ID.

- **Delete Agent**: `DELETE /api/agent/:agentId`

  - Delete an agent by providing their unique `agentId`.

- **Create Transaction**: `POST /api/transaction/create`

  - Create a new transaction by sending a JSON payload with the appropriate properties.

- **Fetch Transaction logs**: `GET /api/transaction/logs`

  - Fetches all transactions.

Make requests to these endpoints using appropriate HTTP methods and JSON payloads.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# kieriantech-financial
