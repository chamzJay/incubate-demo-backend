const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

UserSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Unable to login. No user found");
  }
  let passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    throw new Error("Unable to login. Password Incorrect");
  }
  return user;
};

var User = mongoose.model("User", UserSchema);

module.exports = User;
