import { Pool } from "pg";

const dbConnect =new Pool({
    host:Process.env.DB_HOST,
    user:Process.env.DB_USER,
    password:Process.env.DB_PASSWORD,
    database:Process.env.DB_USERNAME,
    port:process.env.DB_PORT
});

export default dbConnect;