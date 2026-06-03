const { Client } = require('pg');

async function checkPass(pass) {
  const client = new Client({
    connectionString: `postgresql://postgres:${pass}@127.0.0.1:5432/postgres?schema=public`
  });
  try {
    await client.connect();
    console.log(`Success with password: ${pass}`);
    await client.end();
    process.exit(0);
  } catch (err) {
    console.log(`Failed with password: ${pass}`);
  }
}

async function run() {
  const passwords = ['root', 'admin', '123456', '1234', 'password', ''];
  for (const p of passwords) {
    await checkPass(p);
  }
  console.log('None worked.');
}

run();
