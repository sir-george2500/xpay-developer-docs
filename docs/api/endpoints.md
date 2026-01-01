---
sidebar_position: 1
---

# API Endpoints

Complete reference of all X-Pay API endpoints.

## Base URL

```
https://server.xpay-bits.com/v1
```

---

## Developer

### Get Profile

```
GET /developer/profile
```

### Update Profile

```
PUT /developer/profile
```

### Get API Keys

```
GET /developer/api-keys
```

### Regenerate API Keys

```
POST /developer/api-keys/regenerate
```

### Get Analytics

```
GET /developer/analytics
```

### Get Activity

```
GET /developer/activity
```

---

## Transactions

### List Transactions

```
GET /developer/transactions
```

Query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `status` - Filter by status
- `method` - Filter by payment method
- `date` - Filter by date

### Get Transaction

```
GET /developer/transactions/{id}
```

---

## Payments

### Create Payment

```
POST /payments
```

### Get Payment

```
GET /payments/{id}
```

### Cancel Payment

```
POST /payments/{id}/cancel
```

### Refund Payment

```
POST /payments/{id}/refund
```

---

## Webhooks

### List Webhooks

```
GET /developer/webhooks
```

### Create Webhook

```
POST /developer/webhooks
```

### Update Webhook

```
PUT /developer/webhooks/{id}
```

### Delete Webhook

```
DELETE /developer/webhooks/{id}
```

### Test Webhook

```
POST /developer/webhooks/{id}/test
```

---

## Live Access

### Get Status

```
GET /developer/live-access/status
```

### Request Access

```
POST /developer/live-access/request
```

---

## Documents

### Upload KYC Document

```
POST /documents/upload/kyc
```

Form data:

- `document` - File (PDF, JPG, PNG, max 10MB)
- `document_type` - Type (national_id, passport, drivers_license)

### Upload Business Certificate

```
POST /documents/upload/business
```

Form data:

- `document` - File (PDF, JPG, PNG, max 10MB)

---

## Response Format

All endpoints return JSON with this structure:

### Success

```json
{
  "success": true,
  "message": "Operation completed",
  "data": { ... }
}
```

### Error

```json
{
  "success": false,
  "error": {
    "code": "error_code",
    "message": "Human readable message"
  }
}
```
