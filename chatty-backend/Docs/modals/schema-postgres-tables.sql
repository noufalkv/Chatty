-- SQL table structure based on schema-postgres.prisma

CREATE TABLE auth (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  uId VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  avatarColor VARCHAR(50),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  passwordResetToken VARCHAR(255) DEFAULT '',
  passwordResetExpires BIGINT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  authId INTEGER REFERENCES auth(id),
  profilePicture TEXT DEFAULT '',
  postsCount INTEGER DEFAULT 0,
  followersCount INTEGER DEFAULT 0,
  followingCount INTEGER DEFAULT 0,
  passwordResetToken VARCHAR(255) DEFAULT '',
  passwordResetExpires BIGINT,
  blocked INTEGER[],
  blockedBy INTEGER[],
  notifications JSONB,
  social JSONB,
  work VARCHAR(255) DEFAULT '',
  school VARCHAR(255) DEFAULT '',
  location VARCHAR(255) DEFAULT '',
  quote VARCHAR(255) DEFAULT '',
  bgImageVersion VARCHAR(255) DEFAULT '',
  bgImageId VARCHAR(255) DEFAULT ''
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES users(id),
  username VARCHAR(255),
  email VARCHAR(255),
  avatarColor VARCHAR(50),
  profilePicture TEXT,
  post TEXT DEFAULT '',
  bgColor VARCHAR(50) DEFAULT '',
  imgVersion VARCHAR(255) DEFAULT '',
  imgId VARCHAR(255) DEFAULT '',
  videoVersion VARCHAR(255) DEFAULT '',
  videoId VARCHAR(255) DEFAULT '',
  feelings VARCHAR(100) DEFAULT '',
  gifUrl TEXT DEFAULT '',
  privacy VARCHAR(50) DEFAULT '',
  commentsCount INTEGER DEFAULT 0,
  reactions JSONB,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  postId INTEGER REFERENCES posts(id),
  userId INTEGER REFERENCES users(id),
  comment TEXT DEFAULT '',
  username VARCHAR(255),
  avataColor VARCHAR(50),
  profilePicture TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reactions (
  id SERIAL PRIMARY KEY,
  postId INTEGER REFERENCES posts(id),
  userId INTEGER REFERENCES users(id),
  type VARCHAR(50) DEFAULT '',
  username VARCHAR(255) DEFAULT '',
  avataColor VARCHAR(50) DEFAULT '',
  profilePicture TEXT DEFAULT '',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE followers (
  id SERIAL PRIMARY KEY,
  followerId INTEGER REFERENCES users(id),
  followeeId INTEGER REFERENCES users(id),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  userToId INTEGER REFERENCES users(id),
  userFromId INTEGER REFERENCES users(id),
  read BOOLEAN DEFAULT FALSE,
  message TEXT DEFAULT '',
  notificationType VARCHAR(50),
  entityId INTEGER,
  createdItemId INTEGER,
  comment TEXT DEFAULT '',
  reaction VARCHAR(50) DEFAULT '',
  post TEXT DEFAULT '',
  imgId VARCHAR(255) DEFAULT '',
  imgVersion VARCHAR(255) DEFAULT '',
  gifUrl TEXT DEFAULT '',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES users(id),
  bgImageVersion VARCHAR(255) DEFAULT '',
  bgImageId VARCHAR(255) DEFAULT '',
  imgVersion VARCHAR(255) DEFAULT '',
  imgId VARCHAR(255) DEFAULT '',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  conversationId INTEGER REFERENCES conversations(id),
  senderId INTEGER REFERENCES users(id),
  receiverId INTEGER REFERENCES users(id),
  senderUsername VARCHAR(255) DEFAULT '',
  senderAvatarColor VARCHAR(50) DEFAULT '',
  senderProfilePicture TEXT DEFAULT '',
  receiverUsername VARCHAR(255) DEFAULT '',
  receiverAvatarColor VARCHAR(50) DEFAULT '',
  receiverProfilePicture TEXT DEFAULT '',
  body TEXT DEFAULT '',
  gifUrl TEXT DEFAULT '',
  isRead BOOLEAN DEFAULT FALSE,
  deleteForMe BOOLEAN DEFAULT FALSE,
  deleteForEveryone BOOLEAN DEFAULT FALSE,
  selectedImage TEXT DEFAULT '',
  reaction JSONB,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  senderId INTEGER REFERENCES users(id),
  receiverId INTEGER REFERENCES users(id)
);
