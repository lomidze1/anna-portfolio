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

const Home = () => {
  const { t } = useTranslation();
  const capability = useDeviceCapability();
  const { theme } = useContext(ThemeContext);
  const secondaryProjects = [
    {
      id: "ios",
      titleKey: "additional-work.ios-title",
      descriptionKey: "additional-work.ios-description",
      imageKey: "additional-work.ios-image",
      path: "/ios-projects",
    },
    {
      id: "test",
      titleKey: "additional-work.test-title",
      descriptionKey: "additional-work.test-description",
      imageKey: "additional-work.test-image",
      path: "/test-works",
    },
  ];

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
              <Link to="/my-work" className="hero__cta">
                {t("hero-work.title")}
              </Link>
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
            {projects.map((project, index) => (
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
        </section>

        <section className="work-container additional-work-container">
          <RevealOnScroll variant="rotate-in">
            <h2 className="h2">{t("additional-work.title")}</h2>
          </RevealOnScroll>

          <div className="projects-box">
            {secondaryProjects.map((item, index) => {
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
      </div>
    </PageTransition>
  );
};

export default Home;
