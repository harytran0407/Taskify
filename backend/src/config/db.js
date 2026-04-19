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

// Test database config
console.log('=== DATABASE CONFIG ===');
console.log('Config:', {
  user: config.user,
  password: config.password ? '***' : 'NOT SET',
  server: config.server,
  database: config.database
});
console.log('=======================');

export const pool = await sql.connect(config);
export default sql;