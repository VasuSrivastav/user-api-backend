# Backend API Documentation

## Authentication Routes

### Register User

- **URL:** `/api/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

### Login User

- **URL:** `/api/login`
- **Method:** `POST`
- **Description:** Logs in a user and returns a JWT token in a cookie.
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "JWT_TOKEN"
  }
  ```

### Logout User

- **URL:** `/api/logout`
- **Method:** `GET`
- **Description:** Logs out a user by clearing the JWT token cookie.
- **Response:**
  ```json
  {
    "message": "User logged out"
  }
  ```

### Google Sign-In

- **URL:** `/api/google-signin`
- **Method:** `POST`
- **Description:** Signs in a user using Google OAuth and returns a JWT token in a cookie.
- **Request Body:**
  ```json
  {
    "token": "GOOGLE_OAUTH_TOKEN"
  }
  ```
- **Response:**
  ```json
  {
    "token": "JWT_TOKEN"
  }
  ```

## Post Routes

### Create Post

- **URL:** `/api/posts`
- **Method:** `POST`
- **Description:** Creates a new post. Only accessible by logged-in users.
- **Request Body:**
  ```json
  {
    "title": "Post Title",
    "bio": "Short bio",
    "description": "Detailed description"
  }
  ```
- **Response:**
  ```json
  {
    "title": "Post Title",
    "bio": "Short bio",
    "description": "Detailed description",
    "user": "USER_ID",
    "createdAt": "2023-10-01T00:00:00.000Z",
    "updatedAt": "2023-10-01T00:00:00.000Z",
    "_id": "POST_ID"
  }
  ```

### Get Posts

- **URL:** `/api/posts`
- **Method:** `GET`
- **Description:** Retrieves posts created by the logged-in user.
- **Query Parameters:**
  - `page` (optional): Page number for pagination.
  - `limit` (optional): Number of posts per page.
- **Response:**
  ```json
  [
    {
      "title": "Post Title",
      "bio": "Short bio",
      "description": "Detailed description",
      "user": "USER_ID",
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z",
      "_id": "POST_ID"
    }
  ]
  ```

### Update Post

- **URL:** `/api/posts/:id`
- **Method:** `PUT`
- **Description:** Updates an existing post. Only accessible by the post owner.
- **Request Body:**
  ```json
  {
    "title": "Updated Post Title",
    "bio": "Updated short bio",
    "description": "Updated detailed description"
  }
  ```
- **Response:**
  ```json
  {
    "title": "Updated Post Title",
    "bio": "Updated short bio",
    "description": "Updated detailed description",
    "user": "USER_ID",
    "createdAt": "2023-10-01T00:00:00.000Z",
    "updatedAt": "2023-10-01T00:00:00.000Z",
    "_id": "POST_ID"
  }
  ```

### Delete Post

- **URL:** `/api/posts/:id`
- **Method:** `DELETE`
- **Description:** Deletes an existing post. Only accessible by the post owner.
- **Response:**
  ```json
  {
    "message": "Post deleted successfully"
  }
  ```

## Middleware

### JWT Authentication

- **Description:** Middleware that verifies the JWT token in the request headers. If the token is valid, the user information is attached to the request object. If the token is missing or invalid, a 401 Unauthorized or 403 Forbidden response is returned.

```javascript
import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};

export default authenticateJWT;
```

## Models

### User Model

- **Description:** Mongoose schema for the User model.
- **Fields:**
  - `name`: String, required
  - `email`: String, required, unique
  - `password`: String, required
  - `googleId`: String, unique, sparse (optional)
  - `createdAt`: Date, default: Date.now

### Post Model

- **Description:** Mongoose schema for the Post model.
- **Fields:**
  - `title`: String, required
  - `bio`: String, required
  - `description`: String, required
  - `user`: ObjectId, reference to User model, required
  - `createdAt`: Date, default: Date.now

`
