---
sidebar_position: 3
---

# Go Live Guide

Ready to accept real payments? This guide walks you through requesting and getting approved for live environment access.

## Prerequisites

Before requesting live access, ensure you have:

- ✅ Completed sandbox testing
- ✅ Set up webhook handling
- ✅ Valid business documentation
- ✅ Government-issued ID

## Live Access Request Process

```mermaid
flowchart LR
    A[📤 Submit Request] --> B[🔍 Review\n2-3 days]
    B --> C[✅ Approved]
    C --> D[🚀 Go Live!]

    style A fill:#3b82f6,stroke:#1e40af,color:#fff
    style B fill:#f59e0b,stroke:#b45309,color:#fff
    style C fill:#22c55e,stroke:#15803d,color:#fff
    style D fill:#8b5cf6,stroke:#6d28d9,color:#fff
```

## Step 1: Prepare Documents

You'll need to upload:

### Identity Verification

- **National ID** - Front and back
- **Passport** - Photo page
- **Driver's License** - Valid and not expired

### Business Verification

- **Business Registration Certificate**
- **Tax Identification Number (TIN)**
- **Business License** (if applicable)

:::tip Document Requirements

- Files must be PDF, JPG, or PNG
- Maximum file size: 10MB
- Documents must be clear and legible
- All information must be visible
  :::

## Step 2: Submit Request

### Via Dashboard

1. Log in to your [Dashboard](https://xpay-developer-platform.vercel.app/#features)
2. Click **Go Live** in the sidebar
3. Fill in business details:
   - Business Name
   - Business Type (e-commerce, SaaS, etc.)
   - Business Website
   - Expected Monthly Volume
   - Use Case Description
4. Upload required documents
5. Acknowledge compliance terms
6. Click **Submit Request**

### Via API

```bash
# 1. Upload KYC Document
curl -X POST https://server.xpay-bits.com/v1/documents/upload/kyc \
  -H "Authorization: Bearer your_jwt_token" \
  -F "document=@/path/to/national_id.pdf" \
  -F "document_type=national_id"

# 2. Upload Business Certificate
curl -X POST https://server.xpay-bits.com/v1/documents/upload/business \
  -H "Authorization: Bearer your_jwt_token" \
  -F "document=@/path/to/business_cert.pdf"

# 3. Submit Live Access Request
curl -X POST https://server.xpay-bits.com/v1/developer/live-access/request \
  -H "Authorization: Bearer your_jwt_token" \
  -H "Content-Type: application/json" \
  -d '{
    "business_name": "My Company Ltd",
    "business_type": "e_commerce",
    "business_website": "https://mycompany.com",
    "expected_monthly_volume": 1000000,
    "use_case": "We are an e-commerce platform selling electronics...",
    "compliance_acknowledged": true
  }'
```

## Step 3: Wait for Review

Our team reviews all requests within **2-3 business days**.

During review, we may:

- Request additional documents
- Ask clarifying questions
- Schedule a brief call

### Check Status

```bash
curl -X GET https://server.xpay-bits.com/v1/developer/live-access/status \
  -H "Authorization: Bearer your_jwt_token"
```

Response:

```json
{
  "status": "pending",
  "has_live_access": false,
  "live_access_request": {
    "id": "req_abc123",
    "status": "under_review",
    "requested_at": "2025-01-01T10:00:00Z"
  }
}
```

## Step 4: Get Approved

Once approved, you'll receive:

- Email notification
- Live API keys in your dashboard
- Access to live environment

## Step 5: Switch to Production

1. **Update API Keys**

   ```bash
   # Change from sandbox
   XPAY_SECRET_KEY=sk_sandbox_xxx

   # To live
   XPAY_SECRET_KEY=sk_live_xxx
   ```

2. **Update Webhook URLs**
   - Add production webhook endpoints
   - Verify they're working

3. **Test with Small Amount**
   - Make a real payment for small amount
   - Verify end-to-end flow

4. **Launch! 🚀**

## Business Types

| Type          | Description             |
| ------------- | ----------------------- |
| `e_commerce`  | Online retail store     |
| `saas`        | Software as a Service   |
| `marketplace` | Multi-vendor platform   |
| `fintech`     | Financial services      |
| `education`   | Online courses, schools |
| `healthcare`  | Medical services        |
| `other`       | Other businesses        |

## Common Rejection Reasons

| Reason                  | Solution                            |
| ----------------------- | ----------------------------------- |
| Incomplete documents    | Provide all required files          |
| Unclear documents       | Upload higher quality images        |
| Business not registered | Complete business registration      |
| High-risk business      | Contact support for alternatives    |
| Insufficient use case   | Provide more details about your use |

## Need Help?

- **Email**: support@xpay-bits.com
- **Dashboard**: [xpay-developer-platform.vercel.app](https://xpay-developer-platform.vercel.app/#features)
- **Status**: Check your request status in the dashboard

## After Going Live

- Monitor your transactions in the dashboard
- Set up alerts for failed payments
- Keep your documents up to date
- Follow compliance guidelines
