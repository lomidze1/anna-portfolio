import React, { useState, useEffect } from 'react';
import useInputValidation from '../hooks/useInputValidation';
import { useTranslation } from 'react-i18next';
import '../styles/components/Input.scss';

interface InputProps {
  type?: 'text' | 'email' | 'url' | 'password' | 'textarea';
  label?: string;
  name: string;
  title?: string;
  hasError?: boolean;
  value: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  icon?: React.ReactNode;
  required?: boolean;
  requiredIcon?: string;
  className?: string;
  setInputErrorStatus?: (name: string, hasError: boolean) => void;
  capitalize?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  title,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  icon,
  required = false,
  requiredIcon,
  className = '',
  setInputErrorStatus,
  capitalize = true,
}) => {
  const { errors, validate } = useInputValidation();
  const { t } = useTranslation();

  const [inputStatus, setInputStatus] = useState<
    'default' | 'typing' | 'error' | 'success'
  >('default');
  const [isFocused, setIsFocused] = useState(false);
  const resolvedTitle = title || t(`input.title.default`);

  function capitalizeText(text: string) {
    return text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  useEffect(() => {
    if (value.length === 0 && !isFocused) {
      setInputStatus('default');
    }
  }, [value, isFocused]);

  





  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newValue = e.target.value;
  
    const shouldCapitalize =
      capitalize && !['email', 'password', 'url'].includes(type);
  
    if (shouldCapitalize) {
      newValue = capitalizeText(newValue);
    }
  
    validate(name, type, newValue);
    setInputStatus('typing');
  

    if (onChange) {

      e.target.value = newValue;
      onChange(e);
    }
  };
  

















  const handleBlur = () => {
    setIsFocused(false);
    if (value.length === 0) {
      setInputStatus('default');
      setInputErrorStatus?.(name, false);
    } else {
      const errorKey = validate(name, type, value);
      if (errorKey) {
        setInputStatus('error');
        setInputErrorStatus?.(name, true);
      } else {
        setInputStatus('success');
        setInputErrorStatus?.(name, false);
      }
    }
  };

  const handleFocus = () => setIsFocused(true);

  const getStatusClass = () => {
    if (inputStatus === 'error') return 'input--error';
    if (inputStatus === 'success') return 'input--success';
    if (inputStatus === 'typing') return 'input--typing';
    return 'input--default';
  };

  const getInputClassNames = () => {
    return `form__input ${className} ${getStatusClass()}`;
  };

  return (
    <div className='input-container'>
      {label && <label>{label}</label>}
      <div className='input-wrapper'>
        {icon && (
          <span className={`input-icon ${getStatusClass()}`}>{icon}</span>
        )}{' '}
        {requiredIcon && <span className='required'>{requiredIcon}</span>}
        {type === 'textarea' ? (
          <textarea
            name={name}
            title={resolvedTitle}
            value={value}
            onChange={handleChange}
            onBlur={() => {
              handleBlur();
              onBlur?.();
            }}
            onFocus={() => {
              handleFocus();
              onFocus?.();
            }}
            placeholder={placeholder}
            required={required}
            className={getInputClassNames()}
          />
        ) : (
          <input
            type={type}
            name={name}
            title={resolvedTitle}
            value={value}
            onChange={handleChange}
            onBlur={() => {
              handleBlur();
              onBlur?.();
            }}
            onFocus={() => {
              handleFocus();
              onFocus?.();
            }}
            placeholder={placeholder}
            required={required}
            className={getInputClassNames()}
          />
        )}
      </div>

      <div className='input-message'>
        {inputStatus === 'error' && errors[name] && (
          <p className={`error-message ${errors[name] ? 'show' : ''}`}>
            {t(`input.validation.${name}`, {
              defaultValue: t(`input.validation.default.${type}`, {
                defaultValue: 'Something went wrong',
              }),
            })}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
