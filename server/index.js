const express = require('express');
const mongoDB = require('./mongoDB');
const productRouter = require('./router/Product');
const categoryRouter = require('./router/Category');
const authRouter = require('./router/Auth');
const orderRouter = require('./router/Order');

require("dotenv").config();
mongoDB();

const app = express();
app.use(express.json()); // for parsing application/json
const port = process.env.PORT || 3000;
// app.use(express.urlencoded({ extended: true })); 

app.use("/product", productRouter)
app.use("/category", categoryRouter)
app.use("/auth", authRouter)
app.use("/orders", orderRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});