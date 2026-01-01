---
sidebar_position: 2
---

# Mobile Money Payments

Accept payments via MTN Mobile Money, Airtel Money, and other African mobile money providers through X-Pay's unified API.

## Supported Providers

| Provider         | Countries             | Currencies    | Code                                 |
| ---------------- | --------------------- | ------------- | ------------------------------------ |
| **MTN MoMo**     | Ghana, Rwanda, Uganda | GHS, RWF, UGX | `momo`, `momo_rwanda`, `momo_uganda` |
| **Orange Money** | Liberia               | LRD, USD      | `orange`, `momo_liberia`             |
| **Airtel Money** | East Africa           | Multiple      | `airtel`                             |

## How Mobile Money Works

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Customer  │      │   X-Pay     │      │  MoMo/Orange │
│   (App)     │      │    API      │      │   Provider   │
└─────────────┘      └─────────────┘      └─────────────┘
      │                    │                    │
   1. Enter phone          │                    │
      number               │                    │
      ─────────────────────▶                    │
      │              2. Create Payment          │
      │                    ─────────────────────▶
      │                    │                    │
      │              3. USSD Push sent to       │
      │                 customer's phone        │
      │  ◀──────────────────────────────────────│
      │                    │                    │
   4. Customer enters      │                    │
      PIN on phone         │                    │
      ─────────────────────────────────────────▶
      │                    │                    │
      │              5. Payment confirmed       │
      │              ◀──────────────────────────│
      │                    │                    │
   6. Webhook notification │                    │
      ◀────────────────────│                    │
```

## Basic Integration

### Create Mobile Money Payment

```javascript
import XPay from "@xpay/javascript-sdk";

const xpay = new XPay({
  apiKey: process.env.XPAY_SECRET_KEY,
  merchantId: process.env.XPAY_MERCHANT_ID,
  environment: "sandbox",
});

// Ghana MTN Mobile Money
const payment = await xpay.payments.create({
  amount: "50.00",
  currency: "GHS",
  payment_method: "momo",
  description: "Order #12345",
  payment_method_data: {
    phone_number: "+233201234567", // Ghana format
  },
  metadata: {
    order_id: "12345",
    customer_id: "cust_abc",
  },
});

console.log("Payment ID:", payment.data.id);
console.log("Status:", payment.data.status); // 'pending'
console.log("Reference:", payment.data.reference_id); // MoMo reference
console.log("Instructions:", payment.data.instructions);
```

### Poll for Payment Completion

Mobile Money payments are asynchronous - the customer must confirm on their phone:

```javascript
// Create payment
const payment = await xpay.payments.create({
  amount: "50.00",
  currency: "GHS",
  payment_method: "momo",
  payment_method_data: { phone_number: "+233201234567" },
});

// Poll until customer confirms or times out
try {
  const finalPayment = await xpay.payments.pollPaymentStatus(payment.data.id, {
    maxAttempts: 30, // Check up to 30 times
    intervalMs: 2000, // Every 2 seconds = 60 seconds max
    finalStatuses: ["succeeded", "completed", "failed", "cancelled"],
  });

  if (
    finalPayment.status === "succeeded" ||
    finalPayment.status === "completed"
  ) {
    console.log("✅ Payment successful!");
    console.log("Reference ID:", finalPayment.reference_id);
    // Activate subscription, unlock content, etc.
  } else {
    console.log("❌ Payment failed:", finalPayment.status);
    // Show retry option to customer
  }
} catch (error) {
  console.error("Payment polling timeout:", error);
  // Handle timeout - customer may not have responded
}
```

### Alternative: Webhook-Based Flow

For production, use webhooks instead of polling:

```javascript
// Step 1: Create payment and return immediately
app.post('/api/pay-mobile-money', async (req, res) => {
  const payment = await xpay.payments.create({
    amount: req.body.amount,
    currency: 'GHS',
    payment_method: 'momo',
    payment_method_data: { phone_number: req.body.phone },
    metadata: { order_id: req.body.orderId }
  });

  // Store payment ID with order
  await db.orders.update(req.body.orderId, {
    payment_id: payment.data.id,
    status: 'pending_payment'
  });

  res.json({
    status: 'pending',
    message: 'Check your phone for payment prompt',
    paymentId: payment.data.id,
    reference: payment.data.reference_id
  });
});

