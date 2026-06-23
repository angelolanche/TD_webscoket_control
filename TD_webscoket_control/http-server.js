import express from 'express';
import { promises as fs } from 'fs';
import { createServer } from 'http';
import WebSocket from "ws";
import path from 'path';
import multierMiddlewere from './multer-middlewere.js';

const app = express();
const serverPort = 3010;
const server = createServer(app);
const upload = multierMiddlewere.multerMiddlewere();

app.use(express.static("public"));

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

// Image upload endpoint

app.post('/uploadImage', upload.array('images', 5), (req, res) => {
  console.log(req.files);
  res.send('All files uploaded!');
});
  
// Music upload endpoint
app.post('/uploadMusic', upload.single('music'), (req, res) => {
  console.log(req.file);
  res.send('Music file uploaded!');
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