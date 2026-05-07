const express = require('express');

const router = express.Router();

const Project = require('../models/Project');


// CREATE PROJECT
router.post('/', async (req, res) => {

  try {

    const project = await Project.create(
      req.body
    );

    res.json(project);

  } catch (err) {

    res.status(500).json({
      msg: err.message
    });
  }
});


// GET PROJECTS
router.get('/', async (req, res) => {

  try {

    const projects = await Project.find();

    res.json(projects);

  } catch (err) {

    res.status(500).json({
      msg: err.message
    });
  }
});

module.exports = router;