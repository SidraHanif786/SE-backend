const status = require("http-status");
const User = require("../schemas/User");
const createToken = require("../utils");

const signupUser = async (req, res) => {
  try {
    //=== check if email exists
    const data = await User.findOne({ email: req.body.email });
    if (data) {
      return res
        .status(status.BAD_REQUEST)
        .send({ message: "User with this email already exist" });
    }
    //====== create record
    req.body.isAdmin = false; //===== only one admin
    const { name, email, _id, password, isAdmin } = await User.create(req.body);
    const token = createToken({
      email,
      password,
      _id,
      isAdmin,
    });
    res.status(status.CREATED).send({data:{ _id, name, email, token }});
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email });
    if (!data) {
      res
        .status(status.NOT_FOUND)
        .send({ message: "User not found. Create an account first" });
    }
    if (data && data.password === password) {
      const token = createToken({
        email: data.email,
        password: data.password,
        _id: data._id,
        isAdmin: data.isAdmin,
      });
      const { email, _id, name } = data;
      return res.status(status.OK).send({data:{ _id, name, email, token }});
    } else {
      res
        .status(status.BAD_REQUEST)
        .send({ message: "Email or Password is incorrect" });
    }
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { page, size } = req.query;
    const resp = await User.paginate(
      {},
      { page: page || 1, limit: size || 10 }
    );
    res.status(status.OK).send({data:resp});
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { ...req.body });
    res.status(200).send({ message: "Successfully Updated" });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndDelete(_id);
    res.status(200).send({ message: "Successfully Deleted" });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
