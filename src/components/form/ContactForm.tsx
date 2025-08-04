import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../Input';
import FormStatusMessage from './FormStatusMessage';
import emailjs from '@emailjs/browser';
import UserIcon from '../../assets/icons/UserIcon';
import UserEmail from '../../assets/icons/UserEmail';
import BuildingIcon from '../../assets/icons/BuildingIcon';
import LinkIcon from '../../assets/icons/LinkIcon';
import LetterTextIcon from '../../assets/icons/LetterTextIcon';
import '../../styles/components/FormStatus.scss';
import '../../styles/components/ContactForm.scss';

const ContactForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    companyWebsite: '',
    message: '',
  });

  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');
  const [inputErrors, setInputErrors] = useState<Record<string, boolean>>({});

  const setInputErrorStatus = (name: string, hasError: boolean) => {
    setInputErrors((prev) => ({ ...prev, [name]: hasError }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hasError = Object.values(inputErrors).some(Boolean);
    if (hasError) {
      setMessage('form.status.error');
      setStatus('error');

      setTimeout(() => {
        setStatus('idle');
      }, 2000);

      return;
    }

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setMessage('form.status.required');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setMessage('form.status.sending');

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        {
          ...formData,
          time: new Date().toLocaleString(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus('success');
        setMessage('form.status.success');
        setInputErrors({});

        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            company: '',
            companyWebsite: '',
            message: '',
          });
          setMessage('');
          setStatus('idle');
        }, 2000);
      })
      .catch((err) => {
        console.error('Email send failed:', err);
        if (err?.status === 429) {
          setMessage('form.status.tooManyRequests');
        } else {
          setMessage('form.status.error');
        }
        setStatus('error');
      });

    console.log('Sending contact form:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`contact-form ${status}`}>
      <p className='title'>{t('contact-us.title')}</p>

      <Input
        type='text'
        name='name'
        title={t('input.title.name')}
        icon={<UserIcon />}
        placeholder={t('input.placeholder.name')}
        onChange={handleChange}
        value={formData.name}
        requiredIcon='*'
        setInputErrorStatus={setInputErrorStatus}
        required={true}
      />
      <Input
        type='email'
        name='email'
        title={t('input.title.email')}
        icon={<UserEmail />}
        value={formData.email}
        onChange={handleChange}
        placeholder={t('input.placeholder.email')}
        requiredIcon='*'
        setInputErrorStatus={setInputErrorStatus}
        required={true}
      />
      <Input
        type='text'
        name='company'
        title={t('input.title.company')}
        icon={<BuildingIcon />}
        value={formData.company}
        onChange={handleChange}
        placeholder={t('input.placeholder.company')}
        setInputErrorStatus={setInputErrorStatus}
      />
      <Input
        type='url'
        name='companyWebsite'
        title={t('input.title.companyWebsite')}
        icon={<LinkIcon />}
        value={formData.companyWebsite}
        onChange={handleChange}
        placeholder={t('input.placeholder.companyWebsite')}
        setInputErrorStatus={setInputErrorStatus}
      />
      <Input
        type='textarea'
        name='message'
        title={t('input.title.message')}
        icon={<LetterTextIcon />}
        value={formData.message}
        onChange={handleChange}
        placeholder={t('input.placeholder.message')}
        requiredIcon='*'
        setInputErrorStatus={setInputErrorStatus}
        required={true}
      />

      <div className='form-status-container'>
        <FormStatusMessage status={status} messageKey={message} t={t} />
      </div>

      <button
        type='submit'
        className='contact-form__button'
        title={t('form.buttons.title.submit', {
          defaultValue: t('form.buttons.title.default'),
        })}
        disabled={['sending', 'success', 'error'].includes(status)}
      >
        {t('form.buttons.submit')}
      </button>
    </form>
  );
};

export default ContactForm;
