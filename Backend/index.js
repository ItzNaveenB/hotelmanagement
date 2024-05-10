const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoutes')
const dotenv = require('dotenv')
const app = express();
app.use(express.json());
dotenv.config();
mongoose.connect('mongodb+srv://naveenbaghel5429:9dIixiuN2ZkPTjDh@cluster0.tu0mvm8.mongodb.net/hotelsManagement?retryWrites=true&w=majority&appName=Cluster0', {
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});