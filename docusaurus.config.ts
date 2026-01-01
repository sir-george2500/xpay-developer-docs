import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "X-Pay Developer Docs",
  tagline: "Payment Infrastructure Built for Developers",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://docs.xpay-bits.com",
  baseUrl: "/",

  organizationName: "sir-george2500",
  projectName: "xpay-developer-docs",

  onBrokenLinks: "throw",

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
          routeBasePath: "/",
          editUrl:
            "https://github.com/sir-george2500/xpay-developer-docs/tree/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/xpay-social-card.png",
    colorMode: {
      defaultMode: "dark",
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "X-Pay",
      logo: {
        alt: "X-Pay Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          href: "https://server.xpay-bits.com/swagger/index.html",
          label: "API Reference",
          position: "left",
        },
        {
          href: "https://dashboard.xpay-bits.com",
          label: "Dashboard",
          position: "right",
        },
        {
          href: "https://github.com/sir-george2500/xpay-developer-platform",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            { label: "Getting Started", to: "/" },
            { label: "Authentication", to: "/authentication" },
            {
              label: "API Reference",
              href: "https://server.xpay-bits.com/swagger/index.html",
            },
          ],
        },
        {
          title: "Guides",
          items: [
            { label: "Accept Payments", to: "/guides/accept-payments" },
            { label: "Webhooks", to: "/guides/webhooks" },
            { label: "Go Live", to: "/guides/go-live" },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "Developer Dashboard",
              href: "https://dashboard.xpay-bits.com",
            },
            { label: "Status Page", href: "https://status.xpay-bits.com" },
            {
              label: "GitHub",
              href: "https://github.com/sir-george2500/xpay-developer-platform",
            },
          ],
        },
        {
          title: "Company",
          items: [
            { label: "About X-Pay", href: "https://xpay-bits.com/about" },
            { label: "Contact Support", href: "mailto:support@xpay-bits.com" },
            { label: "Terms of Service", href: "https://xpay-bits.com/terms" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} X-Pay Technologies. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json", "go", "typescript", "javascript"],
    },
    algolia: undefined, // Can be configured later for search
  } satisfies Preset.ThemeConfig,
};

export default config;
