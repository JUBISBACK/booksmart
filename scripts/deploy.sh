#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma generate

# Run migrations
echo "Running database migrations..."
npx prisma db push --accept-data-loss

# Build the application
echo "Building application..."
npm run build

# Start the application
echo "Starting application..."
npm run start
