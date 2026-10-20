import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { getByRecipe, create, remove } from '../services/commentService';
import Spinner from './Spinner';

export default function Comments({ recipeId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getByRecipe(recipeId)
      .then((data) => { if (!cancelled) setComments(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [recipeId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const text = content.trim();
    if (text.length < 2) return setError('Коментарът трябва да е поне 2 символа.');
    if (text.length > 500) return setError('Коментарът може да е най-много 500 символа.');

    setError('');
    setSubmitting(true);
    try {
      const created = await create(recipeId, text, user);
      setComments((prev) => [...prev, created]);
      setContent('');
    } catch (err) {
      setError(err.message || 'Грешка при добавяне на коментар.');
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (id) => {
    setError('');
    try {
      await remove(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err.message || 'Грешка при изтриване.');
    }
  };

  return (
    <section className="comments">
      <h2>Коментари ({comments.length})</h2>

      {loading ? (
        <Spinner />
      ) : comments.length === 0 ? (
        <p>Все още няма коментари.</p>
      ) : (
        <ul>
          {comments.map((c) => (
            <li key={c.id}>
              <strong>{c.author_email}</strong>
              <span className="date"> {new Date(c.created_at).toLocaleString('bg-BG')}</span>
              <p className="pre">{c.content}</p>
              {user && user.id === c.author_id && (
                <button onClick={() => onDelete(c.id)}>Изтрий</button>
              )}
            </li>
          ))}
        </ul>
      )}

      {user ? (
        <form onSubmit={onSubmit}>
          <textarea
            rows="3"
            placeholder="Напиши коментар..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit" disabled={submitting}>
            {submitting ? 'Изпращане...' : 'Добави коментар'}
          </button>
        </form>
      ) : (
        <p><Link to="/login">Влез</Link>, за да коментираш.</p>
      )}

      {error && <p className="error">{error}</p>}
    </section>
  );
}