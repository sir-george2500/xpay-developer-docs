import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "X-Pay Developers",
  tagline: "Payment Infrastructure for Africa",
  favicon: "img/logo.png",

  url: "https://docs.xpay-bits.com",
  baseUrl: "/",

  organizationName: "xpay-bits",
  projectName: "xpay-developer-docs",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "docs",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "X-Pay",
      logo: {
        alt: "X-Pay Logo",
        src: "img/logo.png",
      },
      items: [
        {
          to: "/docs",
          label: "Docs",
          position: "left",
        },
        {
          to: "/docs/getting-started/registration",
          label: "Get Started",
          position: "left",
        },
        {
          to: "/docs/api/endpoints",
          label: "API",
          position: "left",
        },
        {
          href: "https://discord.gg/A2p4bwvW",
          position: "right",
          className: "header-discord-link",
          "aria-label": "Discord",
        },
        {
          href: "https://dashboard.xpay-bits.com",
          label: "Dashboard",
          position: "right",
        },
        {
          href: "https://github.com/sir-george2500/xpay-developer-platform",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Getting Started",
          items: [
            {
              label: "Create Account",
              to: "/docs/getting-started/registration",
            },
            { label: "API Keys", to: "/docs/getting-started/api-keys" },
            {
              label: "First Payment",
              to: "/docs/getting-started/your-first-payment",
            },
          ],
        },
        {
          title: "Payments",
          items: [
            { label: "Stripe (Cards)", to: "/docs/payments/stripe" },
            { label: "Mobile Money", to: "/docs/payments/mobile-money" },
            { label: "Webhooks", to: "/docs/guides/webhooks" },
          ],
        },
        {
          title: "SDKs",
          items: [
            { label: "JavaScript", to: "/docs/sdks/javascript" },
            { label: "Python", to: "/docs/sdks/python" },
            { label: "Go", to: "/docs/sdks/go" },
          ],
        },
        {
          title: "Community",
          items: [
            { label: "Discord", href: "https://discord.gg/A2p4bwvW" },
            {
              label: "GitHub",
              href: "https://github.com/sir-george2500/xpay-developer-platform",
            },
            {
              label: "API Reference (Swagger)",
              href: "https://server.xpay-bits.com/swagger/index.html",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} X-Pay. Built for African Developers.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json", "go", "python"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
