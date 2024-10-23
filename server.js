// server.js

const express = require('express');
const bodyParser = require('body-parser');
const fetchRoutes = require('./routes/fetch');
const reportRoutes = require('./routes/reports');
const dotenv = require('dotenv');
const {ConnectDB} = require('./config/db');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, './.env') });
ConnectDB();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.send("Api is running");
})
app.use('/fetch', fetchRoutes);
app.use('/reports', reportRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
