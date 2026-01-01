---
sidebar_position: 3
---

# JWT Tokens

JWT (JSON Web Tokens) are used for authenticating individual users, primarily in the Developer Dashboard and frontend applications.

## How JWT Works

1. User logs in with email/password
2. Server validates credentials and returns a JWT
3. Client includes JWT in subsequent requests
4. Server validates JWT on each request

## Authentication Flow

### 1. User Registration

```bash
curl -X POST https://server.xpay-bits.com/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "developer@example.com",
    "password": "securePassword123!",
    "full_name": "John Developer",
    "company_name": "Acme Inc",
    "country": "Rwanda",
    "phone": "+250788123456"
  }'
```

Response:

```json
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "user_id": "uuid-here"
}
```

### 2. Email Verification

After registration, users receive an OTP code via email:

```bash
curl -X POST https://server.xpay-bits.com/v1/auth/verify \
  -H "Content-Type: application/json" \
  -d '{
    "email": "developer@example.com",
    "otp": "123456"
  }'
```

### 3. Login

```bash
curl -X POST https://server.xpay-bits.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "developer@example.com",
    "password": "securePassword123!"
  }'
```

Response:

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "developer@example.com",
    "full_name": "John Developer",
    "role": "developer",
    "verified": true
  }
}
```

### 4. Using the Token

Include the JWT in the Authorization header:

```bash
curl -X GET https://server.xpay-bits.com/v1/developer/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Token Structure

X-Pay JWTs contain:

```json
{
  "sub": "user-uuid",
  "email": "developer@example.com",
  "role": "developer",
  "iat": 1704067200,
  "exp": 1704153600
}
```

| Field   | Description                        |
| ------- | ---------------------------------- |
| `sub`   | User ID (UUID)                     |
| `email` | User's email                       |
| `role`  | User role (developer, admin, etc.) |
| `iat`   | Issued at timestamp                |
| `exp`   | Expiration timestamp               |

## Token Expiration

- **Default expiry**: 24 hours
- **Refresh tokens**: Not currently implemented

When a token expires, users must log in again.

## Logout

To invalidate a session:

```bash
curl -X POST https://server.xpay-bits.com/v1/auth/logout \
  -H "Authorization: Bearer your_jwt_token"
```

## Password Reset

### Request Reset

```bash
curl -X POST https://server.xpay-bits.com/v1/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "developer@example.com"}'
```

### Complete Reset

```bash
curl -X POST https://server.xpay-bits.com/v1/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "reset-token-from-email",
    "new_password": "newSecurePassword456!"
  }'
```

## Security Considerations

1. **Store tokens securely** - Use httpOnly cookies or secure storage
2. **Never log tokens** - Avoid printing tokens to console logs
3. **Use HTTPS** - All requests must use HTTPS
4. **Handle expiration** - Gracefully handle token expiry in your app
