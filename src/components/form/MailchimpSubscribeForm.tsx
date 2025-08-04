import React, { useState, useEffect } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import Input from '../Input';
import { useTranslation } from 'react-i18next';
import UserEmail from '../../assets/icons/UserEmail';
import '../../styles/components/FormStatus.scss';
import '../../styles/components/MailchimpSubscribeForm.scss';

const MAILCHIMP_URL =
  'https://annalomidze.us7.list-manage.com/subscribe/post?u=7dbcb6af53d49a0c83fbc0e6e&id=d13694cdf0';

type Status = 'sending' | 'error' | 'success' | null;

type MailchimpFormData = {
  EMAIL: string;
  FNAME?: string;
};

type RenderProps = {
  subscribe: (formData: MailchimpFormData) => void;
  status: Status;
  message: string | Error | undefined;
};

const checkSubscriber = async (
  email: string
): Promise<'subscribed' | 'not_subscribed' | 'pending' | 'error'> => {
  const response = await fetch('http://localhost:4000/check-subscriber', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();
  return result.status || 'error';
};

const MailchimpForm = () => {
  return (
    <MailchimpSubscribe
      url={MAILCHIMP_URL}
      render={({ subscribe, status, message }: RenderProps) => (
        <CustomForm
          status={status}
          message={message}
          onValidated={(formData: MailchimpFormData) => subscribe(formData)}
        />
      )}
    />
  );
};

const CustomForm = ({
  status,
  message,
  onValidated,
}: {
  status: Status;
  message: string | Error | undefined;
  onValidated: (formData: MailchimpFormData) => void;
}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [customStatus, setCustomStatus] = useState<null | 'already_subscribed'>(
    null
  );
  const [localStatus, setLocalStatus] = useState<Status | null>(null);

  const resolveMessage = (
    status: Status,
    message: string | Error | undefined,
    customStatus: 'already_subscribed' | null
  ): React.ReactElement | null => {
    const text = typeof message === 'string' ? message.toLowerCase() : '';

    if (customStatus === 'already_subscribed')
      return (
        <div className='status-subscribed'>
          <span>✅</span>
          <p> {t('form.status.already-subscribed')} </p>
        </div>
      );

    if (status === 'sending') {
      return (
        <div className='status-sending'>
          <span>⏳</span>
          <p>{t('form.status.sending')}</p>
        </div>
      );
    }

    if (status === 'success') {
      return (
        <div className='status-success'>
          <span>✅</span>
          <p>{t('form.status.success-subscribe')}</p>
        </div>
      );
    }

    if (status === 'error' && text.includes('already')) {
      return (
        <div className='status-error'>
          <span>❗</span>
          <p>{t('subscribe.alert_message')}</p>
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div className='status-error'>
          <span>❌</span>
          <p>{t('form.status.error')}</p>
        </div>
      );
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) return;

    const subStatus = await checkSubscriber(email);
    if (subStatus === 'subscribed') {
      setCustomStatus('already_subscribed');
      return;
    }

    onValidated({ EMAIL: email });
  };

  useEffect(() => {
    if (status) {
      setLocalStatus(status);

      const timeout = setTimeout(() => {
        setLocalStatus(null);
        setCustomStatus(null);
        setEmail('');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [status]);

  return (
    <form onSubmit={handleSubmit} className='subscribe-form'>
      <p className='title'>{t('subscribe.title')}</p>

      <Input
        type='email'
        name='EMAIL'
        title={t('input.title.email')}
        placeholder={t('input.placeholder.email')}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setCustomStatus(null);
        }}
        icon={<UserEmail />}
        requiredIcon='*'
        required={true}
      />

      <div className='form-status-container'>
        {(localStatus || customStatus) && (
          <div
            className={`form-status-message status-${
              localStatus || customStatus
            }`}
          >
            <div>{resolveMessage(localStatus, message, customStatus)}</div>
          </div>
        )}
      </div>

      <button
        className='subscribe-form__button'
        type='submit'
        disabled={status === 'sending'}
        title={t(
          'form.buttons.title.subscribe',
          t('form.buttons.title.default')
        )}
      >
        {t('form.buttons.subscribe')}
      </button>
    </form>
  );
};

export default MailchimpForm;
