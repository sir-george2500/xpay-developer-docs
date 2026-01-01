---
sidebar_position: 1
slug: /
---

# Welcome to X-Pay

X-Pay is the unified payment infrastructure for Africa. Accept Mobile Money, Cards, and Bank Transfers with a single API.

<div style={{display: 'flex', gap: '1rem', marginBottom: '2rem'}}>
  <a href="/docs/getting-started/registration" className="button button--primary button--lg">Get Started →</a>
  <a href="https://discord.gg/A2p4bwvW" className="button button--secondary button--outline button--lg">Join Discord</a>
</div>

## How It Works

```
1. Create Account     →  Sign up at dashboard.xpay-bits.com
2. Get API Keys       →  Sandbox key for testing, Live key for production
3. Integrate          →  Use REST API or SDKs to accept payments
4. Go Live            →  Submit documents and request live access
```

## Supported Payment Methods

| Method             | Countries             | Currencies         |
| ------------------ | --------------------- | ------------------ |
| **Stripe** (Cards) | Global                | USD, EUR, GBP, GHS |
| **MTN MoMo**       | Ghana, Rwanda, Uganda | GHS, RWF, UGX      |
| **Orange Money**   | Liberia               | USD, LRD           |
| **X-Pay Wallet**   | All                   | USD, GHS, EUR      |

## Quick Example

Once you have your API key, create a payment with a single request:

```bash
curl -X POST https://server.xpay-bits.com/v1/api/merchants/{merchant_id}/payments \
  -H "X-API-Key: sk_sandbox_your_key" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": "10.00",
    "currency": "USD",
    "payment_method": "stripe",
    "description": "Order #123"
  }'
```

**Response:**

```json
{
  "id": "pay_abc123",
  "status": "pending",
  "client_secret": "pi_xxx_secret_yyy",
  "amount": "10.00",
  "currency": "USD"
}
```

## Next Steps

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>

<a href="/docs/getting-started/registration" style={{textDecoration: 'none'}}>

<div className="card padding--md">
  <h3>📝 Create Account</h3>
  <p>Sign up and verify your email</p>
</div>
</a>

<a href="/docs/getting-started/api-keys" style={{textDecoration: 'none'}}>

<div className="card padding--md">
  <h3>🔑 Get API Keys</h3>
  <p>Get sandbox and live keys</p>
</div>
</a>

<a href="/docs/getting-started/your-first-payment" style={{textDecoration: 'none'}}>

<div className="card padding--md">
  <h3>💳 First Payment</h3>
  <p>Create your first payment</p>
</div>
</a>

<a href="/docs/payments/overview" style={{textDecoration: 'none'}}>

<div className="card padding--md">
  <h3>📱 Payment Methods</h3>
  <p>Stripe, MoMo, Orange, Wallet</p>
</div>
</a>

</div>

## Need Help?

- 💬 **Discord**: [Join our community](https://discord.gg/A2p4bwvW)
- 📧 **Email**: support@xpay-bits.com
