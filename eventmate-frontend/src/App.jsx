import React, { useState } from 'react';
import UpcomingEvents from './components/UpcomingEvents';
import Login from './components/Login';
import CreateEvent from './components/CreateEvent';

function App() {
  // This state will hold our token. null means we are logged out.
  const [token, setToken] = useState(null);

  // This function gets passed to the Login component
  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
    // You could also save the token to localStorage here
  };

  const handleLogout = () => {
    setToken(null);
    // You would also remove the token from localStorage here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto py-6 px-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-indigo-700">EventMate</h1>
          {token && ( // Only show logout if we are logged in
            <button
              onClick={handleLogout}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* --- LEFT COLUMN: Login or Create Event --- */}
          <div className="space-y-8">
            {/* This is a conditional render:
              If we have a token, show CreateEvent.
              If not, show Login.
            */}
            {token ? (
              <CreateEvent token={token} />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )}
          </div>

          {/* --- RIGHT COLUMN: Upcoming Events --- */}
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-800 text-center">
              Upcoming Events
            </h2>
            <UpcomingEvents />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;