# Motiv8 Backend Code Task

## Project Overview

This Nest.js application includes the following features:

1. **Character Service**: Allows users to set and retrieve characters associated with their user ID.
2. **Number Service**: Allows users to set and retrieve numbers associated with their user ID.
3. **Result Service**: Combines the character and number associated with a user ID to generate a result.
4. **Rate Limiter Middleware**: Implements a rate limiter to control the rate of incoming requests and prevent abuse.
5. **Integration with Redis**: Utilizes Redis for efficient data storage and retrieval.
6. **Logging**: Provides clear startup messages indicating that the API is running and accessible.

## Key Components

1. **Modules**: Character, Number, Result, and Redis modules organize the application's functionality.
2. **Controllers**: Handle incoming HTTP requests and delegate tasks to the corresponding services.
3. **Services**: Contain the business logic for managing characters, numbers, and results.
4. **Middleware**: Implements rate limiting to ensure fair usage of the API.

## Testing

The project includes comprehensive end-to-end tests to ensure functionality and reliability. These tests verify:
- Setting and retrieving characters and numbers.
- Generating results from the stored data.
- Handling error cases appropriately.

## Getting Started

To run the application locally, please follow these steps:

### Clone the Repository

```bash
git clone https://github.com/Fire-Brand/m8-code-task.git
cd m8-code-task
```

### Install Dependencies

```bash
npm install
```

### Set Up Redis

Ensure Redis is running on your machine. You can use Docker to set up Redis easily:

```bash
cd docker
docker-compose up -d
```

### Start the Application

```bash
npm run start
```

### Run Unit Tests

```bash
npm run test
```

### Run End-to-End(Integration) Tests

```bash
npm run test:e2e
```

## Code Structure

Here is an overview of the key files and directories:

```
m8-code-task/
├── docker/
│   ├── docker-compose.yml
├── src/
│   ├── character/
│   │   ├── character.controller.ts
│   │   ├── character.module.ts
│   │   ├── character.service.spec.ts
│   │   ├── character.service.ts
│   ├── infrastructure/redis/
│   │   ├── repository/
│   │   │   ├── redis.repository.interface.ts
│   │   │   ├── redis.repository.ts
│   │   ├── redis.client.factory.ts
│   │   ├── redis.module.ts
│   ├── middleware/
│   │   ├── rate-limiter.middleware.ts
│   ├── number/
│   │   ├── number.controller.ts
│   │   ├── number.module.ts
│   │   ├── number.service.spec.ts
│   │   ├── number.service.ts
│   ├── result/
│   │   ├── result.controller.spec.ts
│   │   ├── result.controller.ts
│   │   ├── result.module.ts
│   │   ├── result.service.spec.ts
│   │   ├── result.service.ts
│   ├── service/
│   │   ├── redis.service.ts
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
├── test/
│   ├── app.e2e-spec.ts
│   ├── jest-e2e.json
├── .env
```

## Additional Notes

- **Environment Variables**: Ensure you have a `.env` file with the necessary configurations for Redis (e.g., `REDIS_HOST` and `REDIS_PORT`).
- **Logging**: When starting the application, you will see a log message indicating that the API is running and on which port, making it easy to verify successful deployment.

Please let me know if you have any questions or need further clarification on any part of the project.