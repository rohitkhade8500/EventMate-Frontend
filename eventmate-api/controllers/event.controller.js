const Event = require('../models/event.model');
const User = require('../models/user.model');

// @desc    Get all events
// @route   GET /api/events
const getAllEvents = async (req, res) => {
  try {
    // Find all events and sort them by date (ascending)
    const events = await Event.find().sort({ date: 'asc' });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// @desc    Get a single event by ID
// @route   GET /api/events/:id
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('creator', 'email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Protected
const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    // Get the creator's ID from the 'protect' middleware
    const creatorId = req.userId;

    const event = new Event({
      title,
      description,
      date,
      location,
      creator: creatorId, // Link the event to the logged-in user
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Protected
const updateEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(444).json({ message: 'Event not found' });
    }

    // --- Authorization Check ---
    // Check if the logged-in user is the one who created the event
    if (event.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'User not authorized to update this event' });
    }
    // --- End Check ---

    // If authorized, update the fields
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;

    const updatedEvent = await event.save();
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Protected
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // --- Authorization Check ---
    if (event.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'User not authorized to delete this event' });
    }
    // --- End Check ---

    // --- UPDATED CODE ---
    // Use findByIdAndDelete (for Mongoose v6+) instead of event.remove()
    await Event.findByIdAndDelete(req.params.id);
    // --- END UPDATED CODE ---

    res.status(200).json({ message: 'Event removed' });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// @desc    Get upcoming events
// @route   GET /api/events/upcoming
const getUpcomingEvents = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of the day

    const events = await Event.find({
      date: { $gte: today } // Find events where the date is greater than or equal to today
    }).sort({ date: 'asc' }); // Sort by date, soonest first

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getUpcomingEvents,
};