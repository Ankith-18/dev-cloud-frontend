
---

## 📋 **AUTH ENDPOINTS**

### 1. Login
**POST** `/auth/login`

**Request:**

```json
{
  "email": "user@example.com",
  "password": "********"
}

{
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
{
  "projects": [
    {
      "id": 1,
      "name": "backend-api",
      "description": "Main backend API",
      "visibility": "private",
      "environments": [
        {
          "id": "env1",
          "name": "dev",
          "status": "active",
          "createdAt": "2024-01-15T10:00:00Z"
        }
      ],
      "createdAt": "2024-01-15T10:00:00Z",
      "status": "active"
    }
  ]
}