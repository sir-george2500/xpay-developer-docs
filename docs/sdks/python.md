---
sidebar_position: 2
---

# Python SDK

The official Python SDK for X-Pay payment processing. Full type hints, Pydantic models, and framework integrations for Django, Flask, and FastAPI.

## Installation

```bash
# Basic installation
pip install xpay-python-sdk

# With async support
pip install xpay-python-sdk[async]

# With Django integration
pip install xpay-python-sdk[django]

# With Flask integration
pip install xpay-python-sdk[flask]

# With FastAPI integration
pip install xpay-python-sdk[fastapi]

# All optional dependencies
pip install xpay-python-sdk[all]
```

## Quick Start

```python
from xpay import XPayClient, PaymentRequest

# Initialize the client
client = XPayClient(
    api_key="sk_sandbox_your_secret_key",
    merchant_id="your_merchant_id",
    environment="sandbox"
)

# Create a payment
payment_request = PaymentRequest(
    amount="29.99",
    currency="USD",
    payment_method="stripe",
    description="Python SDK test payment"
)

payment = client.payments.create(payment_request)
print(f"Payment ID: {payment.id}")
print(f"Status: {payment.status}")
```

## Configuration

```python
client = XPayClient(
    api_key="sk_sandbox_xxx",       # Required: API key
    merchant_id="merchant_123",     # Required: Merchant ID
    environment="sandbox",          # Optional: 'sandbox' or 'live'
    base_url="https://server.xpay-bits.com",  # Optional
    timeout=30                      # Optional: Request timeout
)
```

### Environment Variables

```bash
export XPAY_API_KEY="sk_sandbox_your_key"
export XPAY_MERCHANT_ID="your_merchant_id"
export XPAY_ENVIRONMENT="sandbox"
export XPAY_TIMEOUT="30"
```

## Payments API

### Create Payment

```python
from xpay import PaymentRequest

# Stripe payment
stripe_payment = client.payments.create(PaymentRequest(
    amount="50.00",
    currency="USD",
    payment_method="stripe",
    description="Order #12345",
    payment_method_data={
        "payment_method_types": ["card"]
    },
    metadata={
        "order_id": "12345",
        "customer_email": "john@example.com"
    }
))

print(f"Client Secret: {stripe_payment.client_secret}")
```

### Mobile Money Payment

```python
# MTN Ghana
momo_payment = client.payments.create(PaymentRequest(
    amount="75.00",
    currency="GHS",
    payment_method="momo",
    description="MoMo payment",
    payment_method_data={
        "phone_number": "+233501234567"
    }
))

print(f"Reference ID: {momo_payment.reference_id}")
print(f"Instructions: {momo_payment.instructions}")
```

### Retrieve & List Payments

```python
# Get single payment
payment = client.payments.retrieve("pay_12345")

# List payments with filters
payments = client.payments.list(
    limit=10,
    status="completed",
    customer_id="cust_123"
)

for payment in payments.data:
    print(f"{payment.id}: {payment.amount} {payment.currency}")
```

## Customer Management

```python
from xpay import CreateCustomerRequest

# Create customer
customer = client.customers.create(CreateCustomerRequest(
    name="John Doe",
    email="john@example.com",
    phone="+233501234567",
    metadata={"signup_source": "website"}
))

# Update customer
updated = client.customers.update("cust_123", {
    "name": "John Smith"
})

# List customers
customers = client.customers.list(limit=50)
```

## Webhooks

### Create Webhook

```python
from xpay import CreateWebhookRequest

webhook = client.webhooks.create(CreateWebhookRequest(
    url="https://your-app.com/webhooks/xpay",
    events=["payment.succeeded", "payment.failed"],
    description="Payment notifications"
))

print(f"Webhook ID: {webhook.id}")
print(f"Secret: {webhook.secret}")  # Store this!
```

### Verify Webhook Signature

```python
from xpay.utils.webhook import verify_signature

is_valid = verify_signature(
    payload=request.body,
    signature=request.headers.get("X-XPay-Signature"),
    secret="whsec_your_webhook_secret"
)

if is_valid:
    event = json.loads(request.body)
    if event["type"] == "payment.succeeded":
        handle_successful_payment(event["data"])
```

## Framework Integrations

### Django

