# Bun Express API

A TypeScript-based Express API running on Bun runtime.

## Prerequisites

- [Bun](https://bun.sh) installed on your machine

## Setup

1. Clone the repository
2. Install dependencies:
```bash
bun install
```

## Development

To start the development server:
```bash
bun run src/index.ts
```

The server will start at `http://localhost:3000`.

## Available Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check endpoint

## Features

- Express.js with TypeScript
- Built with Bun for fast performance
- JSON body parsing middleware
- Basic API structure with example endpoints
- TypeScript configuration optimized for Bun

## Project Structure

```
bun-express-starter/
├── src/
│   └── index.ts    # Main application entry point
├── tsconfig.json   # TypeScript configuration
├── package.json    # Project dependencies and scripts
└── README.md      # Project documentation
```
