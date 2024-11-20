const express = require('express');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const bodyParser = require('body-parser'); // Body parser middleware

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 3000;

const app = express();

// Increase the body size limit to 10MB for both JSON and URL encoded data
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// CORS middleware
app.use(cors());

// Routes
app.use('/products', ProductRouter);
app.use('/auth', AuthRouter);

// Ping route for health check
app.get('/ping', (req, res) => {
  res.send('PONG');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
