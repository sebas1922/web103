import dotenv from 'dotenv';

// Load environment variables from .env file.
// This should be the first thing to run.
dotenv.config();

/**
 * A helper function to safely get environment variables.
 * If the variable is not found in process.env, it throws an error,
 * causing the application to fail fast on startup.
 *
 * @param key The name of the environment variable.
 * @returns The value of the environment variable.
 */
function getEnv(key: string): string {
  const value = process.env[key];
  if (value === undefined || value === null) {
    throw new Error(`FATAL: Environment variable "${key}" is not defined.`);
  }
  return value;
}

/**
 * A helper function to safely get environment variables and parse them as an integer.
 * If the variable is not found or is not a valid number, it throws an error.
 *
 * @param key The name of the environment variable.
 * @returns The parsed integer value.
 */
function getEnvAsInt(key: string): number {
    const value = getEnv(key);
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
        throw new Error(`FATAL: Environment variable "${key}" is not a valid integer. Value: "${value}"`);
    }
    return parsed;
}


// Define the application configuration by pulling from the environment.
// This is the single source of truth for all configuration.
const config = {
  NODE_ENV: getEnv('NODE_ENV'),
  PORT: getEnvAsInt('PORT'),
  DATABASE_URL: getEnv('DATABASE_URL'),
  POSTGRES_USER: getEnv('POSTGRES_USER'),
  POSTGRES_PASSWORD: getEnv('POSTGRES_PASSWORD'),
  POSTGRES_DB: getEnv('POSTGRES_DB'),
  POSTGRES_HOST: getEnv('POSTGRES_HOST'),
};

// Freeze the config object to make it immutable. This prevents
// any part of the application from accidentally modifying the configuration at runtime.
export const AppConfig = Object.freeze(config);
