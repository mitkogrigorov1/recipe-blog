import { useState } from 'react';
import useForm from '../hooks/useForm';
import ErrorMessage from './ErrorMessage';
import '../styles/recipes.css';

export default function RecipeForm({ title, initialValues, submitLabel, onSubmit }) {
  const { values, onChange } = useForm(initialValues);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (!values.title.trim()) return 'Заглавието е задължително.';
    if (values.title.trim().length < 3) return 'Заглавието трябва да е поне 3 символа.';
    if (values.description.trim().length < 10) return 'Описанието трябва да е поне 10 символа.';
    if (!values.ingredients.trim()) return 'Добавете съставки.';
    if (!values.instructions.trim()) return 'Добавете начин на приготвяне.';
    if (values.image_url && !/^https?:\/\/\S+$/.test(values.image_url.trim())) {
      return 'Линкът към снимката трябва да започва с http:// или https://';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    setError('');
    setSubmitting(true);
    try {
      await onSubmit({
        title: values.title.trim(),
        description: values.description.trim(),
        ingredients: values.ingredients.trim(),
        instructions: values.instructions.trim(),
        image_url: values.image_url.trim() || null,
      });
    } catch (err) {
      setError(err.message || 'Грешка при запис.');
      setSubmitting(false);
    }
  };

  return (
    <section className="recipe-form">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Заглавие" value={values.title} onChange={onChange} />
        <textarea name="description" placeholder="Кратко описание" rows="3" value={values.description} onChange={onChange} />
        <textarea name="ingredients" placeholder="Съставки (по една на ред)" rows="5" value={values.ingredients} onChange={onChange} />
        <textarea name="instructions" placeholder="Начин на приготвяне" rows="6" value={values.instructions} onChange={onChange} />
        <input name="image_url" placeholder="Линк към снимка (по избор)" value={values.image_url} onChange={onChange} />
        {error && <ErrorMessage message={error} />}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Запазване...' : submitLabel}
        </button>
      </form>
    </section>
  );
}