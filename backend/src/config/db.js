import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,    
    database: process.env.DB_NAME,
    options: {
        encrypt: false, // Use encryption for secure connections
        trustServerCertificate: true // Trust the server certificate (for development purposes)
    }
};

export const pool = await sql.connect(config);
export default sql;