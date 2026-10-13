import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import useForm from '../hooks/useForm';
import '../styles/auth.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { values, onChange } = useForm({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!values.email.trim() || !values.password) {
      return setError('Попълнете имейл и парола.');
    }

    setSubmitting(true);
    try {
      await login(values.email.trim(), values.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Грешка при вход.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth">
      <h1>Вход</h1>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Имейл" value={values.email} onChange={onChange} />
        <input type="password" name="password" placeholder="Парола" value={values.password} onChange={onChange} />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Влизане...' : 'Вход'}
        </button>
      </form>
      <p>Нямаш профил? <Link to="/register">Регистрация</Link></p>
    </section>
  );
}