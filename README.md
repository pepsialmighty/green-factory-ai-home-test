# Green Factory AI Home Test Book Search App

This React application allows users to search for books using the Open Library Search API. It features real-time search, pagination, and a simple client-side authentication system.

## Task Status

> Completed all task

## Features

- Real-time book search as you type
- Display of search results in a paginated table
- Fields displayed: author name, book title, edition count, and first publishing year
- Client-side authentication (mock)
- Responsive design
- Average search duration display

> Extra features
>
> - Automate CI/CD pipeline to build and push Docker image to Docker hub for initiation's convenience

## Prerequisites

##### Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

##### If you want to run with Docker

- Docker 19+
- docker-compose

## Development in local

To install the Book Search Application, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/your-username/book-search-app.git
   ```

2. Navigate to the project directory:

   ```
   cd book-search-app
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. To run the Book Search Application, use the following command:

   ```
   npm start
   ```

5. To build the Book Search Application, use the following command:

   ```
   npm run build
   ```

6. To test the Book Search Application, use the following command:

   ```
   npm run test
   ```

## Run in the local with docker-compose

- To quickly start the application with docker, please use `docker-compose`

```bash
docker-compose up -d
```

- Open the application at `http://localhost:3000`
