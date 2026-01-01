---
sidebar_position: 1
---

# Accept Payments Guide

This step-by-step guide shows you how to accept your first payment with X-Pay.

## Prerequisites

- ✅ X-Pay developer account ([Sign up](https://xpay-developer-platform.vercel.app/#features/signup))
- ✅ API keys from your dashboard
- ✅ A backend server to make API calls

## Step 1: Set Up Your Environment

Store your API keys securely:

```bash
# .env file
XPAY_SECRET_KEY=sk_sandbox_your_secret_key
XPAY_PUBLIC_KEY=pk_sandbox_your_public_key
```

## Step 2: Install SDK (Optional)

```bash
# Node.js
npm install @xpay/sdk

# Python
pip install xpay

# Or use the REST API directly
```

## Step 3: Create a Payment

### Using REST API

```javascript
// server.js
const express = require("express");
const app = express();

app.post("/create-payment", async (req, res) => {
  const { amount, phone_number } = req.body;

  const response = await fetch("https://server.xpay-bits.com/v1/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.XPAY_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amount,
      currency: "RWF",
      payment_method: "mobile_money",
      phone_number: phone_number,
      description: "Payment from my app",
    }),
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000);
```

## Step 4: Handle the Response

```json
{
  "success": true,
  "data": {
    "id": "pay_abc123",
    "status": "pending",
    "amount": 5000,
    "currency": "RWF"
  }
}
```

For Mobile Money payments:

- Status starts as `pending`
- Customer receives USSD prompt on their phone
- They enter PIN to confirm
- Status changes to `completed` or `failed`

## Step 5: Set Up Webhooks

Create an endpoint to receive payment notifications:

```javascript
app.post("/webhooks/xpay", (req, res) => {
  const event = req.body;

  switch (event.event) {
    case "payment.completed":
      // Fulfill the order
      console.log("Payment successful:", event.data.id);
      break;
    case "payment.failed":
      // Handle failure
      console.log("Payment failed:", event.data.id);
      break;
  }

  res.status(200).send("OK");
});
```

Register your webhook URL in the [Dashboard](https://xpay-developer-platform.vercel.app/#features/webhooks).

## Step 6: Test Your Integration

1. Use sandbox API keys
2. Test with sandbox phone numbers
3. Verify webhooks are received
4. Check payments in dashboard

### Test Phone Numbers

| Number          | Result  |
| --------------- | ------- |
| `+250788000001` | Success |
| `+250788000002` | Failure |

## Step 7: Go Live

When ready for production:

1. [Request Live Access](/guides/go-live)
2. Get approved (2-3 business days)
3. Switch to live API keys
4. Accept real payments!

## Complete Example

Here's a full Node.js example:

```javascript
const express = require("express");
const app = express();
app.use(express.json());

const XPAY_SECRET_KEY = process.env.XPAY_SECRET_KEY;
const API_BASE = "https://server.xpay-bits.com/v1";

// Create payment
app.post("/pay", async (req, res) => {
  try {
    const payment = await fetch(`${API_BASE}/payments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${XPAY_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: req.body.amount,
        currency: "RWF",
        payment_method: "mobile_money",
        phone_number: req.body.phone,
      }),
    }).then((r) => r.json());

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook handler
app.post("/webhooks", (req, res) => {
  const { event, data } = req.body;

  if (event === "payment.completed") {
    // TODO: Fulfill order, send receipt, etc.
    console.log(`Payment ${data.id} completed!`);
  }

  res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

## Next Steps

- [Configure Webhooks](/guides/webhooks) - Real-time notifications
- [Error Handling](/guides/error-handling) - Handle edge cases
- [Go Live](/guides/go-live) - Request production access
