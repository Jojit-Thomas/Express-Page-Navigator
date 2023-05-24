const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DB_COLLECTIONS = require("../constants/dbCollections");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  // ... other fields
});

const UserModel = mongoose.model(DB_COLLECTIONS.USERS, userSchema);

module.exports = UserModel;