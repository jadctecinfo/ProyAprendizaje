const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['programada', 'en_curso', 'ejecutada'], default: 'programada' }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
