const {Schema, model} = require('mongoose');

const thoughtSchema = new Schema(
    {
       thoughtText: {
        type: String,
        minLength: 1,
        maxLength: 280,
        required: true,
       },
       createAt: {
        type: Date,
        default: Date.now,
       },
       username: {
        type: String,
        required: true,
       },
       reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'reactionSchema',
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


const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => dateFormat(createdAt) // You can define a function like dateFormat to format the timestamp
  }
});

thoughtSchema
        .virtual('reactionCount')
        .get(function () {
            return this.reactions.length;
        });
const Thought = model('thought', thoughtSchema);

module.exports = Thought;