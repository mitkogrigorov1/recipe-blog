import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { getByAuthor } from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/recipes.css';

export default function Profile() {
  const { userId } = useParams();
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    getByAuthor(userId)
      .then((data) => { if (!cancelled) setRecipes(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [userId]);

  const isMine = user && user.id === userId;

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>{isMine ? 'Моите рецепти' : 'Рецепти на потребителя'}</h1>
      {isMine && <p>{user.email}</p>}
      {recipes.length === 0 ? (
        <p>Няма публикувани рецепти.</p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((r) => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      )}
    </section>
  );
}