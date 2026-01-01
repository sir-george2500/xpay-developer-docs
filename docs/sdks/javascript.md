---
sidebar_position: 1
---

# JavaScript/TypeScript SDK

The official JavaScript/TypeScript SDK for X-Pay payment processing. Works in Node.js and modern browsers.

## Installation

```bash
npm install @xpay/javascript-sdk
# or
yarn add @xpay/javascript-sdk
```

## Quick Start

```javascript
import XPay from "@xpay/javascript-sdk";

// Initialize the SDK
const xpay = new XPay({
  apiKey: "sk_sandbox_your_api_key",
  merchantId: "your_merchant_id",
  environment: "sandbox",
  baseUrl: "https://server.xpay-bits.com", // Optional: defaults to production
});

// Create a payment
const payment = await xpay.payments.create({
  amount: "25.99",
  currency: "USD",
  payment_method: "stripe",
  description: "Order #12345",
});

console.log("Payment ID:", payment.data.id);
console.log("Status:", payment.data.status);
```

## Configuration Options

```javascript
const xpay = new XPay({
  apiKey: "sk_sandbox_xxx", // Required: Your X-Pay API key
  merchantId: "merchant_123", // Required: Your merchant ID
  environment: "sandbox", // Optional: 'sandbox' or 'live'
  baseUrl: "http://localhost:8000", // Optional: Custom API URL
  timeout: 30000, // Optional: Request timeout in ms
});
```

## Payments API

### Create Payment

```javascript
const payment = await xpay.payments.create({
  amount: "29.99", // Required: Amount as string
  currency: "USD", // Required: Currency code
  payment_method: "stripe", // Required: Payment method
  description: "Order #12345", // Optional
  customer_id: "cust_123", // Optional
  payment_method_data: {
    // Optional: Method-specific data
    // For Stripe
    payment_method_types: ["card"],

    // For Mobile Money
    phone_number: "+233123456789",

    // For X-Pay Wallet
    wallet_id: "wallet_123",
    pin: "1234",
  },
  metadata: {
    // Optional: Custom data
    order_id: "12345",
    user_id: "user_456",
  },
  success_url: "https://your-site.com/success",
  cancel_url: "https://your-site.com/cancel",
  webhook_url: "https://your-site.com/webhook",
});
```

### Supported Payment Methods

| Method                 | Code                     | Currencies          |
| ---------------------- | ------------------------ | ------------------- |
| Stripe (Cards)         | `stripe`                 | USD, EUR, GBP, etc. |
| Mobile Money (Ghana)   | `momo`                   | GHS                 |
| Mobile Money (Liberia) | `momo_liberia`           | LRD, USD            |
| Mobile Money (Nigeria) | `momo_nigeria`           | NGN                 |
| Mobile Money (Uganda)  | `momo_uganda`            | UGX                 |
| Mobile Money (Rwanda)  | `momo_rwanda`            | RWF                 |
| Orange Money           | `orange`                 | LRD, USD            |
| X-Pay Wallet           | `wallet` / `xpay_wallet` | All                 |

### Retrieve Payment

```javascript
const payment = await xpay.payments.retrieve("pay_123456789");
console.log(payment.data.status);
```

### List Payments

```javascript
const payments = await xpay.payments.list({
  limit: 10,
  offset: 0,
  status: "succeeded",
  customer_id: "cust_123",
  created_after: "2024-01-01",
  created_before: "2024-12-31",
});
```

### Poll Payment Status (for async methods)

```javascript
// For Mobile Money / Orange Money payments that require user confirmation
const finalPayment = await xpay.payments.pollPaymentStatus(payment.data.id, {
  maxAttempts: 30, // Poll up to 30 times
  intervalMs: 2000, // Wait 2 seconds between attempts
  finalStatuses: ["succeeded", "completed", "failed", "cancelled"],
});

if (finalPayment.status === "succeeded") {
  console.log("✅ Payment successful!");
}
```

