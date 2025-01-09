# API Documentation

This API provides endpoints for user and captain registration, login, profile retrieval, and logout.

## Endpoints

### User Endpoints

#### 1. Register User

**URL:** `/user/register`

**Method:** `POST`

**Description:** This endpoint registers a new user.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

- **201 Created**
  ```json
  {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

- **400 Bad Request**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First-name should contain atleast 3 or more characters",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "password should contain atleast 6 characters",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
  }
  ```

#### 2. Login User

**URL:** `/user/login`

**Method:** `POST`

**Description:** This endpoint logs in an existing user.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

- **200 OK**
  ```json
  {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

- **400 Bad Request**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "password should contain atleast 6 characters",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

- **401 Unauthorized**
  ```json
  {
    "message": "Both fields are required"
  }
  ```

  ```json
  {
    "message": "Invalid Password"
  }
  ```

- **404 Not Found**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "message": "Internal Server Error"
  }
  ```

#### 3. Get User Profile

**URL:** `/user/profile`

**Method:** `GET`

**Description:** This endpoint retrieves the profile of the logged-in user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**

- **200 OK**
  ```json
  {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

- **401 Unauthorized**
  ```json
  {
    "message": "No token provided"
  }
  ```

  ```json
  {
    "message": "Unauthorized"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "message": "Internal Server Error"
  }
  ```

#### 4. Logout User

**URL:** `/user/logout`

**Method:** `GET`

**Description:** This endpoint logs out the user by clearing the authentication token.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**

- **200 OK**
  ```json
  {
    "message": "Logged out"
  }
  ```

- **401 Unauthorized**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "message": "Internal Server Error"
  }
  ```

### Captain Endpoints

#### 1. Register Captain

**URL:** `/captain/register`

**Method:** `POST`

**Description:** This endpoint registers a new captain.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Response:**

- **201 Created**
  ```json
  {
    "token": "jwt_token",
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

- **400 Bad Request**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First-name should contain atleast 3 or more characters",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "password should contain atleast 6 characters",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
  }
  ```

#### 2. Login Captain

**URL:** `/captain/login`

**Method:** `POST`

**Description:** This endpoint logs in an existing captain.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

- **200 OK**
  ```json
  {
    "token": "jwt_token",
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

- **400 Bad Request**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "password should contain atleast 6 characters",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

- **401 Unauthorized**
  ```json
  {
    "message": "Both fields are required"
  }
  ```

  ```json
  {
    "message": "Invalid Password"
  }
  ```

- **404 Not Found**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "message": "Internal Server Error"
  }
  ```

#### 3. Get Captain Profile

**URL:** `/captain/profile`

**Method:** `GET`

**Description:** This endpoint retrieves the profile of the logged-in captain.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**

- **200 OK**
  ```json
  {
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

- **401 Unauthorized**
  ```json
  {
    "message": "No token provided"
  }
  ```

  ```json
  {
    "message": "Unauthorized"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "message": "Internal Server Error"
  }
  ```

#### 4. Logout Captain

**URL:** `/captain/logout`

**Method:** `GET`

**Description:** This endpoint logs out the captain by clearing the authentication token.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**

- **200 OK**
  ```json
  {
    "message": "Logged out"
  }
  ```

- **401 Unauthorized**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "message": "Internal Server Error"
  }
  ```