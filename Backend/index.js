const express = require('express');
const mongoose = require('mongoose');
var cors = require("cors");
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoutes')
const dotenv = require('dotenv')
const hotelRoutes = require('./routes/hotelRoutes')
const roomTypesRoutes = require('./routes/roomTypesRoutes')
const roomRoutes = require('./routes/roomRoutes')
const guestRoutes = require('./routes/guestRoutes')

const app = express();

app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
dotenv.config();
mongoose
  .connect(
    "mongodb+srv://savagetechy90:WeJAlx3BgepAtjRq@cluster0.vyqtfl8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/api', hotelRoutes);
app.use("/api", roomRoutes);
app.use("/api", roomTypesRoutes);
app.use("/api", guestRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});