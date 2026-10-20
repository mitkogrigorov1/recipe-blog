import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext'
import { getOne, remove } from '../services/recipeService';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/recipes.css';
import LikeButton from '../components/LikeButton';
import Comments from '../components/Comments';

export default function Details() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const isOwner = user && recipe && user.id === recipe.author_id;

  const onDelete = async () => {
   if (!window.confirm('Сигурен ли си, че искаш да изтриеш рецептата?')) return;
   setDeleting(true);
   try {
     await remove(id);
     navigate('/recipes');
   } catch (err) {
     setError(err.message || 'Грешка при изтриване.');
     setDeleting(false);
   }
 };
  
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
      <p><Link to={`/profile/${recipe.author_id}`}>Още рецепти от този автор</Link></p>

      {isOwner && (
        <div className="actions">
         <Link to={`/recipes/${recipe.id}/edit`} className="btn">Редактирай</Link>
         <button onClick={onDelete} disabled={deleting}>
           {deleting ? 'Изтриване...' : 'Изтрий'}
         </button>
        </div>
     )}

     <LikeButton recipeId={recipe.id} />
     <Comments recipeId={recipe.id} />

    </article>
  );
}