```python
# settings.py
INSTALLED_APPS = [
    'xpay.integrations.django',
]

XPAY = {
    'API_KEY': 'sk_sandbox_your_key',
    'MERCHANT_ID': 'your_merchant_id',
    'ENVIRONMENT': 'sandbox',
    'WEBHOOK_SECRET': 'whsec_your_secret',
}

# views.py
from xpay.integrations.django import XPayDjangoClient
from django.http import JsonResponse

def create_payment(request):
    client = XPayDjangoClient()  # Uses settings automatically
    payment = client.payments.create({
        "amount": "25.00",
        "payment_method": "stripe"
    })
    return JsonResponse({"payment_id": payment.id})
```

### Flask

```python
from flask import Flask, request, jsonify
from xpay.integrations.flask import XPayBlueprint

app = Flask(__name__)
app.config['XPAY_API_KEY'] = 'sk_sandbox_your_key'
app.config['XPAY_MERCHANT_ID'] = 'your_merchant_id'

xpay_bp = XPayBlueprint(
    api_key=app.config['XPAY_API_KEY'],
    merchant_id=app.config['XPAY_MERCHANT_ID']
)
app.register_blueprint(xpay_bp, url_prefix='/xpay')

@app.route('/payments', methods=['POST'])
def create_payment():
    client = xpay_bp.get_client()
    payment = client.payments.create(request.json)
    return jsonify({"payment_id": payment.id})
```

### FastAPI

```python
from fastapi import FastAPI, Depends
from xpay.integrations.fastapi import get_xpay_client, XPayClientDep

app = FastAPI()

@app.post("/payments")
async def create_payment(
    payment_data: dict,
    client: XPayClientDep = Depends(get_xpay_client)
):
    payment = await client.payments.create_async(payment_data)
    return {"payment_id": payment.id}
```

## Async Support

```python
from xpay import XPayAsyncClient

async_client = XPayAsyncClient(
    api_key="sk_sandbox_your_key",
    merchant_id="your_merchant_id"
)

async def create_payment_async():
    payment = await async_client.payments.create_async({
        "amount": "15.00",
        "payment_method": "stripe"
    })
    return payment

# Usage
import asyncio
payment = asyncio.run(create_payment_async())
```

## Currency Utilities

```python
from xpay.utils.currency import CurrencyUtils
from decimal import Decimal

# Convert to smallest unit (cents/pesewas)
cents = CurrencyUtils.to_smallest_unit(Decimal("25.99"), "USD")
print(cents)  # 2599

# Convert from smallest unit
dollars = CurrencyUtils.from_smallest_unit(2599, "USD")
print(dollars)  # Decimal("25.99")

# Format for display
formatted = CurrencyUtils.format_amount(Decimal("25.99"), "GHS")
print(formatted)  # "₵25.99"
```

## Error Handling

```python
from xpay.exceptions import (
    XPayError,
    AuthenticationError,
    ValidationError,
    PaymentError,
    NetworkError
)

try:
    payment = client.payments.create(payment_request)
except ValidationError as e:
    print(f"Validation failed: {e.message}")
    print(f"Field errors: {e.details}")
except AuthenticationError as e:
    print(f"Auth failed: {e.message}")
except PaymentError as e:
    print(f"Payment failed: {e.message}")
    print(f"Payment ID: {e.payment_id}")
except NetworkError as e:
    print(f"Network error: {e.message}")
except XPayError as e:
    print(f"X-Pay error [{e.code}]: {e.message}")
```

## Supported Payment Methods

| Method         | Code           | Currencies         |
| -------------- | -------------- | ------------------ |
| Stripe (Cards) | `stripe`       | USD, EUR, GBP, GHS |
| Ghana MoMo     | `momo`         | GHS                |
| Liberia MoMo   | `momo_liberia` | USD, LRD           |
| Nigeria MoMo   | `momo_nigeria` | NGN                |
| Uganda MoMo    | `momo_uganda`  | UGX                |
| Rwanda MoMo    | `momo_rwanda`  | RWF                |
| X-Pay Wallet   | `xpay_wallet`  | All                |

## Type Safety

Full Pydantic model support:

```python
from xpay import PaymentRequest, Payment, Customer
from typing import Optional

# IDE autocomplete and type checking
payment_request: PaymentRequest = PaymentRequest(
    amount="25.99",
    currency="USD",
    payment_method="stripe"
)

# Response is properly typed
payment: Payment = client.payments.create(payment_request)
print(payment.client_secret)  # Type checker knows this exists
```

## Requirements

- Python 3.8+
- requests >= 2.28.0
- pydantic >= 1.10.0

## Next Steps

- [JavaScript SDK](/sdks/javascript) - Node.js & browser SDK
- [Stripe Integration](/payments/stripe) - Card payments guide
- [Mobile Money](/payments/mobile-money) - MoMo integration
