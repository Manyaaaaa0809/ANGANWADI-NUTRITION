const Child = require("../models/Child");

// ===============================
// CREATE CHILD
// ===============================
const createChild = async (req, res) => {
  try {
    const {
      name,
      dob,
      gender,
      parentGuardian,
      poshanId,
      anganwadiCenter,
      currentWeight,
      currentHeight
    } = req.body;

    // Check required fields
    if (
      !name ||
      !dob ||
      !gender ||
      !parentGuardian ||
      !poshanId ||
      !anganwadiCenter
    ) {
      return res.status(400).json({
        message: "Please provide all required child details."
      });
    }

    // Check duplicate Poshan ID
    const existingChild = await Child.findOne({ poshanId });

    if (existingChild) {
      return res.status(409).json({
        message: "A child with this Poshan ID already exists."
      });
    }

    const child = await Child.create({
      name,
      dob,
      gender,
      parentGuardian,
      poshanId,
      anganwadiCenter,
      currentWeight,
      currentHeight
    });

    res.status(201).json({
      message: "Child registered successfully.",
      child
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to register child.",
      error: error.message
    });
  }
};

// ===============================
// GET ALL CHILDREN
// ===============================
const getChildren = async (req, res) => {
  try {
    const children = await Child.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: children.length,
      children
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch children.",
      error: error.message
    });
  }
};

// ===============================
// GET SINGLE CHILD
// ===============================
const getChildById = async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);

    if (!child) {
      return res.status(404).json({
        message: "Child not found."
      });
    }

    res.status(200).json(child);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch child.",
      error: error.message
    });
  }
};

// ===============================
// UPDATE CHILD
// ===============================
const updateChild = async (req, res) => {
  try {
    const child = await Child.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!child) {
      return res.status(404).json({
        message: "Child not found."
      });
    }

    res.status(200).json({
      message: "Child updated successfully.",
      child
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update child.",
      error: error.message
    });
  }
};

// ===============================
// DELETE CHILD
// ===============================
const deleteChild = async (req, res) => {
  try {
    const child = await Child.findByIdAndDelete(req.params.id);

    if (!child) {
      return res.status(404).json({
        message: "Child not found."
      });
    }

    res.status(200).json({
      message: "Child deleted successfully."
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete child.",
      error: error.message
    });
  }
};

module.exports = {
  createChild,
  getChildren,
  getChildById,
  updateChild,
  deleteChild
};