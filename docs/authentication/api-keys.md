---
sidebar_position: 2
---

# API Keys

API keys are long-lived credentials used to authenticate your application with X-Pay. They provide direct access to all API endpoints and should be treated like passwords.

## Getting Your API Keys

1. Log in to your [Developer Dashboard](https://dashboard.xpay-bits.com)
2. Navigate to **Settings → API Keys**
3. Copy your keys (they're hidden by default for security)

## Key Types

### Public Key (`pk_...`)

- Safe to expose in client-side code
- Limited to non-sensitive read operations
- Cannot initiate payments or access sensitive data

**Example uses:**

- Tokenizing card details
- Validating payment forms

### Secret Key (`sk_...`)

- Must be kept secure on your server
- Full access to all API operations
- Can initiate payments and refunds

**Example uses:**

- Creating payments
- Refunding transactions
- Accessing transaction history

## Using API Keys

Add your API key to the `Authorization` header:

```bash
curl -X GET https://server.xpay-bits.com/v1/developer/profile \
  -H "Authorization: Bearer sk_sandbox_your_secret_key" \
  -H "Content-Type: application/json"
```

In JavaScript:

```javascript
const response = await fetch(
  "https://server.xpay-bits.com/v1/developer/profile",
  {
    headers: {
      Authorization: `Bearer ${process.env.XPAY_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  }
);
```

## Regenerating Keys

If you suspect your keys have been compromised:

1. Go to **Settings → API Keys** in your dashboard
2. Click **Regenerate Keys**
3. Confirm the action
4. Update your application with the new keys

:::warning
Regenerating keys immediately invalidates the old keys. Update your applications before regenerating to avoid downtime.
:::

## Environment Variables

Store your keys securely using environment variables:

```bash
# .env file (NEVER commit this to git!)
XPAY_PUBLIC_KEY=pk_sandbox_your_public_key
XPAY_SECRET_KEY=sk_sandbox_your_secret_key
```

Add `.env` to your `.gitignore`:

```plaintext
# .gitignore
.env
.env.local
```

## Rate Limits

API keys are subject to rate limits:

| Plan              | Requests per Minute |
| ----------------- | ------------------- |
| Sandbox           | 100                 |
| Live (Standard)   | 500                 |
| Live (Enterprise) | Custom              |

See [Rate Limits](/api/rate-limits) for more details.
