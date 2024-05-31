import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

// Conectarnos a la base de datos Postgres
const pool = new Pool({
    allowExitOnIdle: true,
    connectionString: process.env.CONNECTION_STRING
});

try {
    await pool.query("SELECT NOW()");
    console.log("Conexion a Postgres ok....");
} catch (error) {
    console.log(error);
}


export { pool }; // Exportar como un valor nombrado
