const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write('data: Connected\n\n');

  const intervalId = setInterval(() => {
    const eventData = {
      message: 'This is an SSE message',
      timestamp: new Date().toISOString()
    };

    res.write(`data: ${JSON.stringify(eventData)}\n\n`);
  }, 5000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
