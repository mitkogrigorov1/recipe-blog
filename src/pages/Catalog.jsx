import { useEffect, useState } from 'react';
import { getAll } from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/recipes.css';

export default function Catalog() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    getAll()
      .then((data) => { if (!cancelled) setRecipes(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    
    return () => { cancelled = true; };
  }, []);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>Рецепти</h1>
      {recipes.length === 0 ? (
        <p>Все още няма рецепти.</p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((r) => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      )}
    </section>
  );
}