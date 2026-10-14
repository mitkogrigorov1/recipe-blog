import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getOne } from '../services/recipeService';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/recipes.css';

export default function Details() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    getOne(id)
      .then((data) => { if (!cancelled) setRecipe(data); })
      .catch(() => { if (!cancelled) setError('Рецептата не е намерена.'); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <article className="recipe-details">
      <h1>{recipe.title}</h1>
      {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} />}
      <p>{recipe.description}</p>

      <h2>Съставки</h2>
      <p className="pre">{recipe.ingredients}</p>

      <h2>Начин на приготвяне</h2>
      <p className="pre">{recipe.instructions}</p>
    </article>
  );
}