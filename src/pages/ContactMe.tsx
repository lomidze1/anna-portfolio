import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContactForm from '../components/form/ContactForm';
import MailchimpSubscribeForm from '../components/form/MailchimpSubscribeForm';
import FeedbackForm from '../components/form/FeedbackForm';
import RevealOnScroll from '../components/animations/RevealOnScroll';
import SplitText from '../components/animations/SplitText';
import PageTransition from '../components/animations/PageTransition';

type FormType = 'contact' | 'feedback' | 'subscribe';

const ContactMe = () => {
  const { t } = useTranslation();
  const [activeForm, setActiveForm] = useState<FormType>('contact');

  const renderForm = () => {
    if (activeForm === 'contact') return <ContactForm />;
    if (activeForm === 'feedback') return <FeedbackForm />;
    if (activeForm === 'subscribe') return <MailchimpSubscribeForm />;
    return null;
  };

  return (
    <PageTransition>
      <section className='contact-me'>
        <div className='contact-me__container'>
          <SplitText
            text={t('contact-page.title', "Let's Work Together")}
            as='h1'
            className='contact-me__title'
            splitBy='word'
            staggerDelay={100}
            animation='slide-up'
          />

          <RevealOnScroll variant='fade-up' delay={300}>
            <header className='contact-me__header' role='tablist'>
              <button
                role='tab'
                aria-selected={activeForm === 'contact'}
                onClick={() => setActiveForm('contact')}
                className={`contact-me__button ${
                  activeForm === 'contact' ? 'contact-me__button--active' : ''
                }`}
              >
                {t('contact-page.contact-me')}
              </button>
              <button
                role='tab'
                aria-selected={activeForm === 'subscribe'}
                onClick={() => setActiveForm('subscribe')}
                className={`contact-me__button ${
                  activeForm === 'subscribe'
                    ? 'contact-me__button--active'
                    : ''
                }`}
              >
                {t('contact-page.subscribe-me')}
              </button>
              <button
                role='tab'
                aria-selected={activeForm === 'feedback'}
                onClick={() => setActiveForm('feedback')}
                className={`contact-me__button ${
                  activeForm === 'feedback' ? 'contact-me__button--active' : ''
                }`}
              >
                {t('contact-page.feedback-to-me')}
              </button>
            </header>

            <section className='contact-me__form-container' role='tabpanel'>
              <div className='contact-me__form' key={activeForm}>
                {renderForm()}
              </div>
            </section>
          </RevealOnScroll>
        </div>
      </section>
    </PageTransition>
  );
};

export default ContactMe;
