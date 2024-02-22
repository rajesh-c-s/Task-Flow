import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

/*-----------------userSchema-----------------*/
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: null,
    index: true,
  },
});

/*-----------------static register method-----------------*/
userSchema.statics.register = async function (username,email, password) {
  // validation
  if (!username || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash });
  return user;
};

/*-----------------static login method-----------------*/
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email not registered");
  }
  if (!user.isEmailVerified) {
    throw Error("Email not verified");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

/*-----------------static resetPassword method-----------------*/
userSchema.statics.resetPassword = async function (email, newPassword) {
  if (!email || !newPassword) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email not registered");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  await this.findOneAndUpdate({ email }, { password: hash });
};

/*-----------------static store token method-----------------*/
userSchema.statics.storeVerificationToken = async function(email, token) {
  //console.log(token);
  await this.findOneAndUpdate(
    { email },
    { $set: { verificationToken: token } },
    { upsert: true }
  );
};

/*-----------------static verification token method-----------------*/
userSchema.statics.getVerificationToken = async function (token) {
  return await this.findOne({ verificationToken: token });
};

/*-----------------static mark email as verified method-----------------*/
userSchema.statics.markEmailAsVerified = async function (email) {
  await this.updateOne(
    { email },
    { $set: { isEmailVerified: true, verificationToken: null } }
  );
};

export const userModel = mongoose.model("User", userSchema);
