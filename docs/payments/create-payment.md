---
sidebar_position: 2
---

# Create a Payment

This guide walks you through creating payments with X-Pay.

## Basic Payment

### Endpoint

```
POST /v1/payments
```

### Request

```bash
curl -X POST https://server.xpay-bits.com/v1/payments \
  -H "Authorization: Bearer sk_sandbox_your_secret_key" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000,
    "currency": "RWF",
    "payment_method": "mobile_money",
    "phone_number": "+250788123456",
    "description": "Premium subscription"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "pay_abc123xyz",
    "amount": 5000,
    "currency": "RWF",
    "status": "pending",
    "payment_method": "mobile_money",
    "description": "Premium subscription",
    "external_transaction_id": "momo_tx_12345",
    "created_at": "2025-01-01T10:00:00Z"
  }
}
```

## Request Parameters

| Parameter        | Type    | Required   | Description                                    |
| ---------------- | ------- | ---------- | ---------------------------------------------- |
| `amount`         | integer | ✅         | Amount in smallest currency unit (e.g., cents) |
| `currency`       | string  | ✅         | ISO 4217 currency code (RWF, USD, etc.)        |
| `payment_method` | string  | ✅         | Payment method (mobile_money, card, bank)      |
| `phone_number`   | string  | For mobile | Customer's phone number                        |
| `description`    | string  | No         | Payment description                            |
| `customer_email` | string  | No         | Customer's email for receipts                  |
| `metadata`       | object  | No         | Custom key-value pairs                         |
| `callback_url`   | string  | No         | URL for payment completion redirect            |
| `webhook_url`    | string  | No         | Override default webhook URL                   |

## With Metadata

Attach custom data to payments for your records:

```bash
curl -X POST https://server.xpay-bits.com/v1/payments \
  -H "Authorization: Bearer sk_sandbox_your_secret_key" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 15000,
    "currency": "RWF",
    "payment_method": "mobile_money",
    "phone_number": "+250788123456",
    "description": "Order #12345",
    "metadata": {
      "order_id": "12345",
      "customer_id": "cust_789",
      "product_name": "Premium Plan",
      "plan_duration": "monthly"
    }
  }'
```

## JavaScript Example

```javascript
const createPayment = async () => {
  const response = await fetch("https://server.xpay-bits.com/v1/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.XPAY_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: 5000,
      currency: "RWF",
      payment_method: "mobile_money",
      phone_number: "+250788123456",
      description: "Test payment",
    }),
  });

  const data = await response.json();
  console.log("Payment created:", data);
  return data;
};
```

## Python Example

```python
import requests

url = "https://server.xpay-bits.com/v1/payments"
headers = {
    "Authorization": f"Bearer {XPAY_SECRET_KEY}",
    "Content-Type": "application/json"
}
payload = {
    "amount": 5000,
    "currency": "RWF",
    "payment_method": "mobile_money",
    "phone_number": "+250788123456",
    "description": "Test payment"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())
```

## Error Handling

```json
{
  "success": false,
  "error": {
    "code": "invalid_phone_number",
    "message": "The phone number format is invalid"
  }
}
```

Common errors:

| Code                   | Description                   |
| ---------------------- | ----------------------------- |
| `invalid_amount`       | Amount must be positive       |
| `invalid_currency`     | Currency not supported        |
| `invalid_phone_number` | Phone number format is wrong  |
| `insufficient_balance` | Wallet has insufficient funds |

## Next Steps

- [Handle Webhooks](/guides/webhooks) - Get notified when payment completes
- [Payment Methods](/payments/payment-methods) - All supported methods
