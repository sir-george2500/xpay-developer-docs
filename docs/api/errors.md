---
sidebar_position: 2
---

# Error Codes

Complete list of error codes returned by the X-Pay API.

## Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "error_code",
    "message": "Human readable description",
    "field": "field_name",
    "details": {}
  }
}
```

## Authentication Errors (401, 403)

| Code               | Message                          | Solution                   |
| ------------------ | -------------------------------- | -------------------------- |
| `unauthorized`     | Missing or invalid authorization | Include valid Bearer token |
| `invalid_api_key`  | API key is invalid or expired    | Check your API key         |
| `expired_token`    | JWT token has expired            | Login again                |
| `invalid_token`    | Token format is invalid          | Use valid JWT format       |
| `forbidden`        | Access denied                    | Check permissions          |
| `unverified_email` | Email not verified               | Complete verification      |

## Validation Errors (400, 422)

| Code                   | Message                         | Solution                 |
| ---------------------- | ------------------------------- | ------------------------ |
| `invalid_request`      | Request body is malformed       | Check JSON syntax        |
| `missing_field`        | Required field is missing       | Include required fields  |
| `invalid_field`        | Field value is invalid          | Check field format       |
| `invalid_amount`       | Amount must be positive integer | Use positive number      |
| `invalid_currency`     | Currency not supported          | Use supported currency   |
| `invalid_phone_number` | Phone number format invalid     | Use +XXXXXXXXXXX format  |
| `invalid_email`        | Email format is invalid         | Use valid email address  |
| `invalid_url`          | URL format is invalid           | Use valid http/https URL |
| `too_short`            | Value is too short              | Meet minimum length      |
| `too_long`             | Value is too long               | Stay within max length   |

## Payment Errors (400, 402)

| Code                   | Message                        | Solution                      |
| ---------------------- | ------------------------------ | ----------------------------- |
| `payment_failed`       | Payment could not be processed | Retry or use different method |
| `payment_declined`     | Payment was declined           | Contact support or try again  |
| `insufficient_balance` | Account has insufficient funds | Top up balance                |
| `duplicate_payment`    | Payment already exists         | Check existing payments       |
| `payment_cancelled`    | Payment was cancelled          | Create new payment            |
| `payment_expired`      | Payment request expired        | Create new payment            |
| `provider_error`       | Payment provider unavailable   | Retry later                   |
| `unsupported_method`   | Payment method not supported   | Use supported method          |

## Resource Errors (404, 409)

| Code              | Message                      | Solution                 |
| ----------------- | ---------------------------- | ------------------------ |
| `not_found`       | Resource not found           | Check resource ID        |
| `already_exists`  | Resource already exists      | Use existing resource    |
| `conflict`        | Resource state conflict      | Check current state      |
| `pending_request` | Already have pending request | Wait for current request |

## Rate Limit Errors (429)

| Code             | Message                | Solution             |
| ---------------- | ---------------------- | -------------------- |
| `rate_limited`   | Too many requests      | Wait and retry       |
| `quota_exceeded` | Monthly quota exceeded | Upgrade plan or wait |

## Server Errors (500, 503)

| Code                  | Message                   | Solution           |
| --------------------- | ------------------------- | ------------------ |
| `internal_error`      | Internal server error     | Retry later        |
| `service_unavailable` | Service temporarily down  | Retry later        |
| `timeout`             | Request timed out         | Retry with backoff |
| `database_error`      | Database operation failed | Retry later        |

## Webhook Errors

| Code                  | Message                 | Solution            |
| --------------------- | ----------------------- | ------------------- |
| `invalid_webhook_url` | Webhook URL is invalid  | Use valid https URL |
| `webhook_failed`      | Webhook delivery failed | Check endpoint      |
| `webhook_timeout`     | Webhook timed out       | Respond faster      |

## Document Upload Errors

| Code                | Message                   | Solution              |
| ------------------- | ------------------------- | --------------------- |
| `file_too_large`    | File exceeds 10MB limit   | Reduce file size      |
| `invalid_file_type` | File type not supported   | Use PDF, JPG, or PNG  |
| `upload_failed`     | Upload processing failed  | Retry upload          |
| `document_exists`   | Document already uploaded | Delete existing first |
