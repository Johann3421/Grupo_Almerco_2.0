const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:podereterno1@127.0.0.1:5432/postgres?schema=public'
});

client.connect()
  .then(async () => {
    console.log('Connected to PostgreSQL successfully!');
    try {
      await client.query('CREATE DATABASE techstore;');
      console.log('Database techstore created!');
    } catch (err) {
      if (err.code === '42P04') {
        console.log('Database already exists.');
      } else {
        throw err;
      }
    }
    client.end();
  })
  .catch(err => {
    console.error('Connection error details:', err.message);
    process.exit(1);
  });
