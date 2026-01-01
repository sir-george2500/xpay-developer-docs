---
sidebar_position: 3
---

# Payment Methods

X-Pay supports multiple payment methods to serve customers across Africa and globally.

## Mobile Money

Mobile Money is the most popular payment method in East Africa.

### Supported Providers

| Provider         | Countries             | Setup                                         |
| ---------------- | --------------------- | --------------------------------------------- |
| **MTN MoMo**     | Rwanda, Uganda, Ghana | [MTN Guide](/payments/mobile-money#mtn)       |
| **Airtel Money** | Rwanda, Uganda, Kenya | [Airtel Guide](/payments/mobile-money#airtel) |

### Example

```bash
curl -X POST https://server.xpay-bits.com/v1/payments \
  -H "Authorization: Bearer sk_sandbox_your_key" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000,
    "currency": "RWF",
    "payment_method": "mobile_money",
    "phone_number": "+250788123456"
  }'
```

## Bank Transfer

Accept payments directly from bank accounts.

### Supported Banks

| Country | Banks                                 |
| ------- | ------------------------------------- |
| Rwanda  | Bank of Kigali, I&M Bank, Equity Bank |

### Example

```bash
curl -X POST https://server.xpay-bits.com/v1/payments \
  -H "Authorization: Bearer sk_sandbox_your_key" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100000,
    "currency": "RWF",
    "payment_method": "bank_transfer",
    "bank_code": "BK",
    "account_number": "1234567890"
  }'
```

## Card Payments

Accept Visa, Mastercard, and other major cards.

### Supported Cards

- Visa
- Mastercard
- American Express (coming soon)

### Example

```bash
curl -X POST https://server.xpay-bits.com/v1/payments \
  -H "Authorization: Bearer sk_sandbox_your_key" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000,
    "currency": "USD",
    "payment_method": "card",
    "card": {
      "number": "4242424242424242",
      "exp_month": 12,
      "exp_year": 2026,
      "cvc": "123"
    }
  }'
```

:::warning PCI Compliance
For card payments, always use our hosted checkout or tokenization to avoid handling raw card data.
:::

## Wallet Payments

Accept payments from X-Pay wallets.

```bash
curl -X POST https://server.xpay-bits.com/v1/payments \
  -H "Authorization: Bearer sk_sandbox_your_key" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000,
    "currency": "RWF",
    "payment_method": "wallet",
    "wallet_id": "wal_abc123"
  }'
```

## Method Comparison

| Method        | Speed    | Fees         | Best For         |
| ------------- | -------- | ------------ | ---------------- |
| Mobile Money  | Instant  | 1-2%         | Local customers  |
| Bank Transfer | 1-3 days | 0.5-1%       | Large amounts    |
| Card          | Instant  | 2.9% + $0.30 | International    |
| Wallet        | Instant  | 0%           | Repeat customers |

## Testing Payment Methods

In sandbox mode, use these test credentials:

### Mobile Money

- Phone: `+250788000001` (success)
- Phone: `+250788000002` (failure)

### Cards

- Number: `4242424242424242` (success)
- Number: `4000000000000002` (decline)
