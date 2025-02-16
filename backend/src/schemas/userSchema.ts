import mongoose from "mongoose";
import { UserType } from "../models/user.model.js";
import bcrypt from "bcryptjs"

 export const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
});



// this function tells MongoDB - before saving the user, hash the password.
userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
        next(); // next() is used to move to the next middleware
    }
});


const User = mongoose.model<UserType>('User', userSchema);

export default User;