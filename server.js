const express = require('express');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cors = require('cors');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 5001;
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

let server;

app.use(cors(corsOptions));

app.use(express.json())
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});