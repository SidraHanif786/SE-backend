const status = require("http-status");
const User = require("../schemas/User");
const { createToken, encrypt, decrypt } = require("../utils");

const signupUser = async (req, res) => {
  try {
    const { body } = req;

    //=== check if email exists
    const data = await User.findOne({ email: body.email });
    if (data) {
      return res
        .status(status.BAD_REQUEST)
        .send({ message: "User with this email already exist" });
    }
    //==== before creating checks
    body.isAdmin = false; //===== only one admin
    body.password = await encrypt(body.password);

    //====== create record
    const { name, email, _id, isAdmin } = await User.create(body);
    const token = createToken({
      email,
      _id,
      isAdmin,
    });
    res.status(status.CREATED).send({ data: { _id, name, email, token } });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //======== check if data is present
    const data = await User.findOne({ email });
    if (!data) {
      res
        .status(status.NOT_FOUND)
        .send({ message: "User not found. Create an account first" });
    }
    //======= check password ========
    const pass = await decrypt(password, data.password);
    if (!pass) {
      res.status(status.BAD_REQUEST).send({ message: "Password is incorrect" });
    }
    //====== create token
    const _id = data._id;
    if (data && pass) {
      const token = createToken({
        email,
        _id,
        isAdmin: data.isAdmin,
      });
      return res.status(status.OK).send({ data: { _id, email, token } });
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
    res.status(status.OK).send({ data: resp });
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
