import "../styles/pages/Home.scss";
import { lazy, Suspense, useContext } from "react";
import { useTranslation } from "react-i18next";
import projects from "../data/projects.json";
import { Link } from "react-router-dom";
import RevealOnScroll from "../components/animations/RevealOnScroll";
import SplitText from "../components/animations/SplitText";
import PageTransition from "../components/animations/PageTransition";
import { useDeviceCapability } from "../hooks/useDeviceCapability";
import { ThemeContext } from "../context/ThemeContext";

const HeroBackground = lazy(
  () => import("../components/animations/HeroBackground")
);

const HOME_CASE_STUDIES_COUNT = 3;

const homeSections = [
  {
    id: "design-work",
    titleKey: "home.design-work.title",
    descriptionKey: "home.design-work.description",
    imageKey: "home.design-work.image",
    path: "/design-work",
  },
  {
    id: "creative-products",
    titleKey: "home.creative-products.title",
    descriptionKey: "home.creative-products.description",
    imageKey: "home.creative-products.image",
    path: "/creative-products",
  },
];

const ETSY_URL = "https://www.etsy.com/shop/GeoLineStudio?ref=profile_header";

const Home = () => {
  const { t } = useTranslation();
  const capability = useDeviceCapability();
  const { theme } = useContext(ThemeContext);

  const caseStudies = projects.slice(0, HOME_CASE_STUDIES_COUNT);

  return (
    <PageTransition>
      <div className="home">
        <section className="hero">
          {capability === "high" && theme === "dark" ? (
            <Suspense fallback={null}>
              <HeroBackground />
            </Suspense>
          ) : (
            <div className="hero__fallback-bg" />
          )}

          <div className="hero__content">
            <SplitText
              text={t("hero-welcome.welcome-message")}
              as="h1"
              className="hero__title"
              splitBy="word"
              staggerDelay={80}
              initialDelay={200}
              animation="slide-up"
            />
            <RevealOnScroll variant="blur-in" delay={600} immediate>
              <p className="hero__description">
                {t("hero-welcome.welcome-description")}
              </p>
            </RevealOnScroll>
            <RevealOnScroll variant="scale-up" delay={900} immediate>
              <div className="hero__cta-group">
                <Link to="/my-work" className="hero__cta hero__cta--primary">
                  {t("hero-welcome.cta-primary")}
                </Link>
                <Link
                  to="/creative-products"
                  className="hero__cta hero__cta--secondary"
                >
                  {t("hero-welcome.cta-secondary")}
                </Link>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll variant="clip-up" delay={400} immediate>
            <div className="hero__image-wrapper">
              <img
                src="/images/profile.jpg"
                alt="Profile photo of Anna"
                className="hero__image"
                fetchPriority="high"
              />
            </div>
          </RevealOnScroll>
        </section>

        <RevealOnScroll variant="fade-up">
          <section className="quote-section">
            <blockquote className="quote-section__text">
              &bdquo;{t("hero-welcome.hero-quote")}&ldquo;
              <cite>— {t("hero-welcome.hero-quote-writer")}</cite>
            </blockquote>
          </section>
        </RevealOnScroll>

        <section className="work-container">
          <RevealOnScroll variant="blur-in">
            <h2 className="h2">{t("hero-work.title")}</h2>
          </RevealOnScroll>

          <div className="projects-box">
            {caseStudies.map((project, index) => (
              <RevealOnScroll
                key={project.id}
                delay={index * 150}
                variant={index % 2 === 0 ? "slide-right" : "slide-left"}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="project-card"
                >
                  <h3 className="h3">{t(project.titleKey)}</h3>
                  <span className="project-year">{t(project.year)}</span>
                  <img src={project.image} alt={t(project.titleKey)} />
                  <p className="p">{t(project.descriptionKey)}</p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll variant="fade-up">
            <div className="work-container__view-all-wrapper">
              <Link to="/my-work" className="work-container__view-all">
                {t("home.case-studies.view-all")}
              </Link>
            </div>
          </RevealOnScroll>
        </section>

        <section className="work-container additional-work-container home-sections">
          <RevealOnScroll variant="rotate-in">
            <h2 className="h2">{t("home.sections-title")}</h2>
          </RevealOnScroll>

          <div className="projects-box projects-box--two-col">
            {homeSections.map((item, index) => {
              const cardTitle = t(item.titleKey);
              const cardDescription = t(item.descriptionKey);
              const cardImage = t(item.imageKey);

              return (
                <RevealOnScroll
                  key={item.id}
                  delay={index * 150}
                  variant="scale-up"
                >
                  <Link to={item.path} className="project-card">
                    <h3 className="h3">{cardTitle}</h3>
                    {cardImage && (
                      <img src={cardImage} alt={cardTitle} loading="lazy" />
                    )}
                    <p className="p">{cardDescription}</p>
                  </Link>
                </RevealOnScroll>
              );
            })}
          </div>
        </section>

        <RevealOnScroll variant="fade-up">
          <section className="etsy-banner">
            <div className="etsy-banner__inner">
              <div className="etsy-banner__text">
                <h2 className="h2 etsy-banner__title">
                  {t("home.etsy-banner.title")}
                </h2>
                <p className="p etsy-banner__description">
                  {t("home.etsy-banner.description")}
                </p>
              </div>
              <a
                href={ETSY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="etsy-banner__cta"
              >
                {t("home.etsy-banner.cta")}
              </a>
            </div>
          </section>
        </RevealOnScroll>
      </div>
    </PageTransition>
  );
};

export default Home;
