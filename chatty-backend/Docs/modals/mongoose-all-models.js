// Mongoose schemas for all models in a single file

const mongoose = require('mongoose');
const { Schema } = mongoose;

const authSchema = new Schema({
  username: String,
  uId: String,
  email: String,
  password: String,
  avatarColor: String,
  createdAt: { type: Date, default: Date.now },
  passwordResetToken: { type: String, default: '' },
  passwordResetExpires: Number
});

const userSchema = new Schema({
  authId: { type: Schema.Types.ObjectId, ref: 'Auth', index: true },
  profilePicture: { type: String, default: '' },
  postsCount: { type: Number, default: 0 },
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
  passwordResetToken: { type: String, default: '' },
  passwordResetExpires: Number,
  blocked: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  blockedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  notifications: {
    messages: { type: Boolean, default: true },
    reactions: { type: Boolean, default: true },
    comments: { type: Boolean, default: true },
    follows: { type: Boolean, default: true }
  },
  social: {
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    youtube: { type: String, default: '' }
  },
  work: { type: String, default: '' },
  school: { type: String, default: '' },
  location: { type: String, default: '' },
  quote: { type: String, default: '' },
  bgImageVersion: { type: String, default: '' },
  bgImageId: { type: String, default: '' }
});

const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  username: String,
  email: String,
  avatarColor: String,
  profilePicture: String,
  post: { type: String, default: '' },
  bgColor: { type: String, default: '' },
  imgVersion: { type: String, default: '' },
  imgId: { type: String, default: '' },
  videoVersion: { type: String, default: '' },
  videoId: { type: String, default: '' },
  feelings: { type: String, default: '' },
  gifUrl: { type: String, default: '' },
  privacy: { type: String, default: '' },
  commentsCount: { type: Number, default: 0 },
  reactions: {
    like: { type: Number, default: 0 },
    love: { type: Number, default: 0 },
    happy: { type: Number, default: 0 },
    wow: { type: Number, default: 0 },
    sad: { type: Number, default: 0 },
    angry: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

const commentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', index: true },
  comment: { type: String, default: '' },
  username: String,
  avataColor: String,
  profilePicture: String,
  createdAt: { type: Date, default: Date.now }
});

const reactionSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', index: true },
  type: { type: String, default: '' },
  username: { type: String, default: '' },
  avataColor: { type: String, default: '' },
  profilePicture: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const followerSchema = new Schema({
  followerId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  followeeId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  createdAt: { type: Date, default: Date.now }
});

const notificationSchema = new Schema({
  userTo: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  userFrom: { type: Schema.Types.ObjectId, ref: 'User' },
  read: { type: Boolean, default: false },
  message: { type: String, default: '' },
  notificationType: String,
  entityId: Schema.Types.ObjectId,
  createdItemId: Schema.Types.ObjectId,
  comment: { type: String, default: '' },
  reaction: { type: String, default: '' },
  post: { type: String, default: '' },
  imgId: { type: String, default: '' },
  imgVersion: { type: String, default: '' },
  gifUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const imageSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  bgImageVersion: { type: String, default: '' },
  bgImageId: { type: String, default: '' },
  imgVersion: { type: String, default: '' },
  imgId: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now, index: true }
});

const messageSchema = new Schema({
  conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation' },
  senderId: { type: Schema.Types.ObjectId, ref: 'User' },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User' },
  senderUsername: { type: String, default: '' },
  senderAvatarColor: { type: String, default: '' },
  senderProfilePicture: { type: String, default: '' },
  receiverUsername: { type: String, default: '' },
  receiverAvatarColor: { type: String, default: '' },
  receiverProfilePicture: { type: String, default: '' },
  body: { type: String, default: '' },
  gifUrl: { type: String, default: '' },
  isRead: { type: Boolean, default: false },
  deleteForMe: { type: Boolean, default: false },
  deleteForEveryone: { type: Boolean, default: false },
  selectedImage: { type: String, default: '' },
  reaction: Array,
  createdAt: { type: Date, default: Date.now }
});

const conversationSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User' },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = {
  Auth: mongoose.model('Auth', authSchema),
  User: mongoose.model('User', userSchema),
  Post: mongoose.model('Post', postSchema),
  Comment: mongoose.model('Comment', commentSchema),
  Reaction: mongoose.model('Reaction', reactionSchema),
  Follower: mongoose.model('Follower', followerSchema),
  Notification: mongoose.model('Notification', notificationSchema),
  Image: mongoose.model('Image', imageSchema),
  Message: mongoose.model('Message', messageSchema),
  Conversation: mongoose.model('Conversation', conversationSchema)
};