## Customer Management

### Create Customer

```javascript
const customer = await xpay.customers.create({
  email: "customer@example.com",
  name: "John Doe",
  phone: "+1234567890",
  description: "Premium customer",
  metadata: {
    tier: "premium",
    signup_source: "website",
  },
});

console.log("Customer ID:", customer.data.id);
```

### Update Customer

```javascript
const updated = await xpay.customers.update("cust_123", {
  name: "Jane Doe",
  description: "Updated info",
});
```

### List Customers

```javascript
const customers = await xpay.customers.list({
  limit: 50,
  email: "john@example.com",
});
```

## Webhooks

### Create Webhook

```javascript
const webhook = await xpay.webhooks.create({
  url: "https://your-app.com/webhooks/xpay",
  events: ["payment.succeeded", "payment.failed", "customer.created"],
  description: "Main webhook endpoint",
});
```

### Verify Webhook Signature

```javascript
import { WebhooksAPI } from "@xpay/javascript-sdk";

const isValid = await WebhooksAPI.verifySignature(
  webhookPayload, // Raw webhook body as string
  webhookSignature, // X-Webhook-Signature header
  webhookSecret // Your webhook secret
);

if (isValid) {
  const event = JSON.parse(webhookPayload);
  switch (event.type) {
    case "payment.succeeded":
      // Handle successful payment
      break;
    case "payment.failed":
      // Handle failed payment
      break;
  }
}
```

### Webhook Events

| Event               | Description                    |
| ------------------- | ------------------------------ |
| `payment.created`   | Payment was initiated          |
| `payment.succeeded` | Payment completed successfully |
| `payment.failed`    | Payment failed                 |
| `payment.cancelled` | Payment was cancelled          |
| `payment.refunded`  | Payment was refunded           |
| `customer.created`  | Customer was created           |
| `customer.updated`  | Customer was modified          |

## Error Handling

```javascript
import { XPayError } from "@xpay/javascript-sdk";

try {
  const payment = await xpay.payments.create(paymentData);
} catch (error) {
  if (error instanceof XPayError) {
    console.error("X-Pay API Error:");
    console.error("- Message:", error.message);
    console.error("- Code:", error.code);
    console.error("- Status:", error.status);
    console.error("- Details:", error.details);
  } else {
    console.error("Network Error:", error.message);
  }
}
```

### Error Codes

| Code                     | Description                |
| ------------------------ | -------------------------- |
| `AUTHENTICATION_ERROR`   | Invalid API key            |
| `INVALID_PAYMENT_METHOD` | Unsupported payment method |
| `INVALID_CURRENCY`       | Currency not supported     |
| `VALIDATION_ERROR`       | Invalid request parameters |
| `NETWORK_ERROR`          | Connectivity issues        |
| `TIMEOUT`                | Request timeout            |

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import XPay, { PaymentRequest, Payment, XPayError } from "@xpay/javascript-sdk";

const xpay = new XPay({
  apiKey: process.env.XPAY_API_KEY!,
  merchantId: process.env.XPAY_MERCHANT_ID!,
  environment: "sandbox",
});

const paymentRequest: PaymentRequest = {
  amount: "29.99",
  currency: "USD",
  payment_method: "stripe",
  description: "TypeScript payment",
};

try {
  const response = await xpay.payments.create(paymentRequest);
  const payment: Payment = response.data;
  console.log(`Payment ${payment.id} created with status ${payment.status}`);
} catch (error: unknown) {
  if (error instanceof XPayError) {
    console.error(`API Error [${error.code}]: ${error.message}`);
  }
}
```

## Testing

```bash
# Install dependencies
npm install

# Build the SDK
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Next Steps

- [Stripe Integration](/payments/stripe) - Accept card payments
- [Mobile Money](/payments/mobile-money) - MTN, Airtel, Orange integration
- [Webhooks Guide](/guides/webhooks) - Handle payment notifications
