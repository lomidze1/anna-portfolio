import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import FormStatusMessage from './FormStatusMessage';
import Input from '../Input';
import UserIcon from '../../assets/icons/UserIcon';
import LetterTextIcon from '../../assets/icons/LetterTextIcon';
import '../../styles/components/FeedbackForm.scss';
import '../../styles/components/FormStatus.scss';

const FeedbackForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    feedback: '',
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasError = Object.values(inputErrors).some(Boolean);
    if (hasError) {
      setMessage('form.status.error');
      setStatus('error');
      return;
    }

    if (!formData.name.trim() || !formData.feedback.trim()) {
      setMessage('form.status.required');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setMessage('form.status.sending');

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_FEEDBACK_TEMPLATE_ID,
        {
          ...formData,
          time: new Date().toLocaleString(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus('success');
        setMessage('form.status.success');
        setFormData({ name: '', feedback: '' });
        setInputErrors({});

        setTimeout(() => {
          setStatus('idle');
          setMessage('');
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

    console.log('Submitting feedback:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`feedback-form ${status}`}>
      <p className='title'>{t('feedback.title')}</p>

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
        type='textarea'
        name='feedback'
        title={t('input.title.feedback')}
        icon={<LetterTextIcon />}
        value={formData.feedback}
        onChange={handleChange}
        placeholder={t('input.placeholder.feedback')}
        requiredIcon='*'
        setInputErrorStatus={setInputErrorStatus}
        required={true}
      />

      <div className='form-status-container'>
        <FormStatusMessage status={status} messageKey={message} t={t} />
      </div>

      <button
        type='submit'
        className='feedback-form__button'
        title={t('form.buttons.title.submit', {
          defaultValue: t('form.buttons.title.default'),
        })}
        disabled={
          status === 'sending' || status === 'success' || status === 'error'
        }
      >
        {t('form.buttons.submit')}
      </button>
    </form>
  );
};

export default FeedbackForm;
