---
sidebar_position: 4
---

# PHP SDK

The official PHP SDK for X-Pay payment processing. Full Laravel support with Service Provider, Facades, and Artisan commands.

## Installation

```bash
composer require bits-devteam/xpay-php-sdk
```

## Quick Start

```php
<?php

use XPay\XPay;

// Initialize the client
$xpay = new XPay([
    'api_key' => 'sk_sandbox_your_api_key',
    'merchant_id' => 'your_merchant_id',
    'environment' => 'sandbox',
]);

// Create a payment
$payment = $xpay->payments()->create([
    'amount' => '29.99',
    'currency' => 'USD',
    'payment_method' => 'stripe',
    'description' => 'PHP SDK test payment',
]);

echo "Payment ID: " . $payment->id . "\n";
echo "Status: " . $payment->status . "\n";
```

## Configuration Options

```php
$xpay = new XPay([
    'api_key' => 'sk_sandbox_xxx',       // Required: API key
    'merchant_id' => 'merchant_123',     // Required: Merchant ID
    'environment' => 'sandbox',          // Optional: 'sandbox' or 'live'
    'base_url' => 'https://server.xpay-bits.com',  // Optional
    'timeout' => 30,                     // Optional: Request timeout
]);
```

## Laravel Integration

### Service Provider (Auto-registered)

Add your configuration to `config/xpay.php`:

```php
<?php

return [
    'api_key' => env('XPAY_API_KEY'),
    'merchant_id' => env('XPAY_MERCHANT_ID'),
    'environment' => env('XPAY_ENVIRONMENT', 'sandbox'),
    'webhook_secret' => env('XPAY_WEBHOOK_SECRET'),
];
```

### Using the Facade

```php
use XPay\Laravel\Facades\XPay;

// Create payment
$payment = XPay::payments()->create([
    'amount' => '25.00',
    'currency' => 'USD',
    'payment_method' => 'stripe',
]);

// List customers
$customers = XPay::customers()->list(['limit' => 50]);
```

### Environment Variables

```bash
XPAY_API_KEY=sk_sandbox_your_key
XPAY_MERCHANT_ID=your_merchant_id
XPAY_ENVIRONMENT=sandbox
XPAY_WEBHOOK_SECRET=whsec_your_secret
```

## Payments API

### Create Payment

```php
$payment = $xpay->payments()->create([
    'amount' => '50.00',
    'currency' => 'USD',
    'payment_method' => 'stripe',
    'description' => 'Order #12345',
    'customer_id' => 'cust_123',
    'payment_method_data' => [
        'payment_method_types' => ['card'],
    ],
    'metadata' => [
        'order_id' => '12345',
    ],
    'success_url' => 'https://your-site.com/success',
    'cancel_url' => 'https://your-site.com/cancel',
]);
```

### Mobile Money Payment

```php
$payment = $xpay->payments()->create([
    'amount' => '75.00',
    'currency' => 'GHS',
    'payment_method' => 'momo',
    'payment_method_data' => [
        'phone_number' => '+233501234567',
    ],
]);
```

### Retrieve & List Payments

```php
// Get single payment
$payment = $xpay->payments()->retrieve('pay_12345');

// List payments with filters
$payments = $xpay->payments()->list([
    'limit' => 10,
    'status' => 'succeeded',
    'customer_id' => 'cust_123',
]);

foreach ($payments->data as $payment) {
    echo $payment->id . ": " . $payment->amount . " " . $payment->currency . "\n";
}
```

## Customer Management

```php
// Create customer
$customer = $xpay->customers()->create([
    'name' => 'John Doe',
    'email' => 'john@example.com',
    'phone' => '+233501234567',
]);

// Update customer
$updated = $xpay->customers()->update('cust_123', [
    'name' => 'John Smith',
]);

// List customers
$customers = $xpay->customers()->list(['limit' => 50]);
```

## Webhooks

### Verify Webhook Signature

```php
use XPay\Utils\WebhookUtils;

$payload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_XPAY_SIGNATURE'] ?? '';
$secret = 'whsec_your_webhook_secret';

$isValid = WebhookUtils::verifySignature($payload, $signature, $secret);

if ($isValid) {
    $event = json_decode($payload, true);

    switch ($event['type']) {
        case 'payment.succeeded':
            // Handle successful payment
            break;
        case 'payment.failed':
            // Handle failed payment
            break;
    }
}
```

## Error Handling

```php
use XPay\Exceptions\XPayException;
use XPay\Exceptions\ValidationException;
use XPay\Exceptions\AuthenticationException;

try {
    $payment = $xpay->payments()->create($paymentData);
} catch (ValidationException $e) {
    echo "Validation failed: " . $e->getMessage() . "\n";
    print_r($e->getDetails());
} catch (AuthenticationException $e) {
    echo "Auth failed: " . $e->getMessage() . "\n";
} catch (XPayException $e) {
    echo "X-Pay error [{$e->getErrorCode()}]: " . $e->getMessage() . "\n";
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

- PHP 8.1+
- GuzzleHttp 7.0+

## Next Steps

- [JavaScript SDK](/sdks/javascript) - Node.js & browser SDK
- [Go SDK](/sdks/go) - Go SDK
- [Python SDK](/sdks/python) - Python SDK with async support
