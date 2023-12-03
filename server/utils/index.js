const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const encrypt = async (text) => {
  try {
    const hash = await bcrypt.hash(text, 10);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    return null;
  }
};

const decrypt = async (plainText, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainText, hash, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const createToken = (data) => {
  const token = jwt.sign(data, process.env.SEC_KEY, { expiresIn: "1h" });
  return token;
};

module.exports = { createToken, encrypt, decrypt };
