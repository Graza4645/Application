
// const {Pool} = require('pg')

// const connection = new Pool(
//     {
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   password: 'kolkata260@G',
//   database: 'places',
//     }
// )

// connection.connect()
// .then(()=>{console.log('Data Base Connected ......')})
// .catch((err)=>{console.error('Filed to connect with Date Base : ', err)})

// module.exports = connection;

require('dotenv').config();
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = isProduction
  ? process.env.RENDER_DB_URL
  : process.env.LOCAL_DB_URL;

const pool = new Pool({
  connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false, // Render requires SSL
});

// Test connection
pool.query('SELECT NOW()')
  .then(res => {
    console.log(`✅ Connected to ${isProduction ? 'Render' : 'Local'} Database`);
  })
  .catch(err => {
    console.error('❌ Failed to connect: ', err);
  });

module.exports = pool;

