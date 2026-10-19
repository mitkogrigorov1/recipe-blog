import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { getLikes, like, unlike } from '../services/likeService';

export default function LikeButton({ recipeId }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    getLikes(recipeId)
      .then((data) => { if (!cancelled) setLikes(data); })
      .catch((err) => { if (!cancelled) setError(err.message); });
    return () => { cancelled = true; };
  }, [recipeId]);

  const liked = !!user && likes.includes(user.id);

  const toggle = async () => {
    setBusy(true);
    setError('');
    try {
      if (liked) {
        await unlike(recipeId, user.id);
        setLikes((prev) => prev.filter((id) => id !== user.id));
      } else {
        await like(recipeId, user.id);
        setLikes((prev) => [...prev, user.id]);
      }
    } catch (err) {
      setError(err.message || 'Грешка при запис на харесването.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="likes">
      <span>❤️ {likes.length}</span>
      {user ? (
        <button onClick={toggle} disabled={busy}>
          {liked ? 'Махни харесването' : 'Харесай'}
        </button>
      ) : (
        <span><Link to="/login">Влез</Link>, за да харесаш</span>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}