const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
  name: {
   type: String,
   validate: {
     validator: (name) => name.length > 2,
     message: 'Name must be longer than 2 characters.'
   },
   required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() {
  //can only use function instead of arrow function in order for "this" to refer to user instance
  return this.posts.length;
});

//middleware
UserSchema.pre('remove', function(next){
  const BlogPost = mongoose.model('blogPost');
  // this === joe(user instance)
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
