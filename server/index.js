const express = require('express');
const mongoDB = require('./mongoDB');
const productRouter = require('./router/Product');
const categoryRouter = require('./router/Category');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

mongoDB();

app.use("/product", productRouter)
app.use("/category", categoryRouter)

app.get("/",(req,resp)=> {
    resp.send("App is working")
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});