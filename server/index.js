const express = require('express');
const mongoDB = require('./mongoDB');
const productRouter = require('./router/Product');
const categoryRouter = require('./router/Category');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
mongoDB();
app.use(express.json()); // for parsing application/json
// app.use(express.urlencoded({ extended: true })); 

app.use("/product", productRouter)
app.use("/category", categoryRouter)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});