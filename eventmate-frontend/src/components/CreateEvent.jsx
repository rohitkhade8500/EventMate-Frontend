import React, { useState } from 'react';
import axios from 'axios';

const EVENTS_URL = `${import.meta.env.VITE_API_BASE_URL}/api/events`;

function CreateEvent({ token }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  // If we don't have a token, don't show the form.
  if (!token) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
        <p className="text-gray-700">Please log in to create an event.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Create the Authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const eventData = {
      title,
      description,
      date,
      location,
    };

    try {
      // Send the token in the header
      await axios.post(EVENTS_URL, eventData, config);

      setMessage('Event created successfully! It will appear in the list.');
      // Clear the form
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
    } catch (err) {
      console.error('Create event failed:', err);
      setMessage('Failed to create event. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="datetime-local" // Use datetime-local for easy date and time picking
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          Create Event
        </button>
        {message && <p className="text-center text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
}


export default CreateEvent;


