const mongoose = require('mongoose');

const ScheduledMessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  scheduledAt: {
    type: Date,
    required: true
  },
  inserted: { type: Boolean, default: false }
});

exports.ScheduledMessageModel = mongoose.model('Scheduled_Message',ScheduledMessageSchema)