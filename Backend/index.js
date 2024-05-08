const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute')
const dotenv = require('dotenv')
const app = express();
app.use(express.json());
dotenv.config();
mongoose.connect('mongodb+srv://naveen:naveen@cluster0.uoukw6g.mongodb.net/hotelManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});
app.use('/user', userRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});