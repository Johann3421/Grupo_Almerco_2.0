const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:podereterno1@127.0.0.1:5432/postgres?schema=public'
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL successfully!');
    client.end();
  })
  .catch(err => {
    console.error('Connection error details:', err.message);
    process.exit(1);
  });
