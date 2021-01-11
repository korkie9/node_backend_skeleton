const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, default: "No Company Added"  },
  message: { type: String, required: true}
});

module.exports = mongoose.model('Message', messageSchema);
