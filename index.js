const express = require('express');
const redis = require('redis');
const jwt = require('jsonwebtoken');
const fakeUser = require('./data.json');

const PORT = 5000;
const app = express();
const client = redis.createClient();

app.use(express.json());

app.post('/login', (req, res) => {
  try {
    client.get('counter', (err, data) => {
      client.set('counter', parseInt(data) + 1);
      jwt.sign(fakeUser, 'secret', { expiresIn: '1d' }, (err, token) => {
        client.set(parseInt(data) + 1, token);
        res.cookie('jwt-id', parseInt(data) + 1);
        return res.send('logged in');
      });
    });
  } catch (error) {
    console.log(error);
  }

  // 1. Increment the counter.
  // 2. Map the counter to newly created token.
  // 3. Send the counter as response to store it in a cookie.
});

app.listen(PORT, () => {
  console.log(`Server at ${PORT}`);
});
