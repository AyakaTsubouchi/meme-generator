const express = require('express');
const request = require('request');

const app = express();
const proxy = require('http-proxy-middleware');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
module.exports = app => {
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:4000',
      changeOrigin: true
    })
  );
};
app.post('/api', (req, res) => {
  request(
    { url: 'https://api.imgflip.com/caption_image' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
