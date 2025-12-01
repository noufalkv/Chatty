// Example Mongoose schemas for one-to-one, one-to-many, and many-to-many relationships

const mongoose = require('mongoose');
const { Schema } = mongoose;

// One-to-One: User <-> Profile
const profileSchema = new Schema({
  bio: String,
  user: { type: Schema.Types.ObjectId, ref: 'User', unique: true }
});

const userSchema = new Schema({
  username: String,
  email: String,
  profile: { type: Schema.Types.ObjectId, ref: 'Profile', unique: true }
});

// One-to-Many: User -> Posts
const postSchema = new Schema({
  title: String,
  content: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});
// In User, you can optionally add:
// posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]

// Many-to-Many: Student <-> Course
const courseSchema = new Schema({
  name: String,
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});

const studentSchema = new Schema({
  name: String,
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Profile: mongoose.model('Profile', profileSchema),
  Post: mongoose.model('Post', postSchema),
  Student: mongoose.model('Student', studentSchema),
  Course: mongoose.model('Course', courseSchema)
};
