/* eslint-disable import/prefer-default-export */
import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  // export like this so reset is excluded from props that go straight to the form
  // this way you can spread props directly to a form component
  // without having to worry about errors.
  return {
    form: {
      type,
      value,
      onChange,
    },
    reset,
  };
};
