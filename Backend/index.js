const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoutes')
const dotenv = require('dotenv')
const hotelRoutes = require('./routes/hotelRoutes')
const app = express();
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
mongoose.connect("mongodb://localhost:27017/hotelmanagement", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/api', hotelRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});