import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import useForm from '../hooks/useForm';
import '../styles/auth.css';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { values, onChange } = useForm({ email: '', password: '', repeatPassword: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      return setError('Въведете валиден имейл.');
    }
    if (values.password.length < 6) {
      return setError('Паролата трябва да е поне 6 символа.');
    }
    if (values.password !== values.repeatPassword) {
      return setError('Паролите не съвпадат.');
    }

    setSubmitting(true);
    try {
      await register(values.email.trim(), values.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Грешка при регистрация.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth">
      <h1>Регистрация</h1>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Имейл" value={values.email} onChange={onChange} />
        <input type="password" name="password" placeholder="Парола" value={values.password} onChange={onChange} />
        <input type="password" name="repeatPassword" placeholder="Повтори паролата" value={values.repeatPassword} onChange={onChange} />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Регистриране...' : 'Регистрация'}
        </button>
      </form>
      <p>Вече имаш профил? <Link to="/login">Вход</Link></p>
    </section>
  );
}