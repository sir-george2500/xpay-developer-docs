---
sidebar_position: 1
---

# Authentication Overview

X-Pay uses a combination of API keys and JWT tokens to authenticate requests. All API requests must include valid authentication credentials.

## Authentication Methods

### API Keys (Recommended for Server-Side)

API keys are the primary way to authenticate with X-Pay. Each account has two types of keys:

| Key Type       | Prefix                     | Usage                                 |
| -------------- | -------------------------- | ------------------------------------- |
| **Public Key** | `pk_sandbox_` / `pk_live_` | Client-side, non-sensitive operations |
| **Secret Key** | `sk_sandbox_` / `sk_live_` | Server-side, all operations           |

```bash
# Using Secret Key in Authorization header
curl -X GET https://server.xpay-bits.com/v1/developer/profile \
  -H "Authorization: Bearer sk_sandbox_your_secret_key"
```

### JWT Tokens (For Dashboard/Frontend)

JWT tokens are issued when users log in and are used for user-specific operations:

```bash
# Login to get JWT token
curl -X POST https://server.xpay-bits.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "your_password"}'

# Response includes JWT token
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

## Security Best Practices

:::danger Keep Secret Keys Secure
Never expose your secret key in client-side code, public repositories, or logs.
:::

1. **Environment Variables** - Store keys in environment variables
2. **Server-Side Only** - Use secret keys only on your backend
3. **Key Rotation** - Regenerate keys periodically
4. **HTTPS Only** - All API calls must use HTTPS

## Sandbox vs Live Keys

| Environment | Key Prefix                    | Purpose                        |
| ----------- | ----------------------------- | ------------------------------ |
| Sandbox     | `pk_sandbox_` / `sk_sandbox_` | Testing with fake transactions |
| Live        | `pk_live_` / `sk_live_`       | Real money transactions        |

:::tip
You can switch between environments in your [Dashboard Settings](https://dashboard.xpay-bits.com/settings).
:::

## Next Steps

- [API Keys Guide](/authentication/api-keys) - Detailed API key management
- [JWT Tokens](/authentication/jwt-tokens) - User authentication flow
