import { useState } from 'react';

export default function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const onChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return { values, onChange };
}