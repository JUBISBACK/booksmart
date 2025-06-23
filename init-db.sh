#!/bin/bash
set -e

# Wait for PostgreSQL to start
until PGPASSWORD=$POSTGRES_PASSWORD psql -h localhost -U $POSTGRES_USER -d $POSTGRES_DB -c '\q'; do
  echo "Postgres is unavailable - sleeping"
  sleep 1
  done

echo "Postgres is up - executing commands"

# Create database and user
PGPASSWORD=$POSTGRES_PASSWORD psql -h localhost -U $POSTGRES_USER -d $POSTGRES_DB -c "
CREATE DATABASE booksmart;
CREATE USER booksmart WITH PASSWORD 'booksmart';
GRANT ALL PRIVILEGES ON DATABASE booksmart TO booksmart;"
