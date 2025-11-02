# EventMate API

EventMate is a complete backend event management system built with Node.js, Express, and MongoDB. It provides a secure, token-based (JWT) API for creating, managing, and viewing events, including a special route for upcoming events.

## Features

* **JWT Authentication**: Secure user registration and login for event creators.
* **Full CRUD Operations**: Create, Read, Update, and Delete events.
* **Protected Routes**: Only the user who created an event can update or delete it.
* **Custom Route**: A public endpoint (`/api/events/upcoming`) to view only future events.
* **MongoDB Integration**: Uses Mongoose for robust data modeling and database connection.

---

## 🚀 Setup and Run Locally

Follow these steps to get the project running on your local machine.

### Prerequisites

* Node.js (v18+ recommended)
* MongoDB (A local instance or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account)
* Postman (or a similar tool for testing the API)

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/eventmate-api.git](https://github.com/your-username/eventmate-api.git)
cd eventmate-api
