import { Document, model, Schema, Types } from 'mongoose';
import * as crypto from 'crypto';

interface IUser {
    name: string;
    birthday: Date;
    password: string;
    salt: string;
    username: string;
    email?: string;
    phone?: string;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    salt: {
        type: String,
        default: crypto.randomBytes(16).toString('hex'),
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
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 16,
    },
});

userSchema.pre('save', function (next) {
    this.password = crypto.pbkdf2Sync(this.password, this.salt, 1000, 64, 'sha512').toString('hex');
    next();
});

export default model<IUser>('User', userSchema);

type User = Document<unknown, {}, IUser> &
    Omit<
        IUser & {
            _id: Types.ObjectId;
        },
        never
    >;

export function generatePayload(user: User) {
    return {
        name: user.name,
        birthday: user.birthday,
        username: user.username,
        email: user.email,
        phone: user.phone,
    };
}
