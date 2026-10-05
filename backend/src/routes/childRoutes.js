const express = require("express");

const {
  createChild,
  getChildren,
  getChildById,
  updateChild,
  deleteChild
} = require("../controllers/childController");

const router = express.Router();

// Register child
router.post("/", createChild);

// Get all children
router.get("/", getChildren);

// Get one child
router.get("/:id", getChildById);

// Update child
router.put("/:id", updateChild);

// Delete child
router.delete("/:id", deleteChild);

module.exports = router;