---
sidebar_position: 4
---

# Error Handling

This guide covers how to handle errors when integrating with X-Pay APIs.

## Error Response Format

All API errors follow this structure:

```json
{
  "success": false,
  "error": {
    "code": "invalid_request",
    "message": "The phone number format is invalid",
    "field": "phone_number",
    "details": null
  }
}
```

| Field     | Description                                     |
| --------- | ----------------------------------------------- |
| `code`    | Machine-readable error code                     |
| `message` | Human-readable description                      |
| `field`   | The field that caused the error (if applicable) |
| `details` | Additional error information                    |

## HTTP Status Codes

| Code  | Meaning             | Action                   |
| ----- | ------------------- | ------------------------ |
| `200` | Success             | Process response         |
| `400` | Bad Request         | Check request parameters |
| `401` | Unauthorized        | Check API key            |
| `403` | Forbidden           | Check permissions        |
| `404` | Not Found           | Check resource ID        |
| `422` | Validation Error    | Fix input data           |
| `429` | Rate Limited        | Slow down requests       |
| `500` | Server Error        | Retry with backoff       |
| `503` | Service Unavailable | Retry later              |

## Common Error Codes

### Authentication Errors

| Code              | Message                 | Solution           |
| ----------------- | ----------------------- | ------------------ |
| `invalid_api_key` | API key is invalid      | Check your API key |
| `expired_token`   | Token has expired       | Get a new token    |
| `missing_auth`    | No authorization header | Add Bearer token   |

### Validation Errors

| Code                     | Message                 | Solution                    |
| ------------------------ | ----------------------- | --------------------------- |
| `invalid_amount`         | Amount must be positive | Use positive integer        |
| `invalid_currency`       | Currency not supported  | Use supported currency      |
| `invalid_phone_number`   | Phone format invalid    | Use +250XXXXXXXXX format    |
| `missing_required_field` | Field X is required     | Include all required fields |

### Payment Errors

| Code                   | Message               | Solution                 |
| ---------------------- | --------------------- | ------------------------ |
| `insufficient_balance` | Wallet has no funds   | Customer needs to top up |
| `payment_declined`     | Payment was declined  | Try different method     |
| `provider_error`       | Provider unavailable  | Retry later              |
| `duplicate_payment`    | Duplicate transaction | Check if already paid    |

## Handling Errors in Code

### JavaScript/TypeScript

```javascript
async function createPayment(data) {
  try {
    const response = await fetch("https://server.xpay-bits.com/v1/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      // Handle API error
      throw new XPayError(
        result.error?.message || "Unknown error",
        result.error?.code,
        response.status
      );
    }

    return result.data;
  } catch (error) {
    if (error instanceof XPayError) {
      // Known API error
      handleApiError(error);
    } else {
      // Network or unexpected error
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}

class XPayError extends Error {
  constructor(message, code, status) {
    super(message);
    this.code = code;
    this.status = status;
    this.name = "XPayError";
  }
}

function handleApiError(error) {
  switch (error.code) {
    case "invalid_phone_number":
      // Show user-friendly message
      showError("Please enter a valid phone number");
      break;
    case "insufficient_balance":
      showError("Insufficient funds. Please top up.");
      break;
    case "rate_limited":
      // Retry after delay
      setTimeout(() => retryPayment(), 5000);
      break;
    default:
      showError("An error occurred. Please try again.");
  }
}
```

### Python

```python
import requests
from typing import Optional

class XPayError(Exception):
    def __init__(self, message: str, code: Optional[str] = None, status: int = 500):
        self.message = message
        self.code = code
        self.status = status
        super().__init__(message)

def create_payment(data: dict) -> dict:
    try:
        response = requests.post(
            'https://server.xpay-bits.com/v1/payments',
            headers={
                'Authorization': f'Bearer {API_KEY}',
                'Content-Type': 'application/json'
            },
            json=data
        )

        result = response.json()

        if not response.ok:
            error = result.get('error', {})
            raise XPayError(
                error.get('message', 'Unknown error'),
                error.get('code'),
                response.status_code
            )

        return result['data']

    except requests.RequestException as e:
        raise XPayError(f'Network error: {str(e)}')

# Usage
try:
    payment = create_payment({
        'amount': 5000,
        'currency': 'RWF',
        'phone_number': '+250788123456'
    })
except XPayError as e:
    if e.code == 'invalid_phone_number':
        print('Please enter a valid phone number')
    elif e.code == 'insufficient_balance':
        print('Insufficient funds')
    else:
        print(f'Error: {e.message}')
```

## Retry Strategy

For transient errors (5xx, network issues), implement exponential backoff:

```javascript
async function withRetry(fn, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (!isRetryable(error) || attempt === maxRetries - 1) {
        throw error;
      }

      const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

function isRetryable(error) {
  return error.status >= 500 || error.code === "rate_limited";
}

// Usage
const payment = await withRetry(() => createPayment(data));
```

## User-Friendly Messages

Map error codes to user-friendly messages:

```javascript
const ERROR_MESSAGES = {
  invalid_phone_number:
    "Please enter a valid phone number (e.g., +250788123456)",
  invalid_amount: "Please enter a valid amount",
  insufficient_balance: "You don't have enough funds. Please top up first.",
  payment_declined: "Your payment was declined. Please try a different method.",
  provider_error:
    "The payment service is temporarily unavailable. Please try again.",
  rate_limited: "Too many requests. Please wait a moment.",
  default: "Something went wrong. Please try again later.",
};

function getErrorMessage(code) {
  return ERROR_MESSAGES[code] || ERROR_MESSAGES.default;
}
```

## Logging Errors

Log errors for debugging, but never log sensitive data:

```javascript
function logError(error, context = {}) {
  console.error({
    timestamp: new Date().toISOString(),
    error_code: error.code,
    error_message: error.message,
    status: error.status,
    // Include context, but redact sensitive fields
    context: {
      ...context,
      phone_number: context.phone_number ? "***" : undefined,
      api_key: undefined,
    },
  });
}
```
