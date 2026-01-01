---
sidebar_position: 3
---

# Go SDK

The official Go SDK for X-Pay.

:::note Coming Soon
The official X-Pay Go SDK is currently in development. For now, use the REST API directly.
:::

## Installation

```bash
go get github.com/xpay/xpay-go
```

## Quick Start

```go
package main

import (
    "github.com/xpay/xpay-go"
)

func main() {
    client := xpay.NewClient(
        xpay.WithSecretKey("sk_sandbox_your_key"),
        xpay.WithEnvironment(xpay.Sandbox),
    )

    payment, err := client.Payments.Create(&xpay.PaymentRequest{
        Amount:        5000,
        Currency:      "RWF",
        PaymentMethod: "mobile_money",
        PhoneNumber:   "+250788123456",
    })

    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Payment ID: %s\n", payment.ID)
}
```

## Using REST API Directly

Until the SDK is available, use the standard library:

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "os"
)

const XPAY_API = "https://server.xpay-bits.com/v1"

type PaymentRequest struct {
    Amount        int    `json:"amount"`
    Currency      string `json:"currency"`
    PaymentMethod string `json:"payment_method"`
    PhoneNumber   string `json:"phone_number"`
}

type PaymentResponse struct {
    Success bool `json:"success"`
    Data    struct {
        ID       string `json:"id"`
        Amount   int    `json:"amount"`
        Currency string `json:"currency"`
        Status   string `json:"status"`
    } `json:"data"`
}

func CreatePayment(req PaymentRequest) (*PaymentResponse, error) {
    apiKey := os.Getenv("XPAY_SECRET_KEY")

    body, err := json.Marshal(req)
    if err != nil {
        return nil, err
    }

    httpReq, err := http.NewRequest("POST", XPAY_API+"/payments", bytes.NewBuffer(body))
    if err != nil {
        return nil, err
    }

    httpReq.Header.Set("Authorization", "Bearer "+apiKey)
    httpReq.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(httpReq)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var paymentResp PaymentResponse
    if err := json.NewDecoder(resp.Body).Decode(&paymentResp); err != nil {
        return nil, err
    }

    return &paymentResp, nil
}

func main() {
    payment, err := CreatePayment(PaymentRequest{
        Amount:        5000,
        Currency:      "RWF",
        PaymentMethod: "mobile_money",
        PhoneNumber:   "+250788123456",
    })

    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }

    fmt.Printf("Payment created: %s\n", payment.Data.ID)
}
```

## With Error Handling

```go
package main

import (
    "encoding/json"
    "errors"
    "fmt"
    "net/http"
)

type XPayError struct {
    Code    string `json:"code"`
    Message string `json:"message"`
    Status  int    `json:"-"`
}

func (e *XPayError) Error() string {
    return fmt.Sprintf("%s: %s", e.Code, e.Message)
}

type ErrorResponse struct {
    Success bool `json:"success"`
    Error   struct {
        Code    string `json:"code"`
        Message string `json:"message"`
    } `json:"error"`
}

func CreatePaymentWithErrorHandling(req PaymentRequest) (*PaymentResponse, error) {
    // ... make request ...

    if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
        var errResp ErrorResponse
        json.NewDecoder(resp.Body).Decode(&errResp)

        return nil, &XPayError{
            Code:    errResp.Error.Code,
            Message: errResp.Error.Message,
            Status:  resp.StatusCode,
        }
    }

    // ... parse success response ...
}
```

## Get Notified

Want to be notified when the SDK launches?

- Watch our [GitHub repo](https://github.com/sir-george2500/xpay-developer-platform)
- Follow us on Twitter [@xpay](https://twitter.com/xpay)
