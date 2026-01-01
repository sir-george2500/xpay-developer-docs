---
sidebar_position: 2
---

# Get Your API Keys

X-Pay uses API keys to authenticate your requests. You'll receive two keys:

| Key Type    | Prefix        | Purpose                 |
| ----------- | ------------- | ----------------------- |
| **Sandbox** | `sk_sandbox_` | Testing and development |
| **Live**    | `sk_live_`    | Production payments     |

## Retrieving Your Keys

### Via Dashboard

1. Log in to [dashboard.xpay-bits.com](https://dashboard.xpay-bits.com/#features)
2. Navigate to **Settings** → **API Keys**
3. Copy your Sandbox and Live keys

:::caution Keep Your Keys Secret
Never expose your API keys in client-side code, public repositories, or logs. Anyone with your live key can process real payments.
:::

## Using Your API Keys

Include your API key in the `X-API-Key` header for all payment requests:

```bash
curl -X POST https://server.xpay-bits.com/v1/api/merchants/{merchant_id}/payments \
  -H "X-API-Key: sk_sandbox_your_key" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

## Sandbox vs Live

| Feature     | Sandbox | Live     |
| ----------- | ------- | -------- |
| Real money  | ❌ No   | ✅ Yes   |
| Test cards  | ✅ Yes  | ❌ No    |
| Webhooks    | ✅ Yes  | ✅ Yes   |
| Rate limits | Higher  | Standard |

**Always use Sandbox keys during development!**

## Regenerating Keys

If your keys are compromised, regenerate them immediately:

### Via Dashboard

1. Go to **Settings** → **API Keys**
2. Click **Regenerate Keys**
3. Update your integration with the new keys

:::warning
Regenerating keys **immediately invalidates** your old keys. Update your integration before regenerating.
:::

## Next Steps

Now that you have your keys, [create your first payment →](/docs/getting-started/your-first-payment)
