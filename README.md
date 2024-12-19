# Elryan Task Assignment

This is a simple task assignment for a web developer position.

# Description

## Section 1: Coding Challenge
Create a GitHub repo and use toggl for time tracking.
Build an Express API Endpoint (20 Points)
Create a POST endpoint /users to register a new user in a MongoDB database using Mongoose.

User Schema:
javascript
Copy code
```javascript
const userSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
createdAt: { type: Date, default: Date.now }
});
```

Implement validation to ensure the email is unique.
Respond with appropriate success or error messages.
Pagination API (15 Points)
Implement a GET endpoint `/users` that:
Supports pagination using query parameters `page` and `limit`.
Retrieves a paginated list of users from the database.
Example Request: `/users?page=2&limit=5`

Example Response:
json
Copy code
```json
{
"users": [...],
"currentPage": 2,
"totalPages": 10
}
```

Implement Error Handling Middleware (15 Points)
Add global error handling middleware to handle:
Validation errors.
404 errors (route not found).
Generic server errors.

Ensure the error response contains:
json
Copy code
```json
{
"error": true,
"message": "Error message here"
}
```

## Section 2: Debugging Task
Scenario: A developer wrote the following code, but it’s not working as expected. Fix the issues and explain your changes.

javascript
Copy code
```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/testdb');

const User = mongoose.model('User', new mongoose.Schema({
name: String,
email: String
}));

app.use(express.json());

app.post('/users', async (req, res) => {
const user = new User(req.body);
await user.save();
res.status(201).send({ message: 'User created', user });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```
### Issues:

The server crashes when invalid data is sent to the /users endpoint.
Connection to MongoDB is unreliable.

The app doesn’t handle duplicate email errors properly.


## HOW TO RUN
Run the app

```bash
npm run dev
```

Run the tests

```bash
npm run test
```

## Loggr Time Tracking
Time needed:
[toggl.com](https://track.toggl.com/shared-report/e3e27362136467c2963e2a37422aaae6)

#### THANK YOU