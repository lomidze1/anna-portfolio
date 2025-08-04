// აღარ შეცვალო აღარაფერი იდიალურია! 13:08
import { useState } from 'react';

const useInputValidation = () => {
  const [errorKeys, setErrorKeys] = useState<Record<string, string | null>>({});

  const validate = (name: string, type: string, value: string) => {
    const trimmed = value.trim();
    let errorKey: string | null = null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|org|net|edu|gov|io|biz|tv|me)$/;
    const urlRegex = /^https?:\/\/[^\s]+?\.(com|ge|org|net|edu|gov|io|biz|tv|me)(\/[^\s]*)?$/i;

    if (!trimmed) errorKey = 'validation.required';
    else {
      switch (type) {
        case 'text':
          if (trimmed.length < 2) errorKey = 'validation.nameTooShort';
          break;
        case 'email':
          if (!emailRegex.test(trimmed)) errorKey = 'validation.invalidEmail';
          break;
        case 'number':
          if (!/^\d+$/.test(trimmed)) errorKey = 'validation.invalidNumber';
          break;
        case 'url':
          if (!urlRegex.test(trimmed)) {
            errorKey = 'validation.invalidUrl';
          }
          break;
        case 'textarea':
          if (trimmed.length < 3) errorKey = 'validation.feedbackTooShort';
          break;
        case 'password':
          if (trimmed.length < 8) errorKey = 'validation.passwordTooShort';
          else if (!/[A-Z]/.test(trimmed))
            errorKey = 'validation.passwordRequiresUppercase';
          else if (!/[0-9]/.test(trimmed))
            errorKey = 'validation.passwordRequiresNumber';
          break;
        case 'name':
          if (/\s/.test(trimmed)) errorKey = 'validation.invalidName';
          if (trimmed.length < 1) errorKey = 'validation.nameTooShort';
          break;
      }
    }

    if (errorKey === null) {
      setErrorKeys((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    } else {
      setErrorKeys((prev) => ({ ...prev, [name]: errorKey }));
    }

   

    return errorKey;
  };

  const resetErrors = () => setErrorKeys({});



  return { errors: errorKeys, validate, resetErrors };
};

export default useInputValidation;
