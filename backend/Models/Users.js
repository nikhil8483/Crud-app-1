
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String, // Use 'type' instead of 'types'
        required: true
    },
    email: {
        type: String, // Use 'type' instead of 'types'
        unique: true
    },
    password: {
        type: String, // Use 'type' instead of 'types'
        required: true
    }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
