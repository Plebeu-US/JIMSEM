import Image from "next/image";
import { CopyContract } from "./components/copy-contract";
import { TelegramIcon, XIcon } from "./components/platform-icons";
import { SiteHeader } from "./components/site-header";

const configuredXUrl = process.env.NEXT_PUBLIC_X_URL?.trim();
const configuredTelegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL?.trim();
const configuredContract = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS?.trim();
const xUrl = configuredXUrl || "#community";
const telegramUrl = configuredTelegramUrl || "#community";
const contractAddress = configuredContract || "COMING SOON — VERIFY ON OFFICIALS";
const xIsLive = Boolean(configuredXUrl);
const telegramIsLive = Boolean(configuredTelegramUrl);
const contractIsLive = Boolean(configuredContract);

const anatomy = [
  {
    number: "01",
    title: "JIMOTHY FACE",
    body: "Has seen the chart. Refuses to elaborate.",
    tone: "yellow",
  },
  {
    number: "02",
    title: "RACCOON CHASSIS",
    body: "Engineered for midnight snacks and suspicious transactions.",
    tone: "lilac",
  },
  {
    number: "03",
    title: "INDUSTRIAL EYES",
    body: "Watching the timeline and your unattended sandwich.",
    tone: "red",
  },
  {
    number: "04",
    title: "BRAIN: OUT OF OFFICE",
    body: "No strategy detected. Vibes remain operational.",
    tone: "cream",
  },
] as const;

const acquireSteps = [
  {
    number: "01",
    title: "PREPARE A WALLET",
    body: "Install a compatible wallet and guard the keys like premium dumpster snacks.",
    note: "KEYS ≠ SNACKS",
  },
  {
    number: "02",
    title: "LOAD THE SNACK FUND",
    body: "Add the network's native token for your swap and transaction fee.",
    note: "GAS THE BIN",
  },
  {
    number: "03",
    title: "FIND THE REAL $JIMSEM",
    body: "Paste the verified contract. Impostor raccoons are common in this area.",
    note: "CHECK TWICE",
  },
  {
    number: "04",
    title: "RELEASE HIM",
    body: "Swap, confirm, and welcome an unlicensed woodland anomaly into your wallet.",
    note: "HE LIVES THERE NOW",
  },
] as const;

const phases = [
  {
    phase: "PHASE 01",
    title: "SPOTTED IN THE DUMPSTER",
    body: "Character escaped. Ticker attached. Website became self-aware.",
  },
  {
    phase: "PHASE 02",
    title: "INVADES THE TIMELINE",
    body: "Memes reproduce without supervision. Community noise increases.",
  },
  {
    phase: "PHASE 03",
    title: "UNREASONABLY DOCUMENTED",
    body: "More cartoons, stickers, sightings, and community-made nonsense.",
  },
] as const;

const habitatSightings = [
  {
    src: "/assets/jimsem-birdfeeder.png",
    label: "SIGHTING 02A",
    title: "BIRD FEEDER TAKEOVER",
    note: "Capacity: six sparrows or one JIMSEM. Mathematics has failed.",
    alt: "JIMSEM perched on a tiny backyard bird feeder while startled sparrows watch",
  },
  {
    src: "/assets/jimsem-aquarium.png",
    label: "SIGHTING 02B",
    title: "AQUARIUM SECURITY BREACH",
    note: "The fish said nothing. The otters filed a formal complaint.",
    alt: "JIMSEM standing in an aquarium tunnel beneath fish and a small shark",
  },
] as const;

