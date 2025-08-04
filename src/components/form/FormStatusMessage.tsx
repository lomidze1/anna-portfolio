import { useState, useEffect } from 'react';
import type { TFunction } from 'i18next';

type FormStatusMessageProps = {
  status: 'idle' | 'sending' | 'success' | 'error';
  messageKey?: string;
  t: TFunction;
};

const FormStatusMessage = ({
  status,
  messageKey,
  t,
}: FormStatusMessageProps) => {
  const [messageVisibility, setMessageVisibility] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (status === 'success') {
      setMessageVisibility(true);
      timer = setTimeout(() => {
        setMessageVisibility(false);
      }, 2000);
    } else {
      setMessageVisibility(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [status]);

  if (!messageVisibility || status === 'idle') return null;

  const getMessage = () => {
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
          <p>{messageKey ? t(messageKey) : t('form.status.success')}</p>
        </div>
      );
    }
    if (status === 'error') {
      return (
        <div className='status-error'>
          <span>❌</span>
          <p>{messageKey ? t(messageKey) : t('form.status.error')}</p>
        </div>
      );
    }

    return null;
  };

  return <div className={`form-status-message ${status}`}>{getMessage()}</div>;
};

export default FormStatusMessage;
