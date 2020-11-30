import { config } from "dotenv";
config();

export = {
  "type": "postgres",
  "host": "127.0.0.1",
  "port": 5432,
  "username": "postgres",
  "password": "12345",
  "database": "dev-backend",
  "synchronize": false,
  "logging": false,
  "entities": [
    "src/db/entities/**/*.ts",
    "src/db/views/**/*.ts"
  ],
  "migrations": [
    "src/db/migrations/**/*.ts"
  ],
  "subscribers": [
    "src/db/subscribers/**/*.ts"
  ],
  "seeds": [
    'src/db/seeds/**/*{.ts,.js}'
  ],
  "cli": {
    "entitiesDir": "src/db/entities",
    "migrationsDir": "src/db/migrations",
    "subscribersDir": "src/db/subscribers",
    "seeds": ['src/db/seeds/**/*{.ts,.js}']
  }
};
