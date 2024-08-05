import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String, require: true },
    email: { type: Number, require: true },
    password: { type: String, require: true },
});

export interface IUser extends mongoose.Document {
    id: string;
    name: string;
    email: string;
    password: string;
}

export default mongoose.model<IUser>("User", UserSchema);
