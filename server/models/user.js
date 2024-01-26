import mongoose from "mongoose"
import passportLocalMongoose from "passport-local-mongoose"

const {Schema} = mongoose

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task"
        }
    ]
})

userSchema.plugin(passportLocalMongoose, {usernameField: "email"})

export const User = mongoose.model("User", userSchema)