import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    password: "12345678",
    host: "localhost",
    port: 5432,
    database: "jwt_sql",
});


export default pool;

