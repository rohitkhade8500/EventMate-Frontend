import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = ${import.meta.env.VITE_API_BASE_URL}/api/events/upcoming;

function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function to fetch data
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setEvents(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch events. Make sure the backend server is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Call the function
    fetchEvents();
  }, []); // The empty array [] means this effect runs once on component mount

  // --- Render Logic ---

  if (loading) {
    return <p className="text-center text-gray-500">Loading events...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-6">
      {events.length === 0 ? (
        <p className="text-center text-gray-500">No upcoming events found.</p>
      ) : (
        events.map((event) => (
          <div key={event._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold text-indigo-600">{event.title}</h2>
              <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                {/* Format the date to be more readable */}
                {new Date(event.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <p className="text-gray-500 mb-4">{event.location}</p>
            <p className="text-gray-700">{event.description}</p>
          </div>
        ))
      )}
    </div>
  );
}


export default UpcomingEvents;
