//create user schema 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true,},
        toDos: [{type: Schema.Types.ObjectId, ref: 'ToDo'}]
    }
);
//Export model
module.exports = mongoose.model('User', UserSchema);
