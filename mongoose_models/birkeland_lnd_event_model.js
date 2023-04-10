const mongoose = require("mongoose");

const birkeland_lnd_events_schema = new mongoose.Schema({
  operation: {
    type: String,
    required: true,
    unique: false,
  },
  event_type: {
    type: String,
    required: true,
    unique: false,
  },
  response : {
    type: {},
    required: true,
    unique: false,
  },
  created_at: {
    type: Date,
    required: true,
    unique: false,
    default: Date.now
  }
});

const birkeland_lnd_events_item = mongoose.model(
  "birkeland_lnd_events_item",
  birkeland_lnd_events_schema
);

module.exports = birkeland_lnd_events_item;
