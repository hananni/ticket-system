# Redeem Ticket System

Welcome to the Redeem Ticket System repository! This project is a ticket redemption system built with Next.js, using Sequelize, PostgreSQL, and Docker.

## Architecture

The Redeem Ticket System follows a modular architecture using Nest.js module patterns. The architecture consists of controllers, services, and models, adhering to the principles of a RESTful API. The main models in the system are User, Ticket, and RedeemLog. The system also uses `class-validator` library to validate DTOs entry data and `nestjs/throttler` as a security layer of rate limiting used on redeem ticket endpoint.

### Controllers

Controllers in the project handle the incoming HTTP requests and define the API endpoints. They are responsible for validating the incoming data, invoking the corresponding service methods, and returning the appropriate HTTP responses. Each model typically has its own controller to handle specific CRUD operations and business logic related to that model.

### Services

Services in the project encapsulate the business logic and interact with the models. They handle the processing and manipulation of data, as well as any necessary validations or transformations. The services are responsible for communicating with the models and performing the required operations such as creating, updating, retrieving, or deleting data. The separation of concerns allows for better organization and maintainability of the codebase.

### Models

The models represent the data structures and schemas of the entities in the Redeem Ticket System. In this project, the main models are User, Tickets, and RedeemLog. The models define the structure, relationships, and constraints of the data. They interact with the database, retrieve and store information, and provide an abstraction layer for performing CRUD operations. The models are designed to ensure data integrity and consistency within the system.

The use of Nest.js module patterns, with controllers, services, and models, provides a scalable and maintainable architecture for the Redeem Ticket System. It promotes code reusability, separation of concerns, and easy extensibility. This architecture ensures a clear separation between the different layers of the application, facilitating the development and maintenance of the system.

### Rate Limiting the Ticket Redeem Endpoint

By configuring the throttler module, we can define the maximum number of requests allowed within a specific time period, such as a certain number of requests per minute or per hour. If a client exceeds this limit, further requests to the ticket redeem endpoint will be rejected.

## Installation

To run the Redeem Ticket System locally, follow the steps below:

1. Clone this repository to your local machine using the command:

```
git clone https://github.com/hananni/ticket-system
```

2. Change into the project directory:

```
cd ticket-system
```

3. Start the application:

```
yarn run dev
```

Using Docker, this command will build, launch the application in development mode and run migrations.

4. Access the application by navigating to `http://localhost:3000` in your web browser.

## Testing

To run the tests for the Redeem Ticket System, use the following command:

```
yarn test
```

This command will execute the test suite and provide detailed feedback on the application's functionality and integrity.

## Postman Collection

For testing the API endpoints of the Redeem Ticket System, you can use the [Postman collection](https://elements.getpostman.com/redirect?entityId=1445054-43557baa-b264-4cae-b29b-ed6aa31ee9f9&entityType=collection). The collection includes pre-configured requests for easy testing and integration.
