const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const whitelists = (
  process.env.WHITELIST || 'http://localhost,127.0.0.1'
).split(',');
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const mongoose = require('mongoose');

const dbUrl = `mongodb://${dbUser}:${dbPass}@${dbHost}/${dbName}`;
console.log('try connecting to', dbUrl);
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
console.log('connected!');

app.use(
  cors((req, callback) => {
    const origin = req.header('Origin');
    if (whitelists.includes(origin) || !origin) {
      // should be allowed only in DEVs
      callback(null, true);
      return null;
    }
    console.log(origin);
    callback(new Error('Not allowed by CORS'));
  })
);

app.get('/', (req, res) => {
  res.status(200).json('hello world!');
});

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'success' });
});

app.listen(port, () => {
  console.log(`listening to localhost:${port}`);
});
