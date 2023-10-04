import mysql from 'mysql2/promise';

// Configurar el pool de conexiones
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'salacomputo',
  connectionLimit: 10, // Número máximo de conexiones en el pool
});

export default pool;