// Step 2: Handle webhook when payment completes
app.post('/webhooks/xpay', (req, res) => {
  const event = req.body;

  if (event.type === 'payment.succeeded') {
    const payment = event.data;
    const orderId = payment.metadata.order_id;

    // Fulfill the order
    await db.orders.update(orderId, { status: 'paid' });

    // Send confirmation SMS/email to customer
    await sendConfirmation(payment.metadata.customer_phone);
  }

  res.sendStatus(200);
});
```

## Country-Specific Examples

### Rwanda (MTN Mobile Money)

```javascript
const payment = await xpay.payments.create({
  amount: "5000", // 5,000 RWF
  currency: "RWF",
  payment_method: "momo_rwanda",
  payment_method_data: {
    phone_number: "+250788123456", // Rwanda format: +250 7XX XXX XXX
  },
});
```

### Uganda (MTN Mobile Money)

```javascript
const payment = await xpay.payments.create({
  amount: "10000", // 10,000 UGX
  currency: "UGX",
  payment_method: "momo_uganda",
  payment_method_data: {
    phone_number: "+256771234567", // Uganda format: +256 7XX XXX XXX
  },
});
```

### Liberia (Orange Money)

```javascript
const payment = await xpay.payments.create({
  amount: "25.00", // $25 USD or LRD
  currency: "USD", // or 'LRD'
  payment_method: "orange",
  payment_method_data: {
    phone_number: "+231779880047", // Liberia format: +231 XXX XXX XXX
  },
});
```

## Phone Number Formats

| Country | Format            | Example          |
| ------- | ----------------- | ---------------- |
| Ghana   | +233 XX XXX XXXX  | `+233201234567`  |
| Rwanda  | +250 7XX XXX XXX  | `+250788123456`  |
| Uganda  | +256 7XX XXX XXX  | `+256771234567`  |
| Liberia | +231 XXX XXX XXX  | `+231779880047`  |
| Nigeria | +234 XXX XXX XXXX | `+2348012345678` |

:::tip Phone Number Validation
Always validate phone numbers on your frontend before sending to the API. Use a library like `libphonenumber-js` to validate and format.
:::

## Complete Express.js Example

```javascript
import express from "express";
import XPay from "@xpay/javascript-sdk";

const app = express();
app.use(express.json());

const xpay = new XPay({
  apiKey: process.env.XPAY_SECRET_KEY,
  merchantId: process.env.XPAY_MERCHANT_ID,
});

// Create mobile money payment
app.post("/api/mobile-payment", async (req, res) => {
  try {
    const { amount, phone, country } = req.body;

    // Determine payment method and currency based on country
    const config = {
      ghana: { method: "momo", currency: "GHS" },
      rwanda: { method: "momo_rwanda", currency: "RWF" },
      uganda: { method: "momo_uganda", currency: "UGX" },
      liberia: { method: "orange", currency: "USD" },
    }[country];

    const payment = await xpay.payments.create({
      amount: amount.toString(),
      currency: config.currency,
      payment_method: config.method,
      payment_method_data: { phone_number: phone },
      webhook_url: "https://your-app.com/webhooks/xpay",
    });

    res.json({
      success: true,
      paymentId: payment.data.id,
      status: payment.data.status,
      reference: payment.data.reference_id,
      message: "Check your phone for the payment prompt",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Check payment status
app.get("/api/payment/:id/status", async (req, res) => {
  const payment = await xpay.payments.retrieve(req.params.id);
  res.json({
    status: payment.data.status,
    reference: payment.data.reference_id,
  });
});

// Webhook handler
app.post("/webhooks/xpay", (req, res) => {
  const event = req.body;

  switch (event.type) {
    case "payment.succeeded":
      console.log("✅ MoMo payment succeeded:", event.data.id);
      break;
    case "payment.failed":
      console.log("❌ MoMo payment failed:", event.data.id);
      break;
  }

  res.sendStatus(200);
});

app.listen(3000);
```

## Test Phone Numbers (Sandbox)

| Number          | Result                           |
| --------------- | -------------------------------- |
| `+233200000001` | ✅ Instant success               |
| `+233200000002` | ❌ Declined (insufficient funds) |
| `+233200000003` | ⏳ Timeout (no response)         |

## Error Handling

```javascript
try {
  const payment = await xpay.payments.create({...});
} catch (error) {
  if (error instanceof XPayError) {
    switch (error.code) {
      case 'INVALID_PHONE_NUMBER':
        // Show: "Please enter a valid phone number"
        break;
      case 'UNSUPPORTED_CARRIER':
        // Show: "This phone carrier is not supported"
        break;
      case 'PROVIDER_ERROR':
        // Show: "Mobile money service is temporarily unavailable"
        break;
      default:
        // Show: "Payment failed. Please try again."
    }
  }
}
```

## Next Steps

- [Stripe Payments](/payments/stripe) - Accept card payments
- [Webhooks](/guides/webhooks) - Handle payment notifications
- [Go Live](/guides/go-live) - Move to production
