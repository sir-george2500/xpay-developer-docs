---
sidebar_position: 3
---

# Your First Payment

This guide walks you through creating your first payment using the X-Pay API.

## Prerequisites

Before you begin, make sure you have:

- [x] A developer account ([Create one](/docs/getting-started/registration))
- [x] Your API keys ([Get them](/docs/getting-started/api-keys))
- [x] Your Merchant ID (found with your API keys)

## Create a Payment

### Step 1: Make the API Request

```bash
curl -X POST https://server.xpay-bits.com/v1/api/merchants/{merchant_id}/payments \
  -H "X-API-Key: sk_sandbox_your_key" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": "10.00",
    "currency": "USD",
    "payment_method": "stripe",
    "description": "Test payment from docs",
    "payment_method_data": {
      "payment_method_types": ["card"]
    }
  }'
```

Replace `{merchant_id}` with your actual Merchant ID.

### Step 2: Handle the Response

**Success Response (200 OK):**

```json
{
  "id": "pay_abc123def456",
  "status": "pending",
  "amount": "10.00",
  "currency": "USD",
  "payment_method": "stripe",
  "client_secret": "pi_abc123_secret_xyz789",
  "created_at": "2024-01-01T12:00:00Z",
  "metadata": {
    "fee_amount": "0.50",
    "fee_percentage": "5.00"
  }
}
```

### Step 3: Complete the Payment (Frontend)

For Stripe payments, use the `client_secret` to complete payment on your frontend:

```javascript
// Using Stripe.js
const stripe = Stripe("pk_test_your_publishable_key");

const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  payment_method: {
    card: cardElement,
  },
});

if (error) {
  console.error("Payment failed:", error.message);
} else if (paymentIntent.status === "succeeded") {
  console.log("Payment successful!");
}
```

## Payment Methods

### Card Payments (Stripe)

```json
{
  "payment_method": "stripe",
  "payment_method_data": {
    "payment_method_types": ["card"]
  }
}
```

### Mobile Money (MoMo)

```json
{
  "payment_method": "momo",
  "payment_method_data": {
    "phone_number": "+233501234567"
  }
}
```

### Orange Money

```json
{
  "payment_method": "orange",
  "payment_method_data": {
    "phone_number": "+231779880047"
  }
}
```

## Test Cards (Sandbox)

| Card Number        | Result                |
| ------------------ | --------------------- |
| `4242424242424242` | ✅ Success            |
| `4000000000000002` | ❌ Declined           |
| `4000000000009995` | ❌ Insufficient funds |

Use any future expiry date and any 3-digit CVC.

## Test Phone Numbers (Sandbox)

| Number          | Result             |
| --------------- | ------------------ |
| `+233200000001` | ✅ Instant success |
| `+233200000002` | ❌ Declined        |
| `+233200000003` | ⏳ Timeout         |

## Check Payment Status

```bash
curl -X GET https://server.xpay-bits.com/v1/api/merchants/{merchant_id}/payments/{payment_id} \
  -H "X-API-Key: sk_sandbox_your_key"
```

## Error Handling

```json
{
  "error": "validation failed: amount is required"
}
```

Common errors:

- **400**: Invalid request (check your JSON)
- **401**: Invalid API key
- **403**: Merchant ID mismatch
- **500**: Server error (contact support)

## Next Steps

- [Set up webhooks](/docs/guides/webhooks) to get notified of payment events
- [Explore payment methods](/docs/payments/overview) to learn about all options
- [Go live](/docs/guides/go-live) when you're ready for production
