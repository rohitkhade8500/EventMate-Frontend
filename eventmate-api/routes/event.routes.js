const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getUpcomingEvents,
} = require('../controllers/event.controller');

// Import the auth middleware
const { protect } = require('../middleware/auth.middleware');

// --- Public Routes ---
router.get('/', getAllEvents); // Get all events

// IMPORTANT: This route must be BEFORE '/:id'
router.get('/upcoming', getUpcomingEvents); // Get upcoming events

router.get('/:id', getEventById); // Get a single event by its ID

// --- Protected Routes (Require a valid JWT) ---
router.post('/', protect, createEvent); // Create a new event
router.put('/:id', protect, updateEvent); // Update an event
router.delete('/:id', protect, deleteEvent); // Delete an event

module.exports = router;