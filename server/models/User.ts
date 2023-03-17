import { model, Schema } from 'mongoose';
import * as crypto from 'crypto';

interface IUser {
    name: string;
    birthday: Date;
    password: string;
    username: string;
    email: string;
    phone: string;
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 16,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
    },
    email: {
        type: String,
        match: /[^@]+@[^@]+/,
    },
    phone: {
        type: String,
        match: /^\+?[1-9][0-9]{7,14}$/,
    },
});

userSchema.pre('save', function (next) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(this.password, salt, 1000, 64, 'sha512');
    this.password = `${salt}|${hash}`;
    next();
});

export default model<IUser>('User', userSchema);
