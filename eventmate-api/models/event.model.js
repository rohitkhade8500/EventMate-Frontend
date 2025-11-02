const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event must have a title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event must have a description'],
    },
    date: {
      type: Date,
      required: [true, 'Event must have a date'],
    },
    location: {
      type: String,
      required: [true, 'Event must have a location'],
    },
    // This is the link to the user who created the event
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This links this field to the 'User' model
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;