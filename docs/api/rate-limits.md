---
sidebar_position: 3
---

# Rate Limits

X-Pay implements rate limiting to ensure fair usage and protect the platform from abuse.

## Rate Limit Tiers

| Environment | Plan       | Requests/Minute | Requests/Hour |
| ----------- | ---------- | --------------- | ------------- |
| Sandbox     | All        | 100             | 1,000         |
| Live        | Starter    | 300             | 5,000         |
| Live        | Growth     | 1,000           | 20,000        |
| Live        | Enterprise | Custom          | Custom        |

## Rate Limit Headers

Every response includes rate limit information:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1704067260
```

| Header                  | Description                          |
| ----------------------- | ------------------------------------ |
| `X-RateLimit-Limit`     | Maximum requests per window          |
| `X-RateLimit-Remaining` | Requests remaining in current window |
| `X-RateLimit-Reset`     | Unix timestamp when limit resets     |

## Rate Limit Response

When rate limited, you'll receive:

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 30
```

```json
{
  "success": false,
  "error": {
    "code": "rate_limited",
    "message": "Too many requests. Please wait 30 seconds."
  }
}
```

## Handling Rate Limits

### Check Headers Proactively

```javascript
async function makeRequest(url, options) {
  const response = await fetch(url, options);

  const remaining = parseInt(response.headers.get("X-RateLimit-Remaining"));
  const reset = parseInt(response.headers.get("X-RateLimit-Reset"));

  if (remaining < 10) {
    console.warn(`Rate limit running low: ${remaining} remaining`);
  }

  return response;
}
```

### Implement Exponential Backoff

```javascript
async function requestWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url, options);

    if (response.status === 429) {
      const retryAfter = parseInt(response.headers.get("Retry-After") || "60");
      console.log(`Rate limited. Retrying in ${retryAfter}s...`);
      await sleep(retryAfter * 1000);
      continue;
    }

    return response;
  }

  throw new Error("Max retries exceeded");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

## Endpoint-Specific Limits

Some endpoints have stricter limits:

| Endpoint                   | Limit     |
| -------------------------- | --------- |
| `POST /auth/login`         | 10/minute |
| `POST /auth/register`      | 5/minute  |
| `POST /payments`           | 30/minute |
| `POST /webhooks/{id}/test` | 5/minute  |

## Best Practices

1. **Cache responses** - Reduce unnecessary API calls
2. **Use webhooks** - Instead of polling for status
3. **Batch requests** - Where possible
4. **Monitor usage** - Track your rate limit consumption
5. **Implement backoff** - Don't hammer the API when limited

## Increasing Limits

Need higher limits? Contact us:

- **Email**: support@xpay-bits.com
- **Dashboard**: Submit a limit increase request

Provide:

- Your use case
- Expected request volume
- Current plan
