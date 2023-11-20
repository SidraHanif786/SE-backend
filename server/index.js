const express = require('express');
const mongoDB = require('./mongoDB');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

mongoDB();
app.get("/",(req,resp)=> {
    resp.send("App is working")
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});