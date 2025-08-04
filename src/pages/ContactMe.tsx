import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContactForm from '../components/form/ContactForm';
import MailchimpSubscribeForm from '../components/form/MailchimpSubscribeForm';
import FeedbackForm from '../components/form/FeedbackForm';

const ContactMe = () => {
  const { t } = useTranslation();

  const [activeForm, setActiveForm] = useState('contact');

  const renderForm = () => {
    if (activeForm === 'contact') return <ContactForm />;
    if (activeForm === 'feedback') return <FeedbackForm />;
    if (activeForm === 'subscribe') return <MailchimpSubscribeForm />;
    return null;
  };

  return (
    <>
      <section className='contact-me'>
        <div className='contact-me__container'>
          <header className='contact-me__header'>
            <button
              onClick={() => setActiveForm('contact')}
              className={`contact-me__button ${
                activeForm === 'contact' ? 'contact-me__button--active' : ''
              }`}
            >
              {t('contact-page.contact-me')}
            </button>
            <button
              onClick={() => setActiveForm('subscribe')}
              className={`contact-me__button ${
                activeForm === 'subscribe' ? 'contact-me__button--active' : ''
              }`}
            >
              {t('contact-page.subscribe-me')}
            </button>
            <button
              onClick={() => setActiveForm('feedback')}
              className={`contact-me__button ${
                activeForm === 'feedback' ? 'contact-me__button--active' : ''
              }`}
            >
              {t('contact-page.feedback-to-me')}
            </button>
          </header>

          <section className='contact-me__form-container'>
            <div className='contact-me__form'>{renderForm()}</div>
          </section>
        </div>
      </section>
    </>
  );
};

export default ContactMe;
