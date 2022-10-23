import dotenv from "dotenv";

dotenv.config();

const POSTGRES_USERNAME = process.env.DB_USERNAME ?? "postgres";
const POSTGRES_PASSWORD = process.env.DB_PASS ?? "password";
const POSTGRES_HOSTNAME = process.env.DB_HOSTNAME ?? "localhost";
const POSTGRES_PORT = process.env.DB_PORT ?? "5432";
const DB_NAME = process.env.DB_NAME ?? "ivdb";
export const POSTGRES_CON_STRING = `postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOSTNAME}:${POSTGRES_PORT}/${DB_NAME}`;
