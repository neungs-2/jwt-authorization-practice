const express = require('express');
const redis = require('redis');
const jwt = require('jsonwebtoken');
const fakeUser = require('./data.json');

const PORT = process.env.PORT;
const app = express();
const client = redis.createClient();

app.use(express.json());

app.post('/protected', (req, res) => {
  const { id } = req.body;
  client.get(id, (err, data) => {
    jwt.verify(data, 'secret', async (err, payload) => {});
  });
});

app.post('/login', (req, res) => {
  try {
    client.get('counter', (err, data) => {
      client.set('counter', parseInt(data) + 1);
      jwt.sign(
        fakeUser,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' },
        (err, token) => {
          client.set(parseInt(data) + 1, token);
          res.cookie('jwt-id', parseInt(data) + 1);
          return res.send('logged in');
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server at ${PORT}`);
});
