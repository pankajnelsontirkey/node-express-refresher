const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const DB = process.env.CONN_STRING || 'mongodb://127.0.0.1/local_library';

main().catch((err) => console.log('error', err));

async function main() {
  await mongoose.connect(DB);
}
