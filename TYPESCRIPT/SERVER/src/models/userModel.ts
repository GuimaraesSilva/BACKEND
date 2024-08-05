import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    // id: { type: String },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    avatar: { type: String, default: 'default.jpg'},
    role: { type: String, default: 'USER'},
    isActive: { type: Boolean, default: true},
}, 
{timestamps: true});

export interface IUser extends mongoose.Document {
    // id: string;
    name: string;
    email: string;
    password: string;
    avatar?: string;
    role?: string;
    isActive?: boolean;
}

export default mongoose.model<IUser>("User", UserSchema);
