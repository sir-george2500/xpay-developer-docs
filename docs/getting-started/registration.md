---
sidebar_position: 1
---

# Create Your Account

Before you can accept payments, you need to create a developer account on the X-Pay platform.

## Step 1: Sign Up

1. Go to [xpay-developer-platform.vercel.app](https://xpay-developer-platform.vercel.app/#features)
2. Click **"Sign Up"**
3. Fill in your details:
   - **Email**: Your business email
   - **Password**: At least 8 characters
   - **Full Name**: Your name
   - **Company Name**: Your business name (optional)
   - **Country**: Your country code (e.g., "GH" for Ghana)

Alternatively, you can register via API:

```bash
curl -X POST https://server.xpay-bits.com/v1/developers/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "developer@yourcompany.com",
    "password": "your_secure_password",
    "full_name": "John Doe",
    "company_name": "Your Company",
    "country_code": "GH"
  }'
```

## Step 2: Verify Your Email

After signing up, you'll receive a verification email. Click the link to verify your account.

If you don't receive the email:

- Check your spam folder
- Request a new verification email from the dashboard

## Step 3: Log In

Once verified, log in to the dashboard:

```bash
curl -X POST https://server.xpay-bits.com/v1/developers/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "developer@yourcompany.com",
    "password": "your_secure_password"
  }'
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid-here",
    "email": "developer@yourcompany.com",
    "full_name": "John Doe"
  }
}
```

Save the `token` - you'll need it to access your API keys.

## Next Steps

Now that you have an account, [get your API keys →](/docs/getting-started/api-keys)
