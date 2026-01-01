import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHero() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      {/* Gradient Background */}
      <div className={styles.gradientBackground}>
        {/* Floating gradient spheres */}
        <div className={clsx(styles.sphere, styles.sphere1)}></div>
        <div className={clsx(styles.sphere, styles.sphere2)}></div>
        <div className={clsx(styles.sphere, styles.sphere3)}></div>

        {/* Central glow */}
        <div className={styles.glow}></div>

        {/* Grid overlay */}
        <div className={styles.gridOverlay}></div>

        {/* Noise texture */}
        <div className={styles.noiseOverlay}></div>

        {/* Floating particles */}
        <div className={styles.particlesContainer}>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.contentContainer}>
        <Heading as="h1" className={styles.heroTitle}>
          Build with X-Pay
        </Heading>
        <p className={styles.heroSubtitle}>
          The unified payment infrastructure for Africa. Accept Mobile Money,
          Cards, and Bank Transfers with a single API.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs">
            Get Started →
          </Link>
          <Link
            className="button button--secondary button--outline button--lg"
            to="https://discord.gg/A2p4bwvW"
          >
            Join Discord
          </Link>
          <Link
            className="button button--secondary button--outline button--lg"
            to="/docs/api/endpoints"
          >
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({ title, description, link }) {
  return (
    <div
      className={clsx("col col--4")}
      style={{
        marginBottom: "1.5rem",
      }}
    >
      <Link
        to={link || "#"}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          className="card padding--lg"
          style={{
            height: "100%",
            marginBottom: "0",
          }}
        >
          <div className="card__header">
            <Heading as="h3">{title}</Heading>
          </div>
          <div className="card__body">
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

const FeatureList = [
  {
    title: "📱 Mobile Money Native",
    description: (
      <>
        Direct integration with MTN, Orange, and Airtel across Ghana, Rwanda,
        Uganda, and Liberia.
      </>
    ),
    link: "/docs/payments/mobile-money",
  },
  {
    title: "💳 Global Cards",
    description: (
      <>
        Accept Visa, Mastercard, and American Express from customers worldwide
        via Stripe integration.
      </>
    ),
    link: "/docs/payments/stripe",
  },
  {
    title: "🛠️ Developer First",
    description: (
      <>
        Typed SDKs for JavaScript, Python, and Go. Webhooks, granular
        permissions, and detailed logs.
      </>
    ),
    link: "/docs/sdks/javascript",
  },
];

function Features() {
  return (
    <section className={styles.features} style={{ padding: "4rem 0" }}>
      <div className="container">
        <div
          className="row"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0",
          }}
        >
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Integrations() {
  return (
    <section
      style={{
        padding: "4rem 0",
        backgroundColor: "var(--ifm-background-surface-color)",
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <Heading as="h2" style={{ marginBottom: "2rem" }}>
          Trusted by Developers
        </Heading>
        <div className="row" style={{ justifyContent: "center", gap: "2rem" }}>
          <div className="col col--3">
            <div className="avatar avatar--vertical">
              <img
                className="avatar__photo avatar__photo--lg"
                src="https://github.com/facebook.png"
                alt="React Logo"
              />
              <div className="avatar__intro">
                <div className="avatar__name">React Ready</div>
                <small className="avatar__subtitle">Components & Hooks</small>
              </div>
            </div>
          </div>
          <div className="col col--3">
            <div className="avatar avatar--vertical">
              <img
                className="avatar__photo avatar__photo--lg"
                src="https://github.com/python.png"
                alt="Python Logo"
              />
              <div className="avatar__intro">
                <div className="avatar__name">Python Native</div>
                <small className="avatar__subtitle">Django/Flask/FastAPI</small>
              </div>
            </div>
          </div>
          <div className="col col--3">
            <div className="avatar avatar--vertical">
              <img
                className="avatar__photo avatar__photo--lg"
                src="https://github.com/golang.png"
                alt="Go Logo"
              />
              <div className="avatar__intro">
                <div className="avatar__name">Go Performant</div>
                <small className="avatar__subtitle">High-throughput SDK</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Unified Payment Infrastructure for Africa"
    >
      <HomepageHero />
      <main>
        <Features />
        <Integrations />
      </main>
    </Layout>
  );
}
