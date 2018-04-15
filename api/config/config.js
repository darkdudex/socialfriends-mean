module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URI || 'mongodb://localhost:27017/SocialFriends',
  SECRET_TOKEN: 'xxxeyabcJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ91685'
}