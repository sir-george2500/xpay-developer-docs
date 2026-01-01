import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: "doc",
      id: "intro",
      label: "👋 Welcome",
    },
    {
      type: "category",
      label: "🚀 Getting Started",
      collapsed: false,
      items: [
        "getting-started/registration",
        "getting-started/api-keys",
        "getting-started/your-first-payment",
      ],
    },
    {
      type: "category",
      label: "💳 Payments",
      items: ["payments/overview", "payments/stripe", "payments/mobile-money"],
    },
    {
      type: "category",
      label: "📦 SDKs",
      items: ["sdks/javascript", "sdks/python", "sdks/go"],
    },
    {
      type: "category",
      label: "🔔 Webhooks",
      items: ["guides/webhooks"],
    },
    {
      type: "category",
      label: "📖 Guides",
      items: ["guides/error-handling", "guides/go-live"],
    },
    {
      type: "category",
      label: "🔧 API Reference",
      items: ["api/endpoints", "api/errors", "api/rate-limits"],
    },
  ],
};

export default sidebars;
