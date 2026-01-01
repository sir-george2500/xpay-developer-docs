---
sidebar_position: 3
---

# Go SDK

The official Go SDK for X-Pay payment processing. Accept Mobile Money, Cards, and Bank Transfers with a single SDK.

## Installation

```bash
go get github.com/Sound-X-Team/xpay-go-sdk@v1.0.1
```

## Quick Start

```go
package main

import (
    "fmt"
    "log"

    "github.com/Sound-X-Team/xpay-go-sdk/xpay"
)

func main() {
    // Initialize the client
    config := xpay.NewConfig("sk_sandbox_your_key")
    config.MerchantID = "your_merchant_id"

    client := xpay.NewClient(config)

    // Create a payment
    payment, err := client.Payments.Create(&xpay.PaymentRequest{
        Amount:        "50.00",
        Currency:      "USD",
        PaymentMethod: "stripe",
        Description:   "Go SDK test payment",
    })

    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Payment ID: %s\n", payment.ID)
    fmt.Printf("Status: %s\n", payment.Status)
}
```

## Configuration Options

```go
config := xpay.NewConfig("sk_sandbox_your_key")
config.MerchantID = "merchant_123"     // Required: Merchant ID
config.Environment = "sandbox"          // Optional: 'sandbox' or 'live'
config.BaseURL = "https://server.xpay-bits.com" // Optional: Custom API URL
config.Timeout = 30                     // Optional: Request timeout in seconds
```

## Payments API

### Create Payment

```go
payment, err := client.Payments.Create(&xpay.PaymentRequest{
    Amount:        "29.99",
    Currency:      "USD",
    PaymentMethod: "stripe",
    Description:   "Order #12345",
    CustomerID:    "cust_123",          // Optional
    PaymentMethodData: map[string]interface{}{
        "payment_method_types": []string{"card"},
    },
    Metadata: map[string]string{
        "order_id": "12345",
    },
    SuccessURL: "https://your-site.com/success",
    CancelURL:  "https://your-site.com/cancel",
})
```

### Retrieve Payment

```go
payment, err := client.Payments.Retrieve("pay_123456789")
if err != nil {
    log.Fatal(err)
}
fmt.Printf("Status: %s\n", payment.Status)
```

### List Payments

```go
payments, err := client.Payments.List(&xpay.ListOptions{
    Limit:  10,
    Offset: 0,
    Status: "succeeded",
})

for _, p := range payments.Data {
    fmt.Printf("%s: %s %s\n", p.ID, p.Amount, p.Currency)
}
```

## Customer Management

```go
// Create customer
customer, err := client.Customers.Create(&xpay.CustomerRequest{
    Name:  "John Doe",
    Email: "john@example.com",
    Phone: "+233501234567",
})

// Retrieve customer
customer, err := client.Customers.Retrieve("cust_123")

// List customers
customers, err := client.Customers.List(&xpay.ListOptions{Limit: 50})
```

## Webhooks

### Verify Webhook Signature

```go
import "github.com/Sound-X-Team/xpay-go-sdk/xpay"

func webhookHandler(w http.ResponseWriter, r *http.Request) {
    payload, _ := io.ReadAll(r.Body)
    signature := r.Header.Get("X-XPay-Signature")

    isValid := xpay.VerifyWebhookSignature(
        string(payload),
        signature,
        "whsec_your_webhook_secret",
    )

    if isValid {
        var event xpay.WebhookEvent
        json.Unmarshal(payload, &event)

        switch event.Type {
        case "payment.succeeded":
            // Handle successful payment
        case "payment.failed":
            // Handle failed payment
        }
    }

    w.WriteHeader(http.StatusOK)
}
```

## Error Handling

```go
payment, err := client.Payments.Create(paymentReq)
if err != nil {
    if xpayErr, ok := err.(*xpay.Error); ok {
        fmt.Printf("X-Pay Error [%s]: %s\n", xpayErr.Code, xpayErr.Message)
        fmt.Printf("HTTP Status: %d\n", xpayErr.Status)
    } else {
        fmt.Printf("Network error: %v\n", err)
    }
    return
}
```

## Supported Payment Methods

| Method           | Code           | Currencies         |
| ---------------- | -------------- | ------------------ |
| Stripe (Cards)   | `stripe`       | USD, EUR, GBP, GHS |
| MTN MoMo Ghana   | `momo`         | GHS                |
| MTN MoMo Liberia | `momo_liberia` | LRD, USD           |
| MTN MoMo Rwanda  | `momo_rwanda`  | RWF                |
| Orange Money     | `orange`       | LRD, USD           |
| X-Pay Wallet     | `xpay_wallet`  | All                |

## Requirements

- Go 1.19+

## Next Steps

- [JavaScript SDK](/sdks/javascript) - Node.js & browser SDK
- [Python SDK](/sdks/python) - Python SDK with async support
- [Webhooks Guide](/guides/webhooks) - Handle payment notifications
