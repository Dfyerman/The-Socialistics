const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    },
    ],
    friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    ],
},
{
    toJSON: {
        virtuals: true,
      },
      id: false,
}
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length; // Calculate the number of friends based on the friends array
});

const User = model('User', userSchema);

module.exports = User;