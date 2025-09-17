const express = require('express');
const fs = require('fs').promises;
const http = require('http');
const WebSocket = require("ws");


const app = express();
const serverPort = 3000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ port: 5001 });
let keepAliveId;

app.use(express.static("public"));


wss.on("connection", function (ws, req) {
  console.log("Connection Opened");
  console.log("Client size: ", wss.clients.size);
  
  if (wss.clients.size === 1) {
    console.log("first connection. starting keepalive");
    keepServerAlive();
  }
  
  ws.on("message", (data) => {
    let stringifiedData = data.toString();
    if (stringifiedData === 'pong') {
      console.log('keepAlive');
      return;
    }
    
    broadcast(ws, stringifiedData, false);
  });
  
  ws.on("close", (data) => {
    console.log("closing connection");
    
    if (wss.clients.size === 0) {
      console.log("last client disconnected, stopping keepAlive interval");
      clearInterval(keepAliveId);
    }
  });
});

// Implement broadcast function because of ws doesn't have it
const broadcast = (ws, message, includeSelf) => {
  if (includeSelf) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  } else {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
};

/**
 * Sends a ping message to all connected clients every 50 seconds
*/
const keepServerAlive = () => {
  keepAliveId = setInterval(() => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('ping');
      }
    });
  }, 50000);
};

app.get('/', async (req, res) => {
  try {
    const [html, css] = await Promise.all([
      fs.readFile('index.html', 'utf8'),
      fs.readFile('styles.css', 'utf8')
    ]);
    
    const styledHtml = html.replace('</head>', `<style>${css}</style></head>`);
    res.send(styledHtml);
  } catch (error) {
    console.error('Error serving HTML:', error);
    res.status(500).send('Server Error');
  }
});
  
  // Serve static files from public directory
  app.use('/public', express.static('public'));
  
  // Block direct access to CSS
  app.get('/styles.css', (req, res) => {
    res.status(403).send('Direct access to CSS is not allowed');
  });
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  // 404 handler
  app.use((req, res) => {
    res.status(404).send('Page not found');
  });
  
  app.listen(serverPort, () => {
    console.log(`Server started on port ${serverPort}`);
  });