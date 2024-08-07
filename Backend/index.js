const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoutes')
const roomRoute = require('./routes/roomRoutes')
const hotelRoutes = require('./routes/hotelRoutes')
const guestRoutes = require('./routes/guestRoutes');
const paymentRoutes = require('./routes/PaymentRoutes');
const roomAssignmentRoutes = require('./routes/roomAssignmentRoutes');
const expenseCategoryRoutes = require('./routes/expenseCategoryRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const extraServiceRoutes = require('./routes/extraServiceRoutes');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
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
app.use('/api',roomRoute);
app.use('/api', guestRoutes);
app.use('/api', roomAssignmentRoutes);
app.use('/api',paymentRoutes);
app.use('/api',expenseCategoryRoutes);
app.use('/api', expenseRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api', extraServiceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});