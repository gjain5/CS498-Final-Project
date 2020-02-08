// Load required packages
var mongoose = require('mongoose');
var countAndFind = require('mongoose-count-and-find');

// Define our beer schema
var TaskSchema   = new mongoose.Schema({
  title: {
      type: String,
      required: true},
  requestorName: {
      type: String,
      default: ""},
  providerName: {
      type: String,
      default: ""},
  requestorId: {
      type: String,
      default: ""},
  providerId: {
      type: String,
      default: ""},
  requestorPicture: {
      type: String,
      default: ""},
  providerPicture: {
      type: String,
      default: ""},
  location: {
      type: String,
      default: ""},
  locationcoord: {
      type: Object,
      default: {}},
  description: {
      type: String,
      default: ""},
  date: {
      type: Date,
      required: true},
  price: {
      type: Number,
      default: 0},
  status: {
      type: String,
      default: "pending"},
  category: {
      type: String,
      default: "other"}
});

// Export the Mongoose model
TaskSchema.plugin(countAndFind);
module.exports = mongoose.model('Task', TaskSchema);
