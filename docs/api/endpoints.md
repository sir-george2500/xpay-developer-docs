---
sidebar_position: 1
---

# API Endpoints

Reference for X-Pay API endpoints used to integrate payments into your application.

## Base URL

```
https://server.xpay-bits.com/v1/api/merchants/{merchant_id}
```

Replace `{merchant_id}` with your Merchant ID from the dashboard.

---

## Payments

### Create Payment

```http
POST /payments
```

Creates a new payment intent.

**Headers:**

- `X-API-Key: sk_sandbox_your_key` or `sk_live_your_key`
- `Content-Type: application/json`

**Request Body:**

```json
{
  "amount": "10.00",
  "currency": "USD",
  "payment_method": "stripe",
  "description": "Order #123",
  "payment_method_data": {
    "payment_method_types": ["card"]
  }
}
```

### List Payments

```http
GET /payments
```

Query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `status` - Filter by status

### Get Payment

```http
GET /payments/{payment_id}
```

---

## Refunds

### Create Refund

```http
POST /refunds
```

**Request Body:**

```json
{
  "payment_id": "pay_abc123",
  "amount": "5.00",
  "reason": "customer_request"
}
```

### List Refunds

```http
GET /refunds
```

### Get Refund

```http
GET /refunds/{refund_id}
```

---

## Customers

### Create Customer

```http
POST /customers
```

**Request Body:**

```json
{
  "email": "customer@example.com",
  "name": "John Doe",
  "phone": "+1234567890"
}
```

### List Customers

```http
GET /customers
```

### Get Customer

```http
GET /customers/{customer_id}
```

### Update Customer

```http
PUT /customers/{customer_id}
```

### Delete Customer

```http
DELETE /customers/{customer_id}
```

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
