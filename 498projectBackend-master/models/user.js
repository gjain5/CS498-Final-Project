// Load required packages
var mongoose = require('mongoose');
var countAndFind = require('mongoose-count-and-find');

// Define our beer schema
var UserSchema   = new mongoose.Schema({
  fbid: {
      type: String,
      required: true},
  picture: {
      type: String,
      required: true},
  description: {
      type: String,
      default: ""},
  location: {
      type: String,
      default: ""},
  locationcoord: {
      type: Object,
      default: {}},
  name: {
      type: String,
      required: true},
  noshow: {
      type: Number,
      default: 0},
  rating: {
      type: Number,
      default: 0},
  total: {
      type: Number,
      default: 0},
  skills: {
      type: [String],
      default: []}
});

// Export the Mongoose model
UserSchema.plugin(countAndFind);
module.exports = mongoose.model('User', UserSchema);