function SectionTitle({
  eyebrow,
  children,
  light = false,
}: {
  eyebrow: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-heading${light ? " section-heading--light" : ""}`}>
      <span className="section-heading__eyebrow">{eyebrow}</span>
      <h2>{children}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to the incident
      </a>

      <SiteHeader
        xUrl={xUrl}
        telegramUrl={telegramUrl}
        xIsLive={xIsLive}
        telegramIsLive={telegramIsLive}
      />

      <main id="main-content">
        <section className="hero-section" id="top" aria-labelledby="hero-title">
          <div className="hero-card">
            <Image
              className="hero-card__art"
              src="/assets/jimsem-hero.png"
              alt="JIMSEM, a worried human-faced raccoon, crashing through a stack of incident reports"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 1480px"
            />
            <div className="hero-card__copy">
              <h1 id="hero-title">
                HALF JIMOTHY.
                <span>HALF RACCOON.</span>
                <em>ZERO EXPLANATION.</em>
              </h1>
              <p className="hero-card__lede">
                Somewhere between a leaked cartoon cel and a terrible idea,
                JIMSEM escaped into the timeline. Now the little menace has a
                ticker.
              </p>
              <div className="hero-card__actions">
                <a className="comic-button comic-button--yellow" href="#get-jimsem">
                  ADOPT $JIMSEM <span aria-hidden="true">↗</span>
                </a>
                <a className="text-link" href="#incident">
                  READ THE INCIDENT REPORT <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <div className="hero-stamp" aria-hidden="true">
              WILDLIFE
              <strong>INCIDENT</strong>
              #0001
            </div>
          </div>

          <CopyContract address={contractAddress} isLive={contractIsLive} />
        </section>

        <section className="incident-section paper-texture" id="incident">
          <div className="section-wrap incident-grid">
            <div className="incident-copy">
              <SectionTitle eyebrow="CASE FILE 0001">THE INCIDENT</SectionTitle>
              <p className="incident-lede">
                Nobody created JIMSEM on purpose. One minute there was Jimothy.
                The next minute there was fur, a striped tail, and a chart moving
                for reasons science cannot explain.
              </p>
              <blockquote>
                “We checked the dumpster twice.
                <br />
                He was still there.”
              </blockquote>
              <div className="case-stamp">CASE STATUS: EXTREMELY OPEN</div>
            </div>

            <figure className="incident-art">
              <Image
                src="/assets/jimsem-incident.png"
                alt="Three illustrated evidence photos of JIMSEM hiding around trash cans"
                width={1774}
                height={887}
                sizes="(max-width: 980px) 100vw, 64vw"
              />
              <figcaption>
                EXHIBITS A—C // DO NOT FEED AFTER MIDNIGHT // PROBABLY FEED HIM
                ANYWAY
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="anatomy-section" id="anatomy">
          <div className="section-wrap">
            <SectionTitle eyebrow="TOTALLY PEER-REVIEWED" light>
              ANATOMY OF A MARKET ANOMALY
            </SectionTitle>

            <div className="anatomy-board">
              <div className="anatomy-board__subject">
                <div className="anatomy-burst" aria-hidden="true" />
                <Image
                  src="/assets/logo-cropped.png"
                  alt="Full-body illustration of JIMSEM"
                  width={852}
                  height={819}
                  sizes="(max-width: 980px) 72vw, 520px"
                />
                <span className="anatomy-board__label">FIG. 1 — WHY?</span>
              </div>

              <div className="anatomy-cards">
                {anatomy.map((item) => (
                  <article
                    className={`anatomy-card anatomy-card--${item.tone}`}
                    key={item.number}
                  >
                    <span className="anatomy-card__number">{item.number}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="economics-section" id="token">
          <div className="section-wrap economics-grid">
            <div>
              <SectionTitle eyebrow="FINANCE, BUT WITH PAWS">
                OFFICIAL DUMPSTER ECONOMICS
              </SectionTitle>
              <p className="economics-lede">
                No fake revolution. No wizard math. Just one highly recognizable
                cryptid wandering around the blockchain.
              </p>
              <p className="warning-note">
                <span aria-hidden="true">⚠</span> VERIFY EVERY ADDRESS. IMPOSTOR
                RACCOONS ARE COMMON IN THIS AREA.
              </p>
            </div>

            <figure className="tokenomics-poster">
              <Image
                src="/assets/jimsem-cat-shelter.png"
                alt="JIMSEM wedged into a cat tree inside a chaotic animal shelter"
                width={1536}
                height={1024}
                sizes="(max-width: 980px) calc(100vw - 40px), 58vw"
              />
              <figcaption>
                THE CURRENT ECONOMIC MODEL: FIND SNACK. SIT ON IT.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="buy-section paper-texture" id="get-jimsem">
          <div className="section-wrap">
            <div className="buy-heading-row">
              <SectionTitle eyebrow="FIELD MANUAL">
                HOW TO ACQUIRE THE CREATURE
              </SectionTitle>
              <span className="hand-note" aria-hidden="true">
                VERY EASY!
                <br />
                PROBABLY!
              </span>
            </div>

            <ol className="buy-steps">
              {acquireSteps.map((step) => (
                <li key={step.number}>
                  <span className="buy-step__number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                  <span className="buy-step__note">{step.note}</span>
                </li>
              ))}
            </ol>

            <div className="buy-action">
              <a className="comic-button comic-button--ink" href="#community">
                FIND THE OFFICIALS <span aria-hidden="true">↗</span>
              </a>
              <p>No contract yet? Good. Never copy one from the replies.</p>
            </div>
          </div>
        </section>

        <section className="sightings-section" id="sightings">
          <div className="section-wrap">
            <div className="sightings-intro">
              <SectionTitle eyebrow="UNVERIFIED WILDLIFE REPORTS" light>
                WRONG HABITAT. SAME GUY.
              </SectionTitle>
              <p>
                JIMSEM keeps appearing in places reserved for completely
                different animals. Authorities have stopped returning our calls.
              </p>
            </div>

            <div className="sightings-grid">
              {habitatSightings.map((item) => (
                <figure className="sighting-card" key={item.label}>
                  <div className="sighting-card__image">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) calc(100vw - 52px), (max-width: 980px) 46vw, 42vw"
                    />
                  </div>
                  <figcaption>
                    <span>{item.label}</span>
                    <strong>{item.title}</strong>
                    <small>{item.note}</small>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="roadmap-section" id="roadmap">
          <div className="section-wrap">
            <SectionTitle eyebrow="A ROADMAP WOULD IMPLY SOMEBODY IS DRIVING" light>
              THE JIMSEMAP
            </SectionTitle>

            <div className="roadmap-trail" aria-hidden="true" />
            <div className="phase-grid">
              {phases.map((item, index) => (
                <article className="phase-card" key={item.phase}>
                  <span className="phase-card__paw" aria-hidden="true">
                    {index + 1}
                  </span>
                  <p>{item.phase}</p>
                  <h3>{item.title}</h3>
                  <span>{item.body}</span>
                </article>
              ))}
            </div>
            <p className="roadmap-disclaimer">
              NO DATES. RACCOONS DO NOT USE CALENDARS.
            </p>
          </div>
        </section>

        <section className="community-section" id="community">
          <div className="section-wrap community-card">
            <div className="community-card__copy">
              <p className="kicker">THE DUMPSTER IS OPEN</p>
              <h2>JOIN THE TRASH COUNCIL</h2>
              <p>
                Bring memes, sightings, suspicious drawings, and the confidence
                to explain none of them.
              </p>
              <div className="community-actions">
                <a
                  className="social-button social-button--x"
                  href={xUrl}
                  target={xIsLive ? "_blank" : undefined}
                  rel={xIsLive ? "noreferrer" : undefined}
                >
                  <XIcon aria-hidden="true" />
                  {xIsLive ? "OPEN X" : "X COMING SOON"}
                </a>
                <a
                  className="social-button social-button--telegram"
                  href={telegramUrl}
                  target={telegramIsLive ? "_blank" : undefined}
                  rel={telegramIsLive ? "noreferrer" : undefined}
                >
                  <TelegramIcon aria-hidden="true" />
                  {telegramIsLive ? "ENTER TELEGRAM" : "TELEGRAM SOON"}
                </a>
              </div>
              <small>
                Official channel URLs can be set at deploy time. Trust the
                website, not a raccoon in your DMs.
              </small>
            </div>

            <div className="community-card__portrait" aria-hidden="true">
              <div className="portrait-moon" />
              <Image
                src="/assets/logo-cropped.png"
                alt=""
                width={852}
                height={819}
                sizes="(max-width: 980px) calc(100vw - 80px), 500px"
              />
              <span>ZERO THOUGHTS<br />FULL SEND</span>
            </div>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-title">
          <div className="final-cta__eyes" aria-hidden="true">
            <i />
            <i />
          </div>
          <p>LAST KNOWN SIGHTING: YOUR BROWSER</p>
          <h2 id="final-title">THE CREATURE HAS CHOSEN YOUR WALLET.</h2>
          <span>This is not destiny. It is probably poor impulse control.</span>
          <a className="comic-button comic-button--yellow" href="#get-jimsem">
            ADOPT $JIMSEM <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-wrap site-footer__inner">
          <a className="footer-brand" href="#top" aria-label="Back to the top">
            JIMSEM <span>$JIMSEM</span>
          </a>
          <p>
            $JIMSEM is a meme token created for entertainment. No promises, no
            guaranteed utility, and no financial advice. Do your own research —
            and never give a raccoon your seed phrase.
          </p>
          <span>© 2026 JIMSEM // UNLICENSED WILDLIFE ONCHAIN</span>
        </div>
      </footer>
    </div>
  );
}
