---
sidebar_position: 1
---

# Stripe Card Payments

Accept Visa, Mastercard, and international cards through X-Pay's Stripe integration. X-Pay acts as a payment aggregator - merchants process payments through X-Pay's Stripe account.

## How It Works

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │ ──▶  │   Backend   │ ──▶  │   X-Pay     │ ──▶ Stripe
│  (Stripe.js)│      │  (Your API) │      │    API      │
└─────────────┘      └─────────────┘      └─────────────┘
      │                                         │
      │              ┌─────────────────────────┘
      │              │ Returns client_secret
      ▼              ▼
   Confirms payment with Stripe.js
```

## Integration Steps

### Step 1: Create Payment Intent (Backend)

```javascript
import XPay from "@xpay/javascript-sdk";

const xpay = new XPay({
  apiKey: process.env.XPAY_SECRET_KEY,
  merchantId: process.env.XPAY_MERCHANT_ID,
  environment: "sandbox",
});

// Create payment intent
app.post("/api/create-payment", async (req, res) => {
  const { amount, currency } = req.body;

  const payment = await xpay.payments.create({
    amount: amount.toString(),
    currency: currency || "USD",
    payment_method: "stripe",
    description: `Order from ${req.user.email}`,
    payment_method_data: {
      payment_method_types: ["card"],
    },
    metadata: {
      order_id: req.body.orderId,
      customer_email: req.user.email,
    },
  });

  // Return client_secret to frontend
  res.json({
    clientSecret: payment.data.client_secret,
    paymentId: payment.data.id,
  });
});
```

### Step 2: Get Stripe Publishable Key (Backend)

```javascript
// Get X-Pay's Stripe configuration
app.get("/api/stripe-config", async (req, res) => {
  const paymentMethods = await xpay.payments.getPaymentMethods();

  res.json({
    publishableKey: paymentMethods.data.stripe_config?.publishable_key,
  });
});
```

### Step 3: Confirm Payment (Frontend)

#### React Implementation

```jsx
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";

// Initialize Stripe with X-Pay's publishable key
const stripePromise = loadStripe("pk_live_xpay_publishable_key");

function CheckoutForm({ orderId, amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Step 1: Create payment intent on your server
    const response = await fetch("/api/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, orderId }),
    });

    const { clientSecret } = await response.json();

    // Step 2: Confirm payment with Stripe.js
    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Customer Name",
          },
        },
      });

    if (stripeError) {
      setError(stripeError.message);
    } else if (paymentIntent.status === "succeeded") {
      // Payment successful! Redirect to success page
      window.location.href = "/order-success";
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
          },
        }}
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
}

// Wrap with Stripe Elements provider
function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm orderId="order_123" amount="29.99" />
    </Elements>
  );
}
```

#### Vanilla JavaScript Implementation

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://js.stripe.com/v3/"></script>
  </head>
  <body>
    <form id="payment-form">
      <div id="card-element"></div>
      <button id="submit">Pay $29.99</button>
      <div id="error-message"></div>
    </form>

    <script>
      // Initialize Stripe
      const stripe = Stripe("pk_live_xpay_publishable_key");
      const elements = stripe.elements();
      const cardElement = elements.create("card");
      cardElement.mount("#card-element");

      // Handle form submission
      document
        .getElementById("payment-form")
        .addEventListener("submit", async (e) => {
          e.preventDefault();

          // Create payment intent on your server
          const response = await fetch("/api/create-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: "29.99" }),
          });
          const { clientSecret } = await response.json();

          // Confirm payment
          const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: { card: cardElement },
            }
          );

          if (error) {
            document.getElementById("error-message").textContent =
              error.message;
          } else if (paymentIntent.status === "succeeded") {
            window.location.href = "/success";
          }
        });
    </script>
  </body>
</html>
```

### Step 4: Handle Webhooks

```javascript
app.post(
  "/webhooks/xpay",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const event = JSON.parse(req.body);

    switch (event.type) {
      case "payment.succeeded":
        const payment = event.data;
        console.log("✅ Payment succeeded:", payment.id);
        // Fulfill the order
        fulfillOrder(payment.metadata.order_id);
        break;

      case "payment.failed":
        console.log("❌ Payment failed:", event.data.id);
        // Handle failure
        break;
    }

    res.status(200).send("OK");
  }
);
```

## Complete Express.js Example

```javascript
import express from "express";
import XPay from "@xpay/javascript-sdk";

const app = express();
app.use(express.json());

const xpay = new XPay({
  apiKey: process.env.XPAY_SECRET_KEY,
  merchantId: process.env.XPAY_MERCHANT_ID,
  environment: "sandbox",
});

// Get Stripe config for frontend
app.get("/api/stripe-config", async (req, res) => {
  const methods = await xpay.payments.getPaymentMethods();
  res.json({ publishableKey: methods.data.stripe_config?.publishable_key });
});

// Create payment intent
app.post("/api/create-payment", async (req, res) => {
  try {
    const payment = await xpay.payments.create({
      amount: req.body.amount,
      currency: "USD",
      payment_method: "stripe",
      payment_method_data: { payment_method_types: ["card"] },
      metadata: { order_id: req.body.orderId },
    });

    res.json({ clientSecret: payment.data.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Webhook handler
app.post("/webhooks/xpay", (req, res) => {
  const event = req.body;
  if (event.type === "payment.succeeded") {
    console.log("Payment completed:", event.data.id);
  }
  res.sendStatus(200);
});

app.listen(3000);
```

## Test Cards

| Card Number        | Scenario           |
| ------------------ | ------------------ |
| `4242424242424242` | Successful payment |
| `4000000000000002` | Card declined      |
| `4000000000009995` | Insufficient funds |
| `4000000000000069` | Expired card       |

Use any future expiry date and any 3-digit CVC.

## Next Steps

- [Mobile Money Payments](/payments/mobile-money) - Accept MoMo payments
- [Webhooks](/guides/webhooks) - Handle payment notifications
- [Error Handling](/guides/error-handling) - Handle edge cases
