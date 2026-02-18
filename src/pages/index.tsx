import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHero() {
  return (
    <header className={styles.heroBanner}>
      {/* Background effects */}
      <div className={styles.bgEffects}>
        <div className={styles.glowOrb1}></div>
        <div className={styles.glowOrb2}></div>
        <div className={styles.gridOverlay}></div>
        <div className={styles.starfield}>
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className={styles.star}></div>
          ))}
        </div>
        {/* Large X-Pay background text */}
        <div className={styles.bgTextContainer}>
          <span className={styles.bgText}>X-Pay</span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.heroContent}>
        {/* Logo */}
        <div className={styles.heroLogo}>
          <img src="/img/logo.png" alt="X-Pay" width="72" height="72" />
        </div>

        {/* Badge */}
        <div className={styles.heroBadge}>
          <span className={styles.badgeIcon}>✦</span>
          Africa's First AI-Native Financial Platform
        </div>

        {/* Title */}
        <Heading as="h1" className={styles.heroTitle}>
          X-Pay Developer{"\n"}
          <span className={styles.heroTitleAccent}>Documentation</span>
        </Heading>

        {/* Subtitle */}
        <p className={styles.heroSubtitle}>
          The unified payment infrastructure for Africa. Accept Mobile Money,
          Cards, and Bank Transfers with a single API.
        </p>

        {/* CTA Buttons */}
        <div className={styles.heroButtons}>
          <Link
            className={styles.btnPrimary}
            to="/docs/getting-started/registration"
          >
            Get Started
            <span className={styles.btnArrow}>→</span>
          </Link>
          <Link className={styles.btnSecondary} to="/docs/api/endpoints">
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    icon: "📱",
    title: "Mobile Money",
    description:
      "Direct integration with MTN, Orange, and Airtel across Ghana, Rwanda, Uganda, and Liberia.",
    link: "/docs/payments/mobile-money",
  },
  {
    icon: "💳",
    title: "Global Cards",
    description:
      "Accept Visa, Mastercard, and American Express from customers worldwide via Stripe.",
    link: "/docs/payments/stripe",
  },
  {
    icon: "🔗",
    title: "Webhooks",
    description:
      "Real-time event notifications for payment status, refunds, and account activity.",
    link: "/docs/guides/webhooks",
  },
  {
    icon: "🛠️",
    title: "SDKs",
    description:
      "Typed SDKs for JavaScript, Python, and Go with full API coverage.",
    link: "/docs/sdks/javascript",
  },
  {
    icon: "🔑",
    title: "API Keys",
    description:
      "Granular permissions, test/live modes, and secure key management from your dashboard.",
    link: "/docs/getting-started/api-keys",
  },
  {
    icon: "📊",
    title: "Dashboard",
    description:
      "Monitor payments, manage customers, and view analytics from a single dashboard.",
    link: "https://dashboard.xpay-bits.com/",
  },
];

function Features() {
  return (
    <section className={styles.features}>
      {/* Background X-Pay text for features section */}
      <div className={styles.bgTextContainer}>
        <span className={styles.bgText}>X-Pay</span>
      </div>

      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Everything you need to accept payments
          </Heading>
          <p className={styles.sectionSubtitle}>
            Build powerful payment experiences with our comprehensive API and
            developer tools.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {FeatureList.map((feature, idx) => (
            <Link
              key={idx}
              to={feature.link}
              className={styles.featureCard}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={styles.featureIconWrap}>
                <span className={styles.featureIcon}>{feature.icon}</span>
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              <span className={styles.featureArrow}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickStart() {
  return (
    <section className={styles.quickStart}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Get started in minutes
          </Heading>
          <p className={styles.sectionSubtitle}>
            Three simple steps to start accepting payments.
          </p>
        </div>
        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Create an Account</h3>
            <p>
              Sign up on the{" "}
              <Link to="https://dashboard.xpay-bits.com/">X-Pay Dashboard</Link>{" "}
              and get your API keys.
            </p>
          </div>
          <div className={styles.stepConnector}></div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>Install an SDK</h3>
            <p>
              Choose from <Link to="/docs/sdks/javascript">JavaScript</Link>,{" "}
              <Link to="/docs/sdks/python">Python</Link>, or{" "}
              <Link to="/docs/sdks/go">Go</Link> SDKs.
            </p>
          </div>
          <div className={styles.stepConnector}></div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>Accept Payments</h3>
            <p>
              Start processing{" "}
              <Link to="/docs/payments/mobile-money">Mobile Money</Link> and{" "}
              <Link to="/docs/payments/stripe">Card</Link> payments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="X-Pay Developer Documentation"
      description="Unified Payment Infrastructure for Africa. Accept Mobile Money, Cards, and Bank Transfers with a single API."
    >
      <HomepageHero />
      <main>
        <Features />
        <QuickStart />
      </main>
    </Layout>
  );
}
