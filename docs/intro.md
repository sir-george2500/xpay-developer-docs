---
slug: /
sidebar_position: 1
---

# X-Pay Developer Documentation

Build payment experiences with X-Pay, the unified payment infrastructure for Africa and beyond. Accept payments from multiple providers including Stripe, Mobile Money, Orange Money, and X-Pay Wallets through a single API.

## Why X-Pay?

- **🌍 African-First** - Native support for Mobile Money, Orange Money, and local payment methods
- **💳 Global Reach** - Stripe integration for international card payments
- **⚡ Unified API** - One SDK for all payment methods
- **🔒 Enterprise Security** - PCI DSS compliant, end-to-end encryption
- **📊 Real-Time Insights** - Transaction analytics and reporting

## Choose Your SDK

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="js" label="JavaScript/TypeScript" default>

```bash
npm install @xpay/javascript-sdk
```

```javascript
import XPay from "@xpay/javascript-sdk";

const xpay = new XPay({
  apiKey: "sk_sandbox_your_api_key",
  merchantId: "your_merchant_id",
  environment: "sandbox",
});

// Create a payment
const payment = await xpay.payments.create({
  amount: "25.99",
  currency: "USD",
  payment_method: "stripe",
  description: "Order #12345",
});
```

  </TabItem>
  <TabItem value="python" label="Python">

```bash
pip install xpay-python
```

```python
from xpay import XPayClient, PaymentRequest

client = XPayClient(
    api_key="sk_sandbox_your_api_key",
    merchant_id="your_merchant_id",
    environment="sandbox"
)

# Create a payment
payment = client.payments.create(PaymentRequest(
    amount="25.99",
    currency="USD",
    payment_method="stripe",
    description="Order #12345"
))
```

  </TabItem>
  <TabItem value="go" label="Go">

```bash
go get github.com/xpay/xpay-go
```

```go
import "github.com/xpay/xpay-go"

client := xpay.NewClient(
    xpay.WithAPIKey("sk_sandbox_your_api_key"),
    xpay.WithMerchantID("your_merchant_id"),
    xpay.WithEnvironment(xpay.Sandbox),
)

payment, err := client.Payments.Create(&xpay.PaymentRequest{
    Amount:        "25.99",
    Currency:      "USD",
    PaymentMethod: "stripe",
    Description:   "Order #12345",
})
```

  </TabItem>
</Tabs>

## Quick Start Guide

### 1. Create a Developer Account

Register at [dashboard.xpay-bits.com](https://dashboard.xpay-bits.com/signup) to get your API keys and merchant ID.

### 2. Get Your Credentials

After registration, go to **Settings → API Keys** to find:

| Credential      | Format           | Purpose                          |
| --------------- | ---------------- | -------------------------------- |
| **API Key**     | `sk_sandbox_xxx` | Server-side authentication       |
| **Merchant ID** | `uuid`           | Identifies your merchant account |

### 3. Install the SDK

```bash
npm install @xpay/javascript-sdk
```

### 4. Make Your First Payment

```javascript
import XPay from "@xpay/javascript-sdk";

const xpay = new XPay({
  apiKey: process.env.XPAY_API_KEY,
  merchantId: process.env.XPAY_MERCHANT_ID,
  environment: "sandbox",
});

// Test connectivity
const ping = await xpay.ping();
console.log("Backend connected:", ping.success);

// Create payment
const payment = await xpay.payments.create({
  amount: "10.00",
  currency: "USD",
  payment_method: "stripe",
  payment_method_data: {
    payment_method_types: ["card"],
  },
});

console.log("Payment created:", payment.data.id);
console.log("Client secret:", payment.data.client_secret);
```

## Supported Payment Methods

| Method               | Regions               | Currencies          | Documentation                            |
| -------------------- | --------------------- | ------------------- | ---------------------------------------- |
| **Stripe**           | Global                | USD, EUR, GBP, etc. | [Stripe Guide →](/payments/stripe)       |
| **MTN Mobile Money** | Ghana, Rwanda, Uganda | GHS, RWF, UGX       | [MoMo Guide →](/payments/mobile-money)   |
| **Orange Money**     | Liberia               | LRD, USD            | [Orange Guide →](/payments/orange-money) |
| **Airtel Money**     | East Africa           | Multiple            | [Airtel Guide →](/payments/airtel)       |
| **X-Pay Wallet**     | All                   | All                 | [Wallet Guide →](/payments/wallet)       |

## What's Next?

<div className="row">
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>📱 Mobile Money</h3>
      </div>
      <div className="card__body">
        <p>Accept MTN MoMo, Orange Money, and Airtel Money payments across Africa.</p>
      </div>
      <div className="card__footer">
        <a href="/payments/mobile-money" className="button button--primary button--block">Get Started →</a>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>💳 Card Payments</h3>
      </div>
      <div className="card__body">
        <p>Process Visa, Mastercard, and international cards via Stripe integration.</p>
      </div>
      <div className="card__footer">
        <a href="/payments/stripe" className="button button--primary button--block">Get Started →</a>
      </div>
    </div>
  </div>
</div>

## Need Help?

- **API Reference**: [Interactive Swagger Docs](https://server.xpay-bits.com/swagger/index.html)
- **GitHub**: [github.com/sir-george2500/xpay-developer-platform](https://github.com/sir-george2500/xpay-developer-platform)
- **Email**: support@xpay-bits.com
