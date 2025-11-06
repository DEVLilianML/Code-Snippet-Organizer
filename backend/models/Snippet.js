const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  language: { type: String, default: '' },
  tags: { type: [String], default: [] },
  code: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false } // optional
}, { timestamps: true });

module.exports = mongoose.model('Snippet', snippetSchema);