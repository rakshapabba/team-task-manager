const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

  // TASK TITLE
  title: {
    type: String,
    required: true,
    trim: true
  },

  // DESCRIPTION
  description: {
    type: String,
    default: ''
  },

  // TASK STATUS
  status: {
    type: String,

    enum: [
      'Pending',
      'In Progress',
      'Completed'
    ],

    default: 'Pending'
  },

  // PRIORITY
  priority: {

    type: String,

    enum: [
      'Low',
      'Medium',
      'High'
    ],

    default: 'Medium'
  },

  // DUE DATE
  dueDate: {
    type: Date
  },

  // ASSIGNED USER
  assignedTo: {

    type: mongoose.Schema.Types.ObjectId,

    ref: 'User'
  },

  // CREATED BY
  createdBy: {

    type: mongoose.Schema.Types.ObjectId,

    ref: 'User'
  },

  // PROJECT REFERENCE
  project: {

    type: mongoose.Schema.Types.ObjectId,

    ref: 'Project'
  }

},
{
  timestamps: true
});

module.exports =
  mongoose.model(
    'Task',
    TaskSchema
  );