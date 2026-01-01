import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: "doc",
      id: "intro",
      label: "🚀 Getting Started",
    },
    {
      type: "category",
      label: "📦 SDKs",
      collapsed: false,
      items: ["sdks/javascript", "sdks/python", "sdks/go"],
    },
    {
      type: "category",
      label: "💳 Payments",
      collapsed: false,
      items: ["payments/stripe", "payments/mobile-money", "payments/overview"],
    },
    {
      type: "category",
      label: "📖 Guides",
      items: [
        "guides/accept-payments",
        "guides/webhooks",
        "guides/go-live",
        "guides/error-handling",
      ],
    },
    {
      type: "category",
      label: "🔐 Authentication",
      items: [
        "authentication/overview",
        "authentication/api-keys",
        "authentication/jwt-tokens",
      ],
    },
    {
      type: "category",
      label: "🔧 API Reference",
      items: ["api/endpoints", "api/errors", "api/rate-limits"],
    },
  ],
};

export default sidebars;
