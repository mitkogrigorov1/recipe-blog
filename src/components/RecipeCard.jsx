import { Link } from 'react-router';

export default function RecipeCard({ recipe }) {
  return (
    <article className="recipe-card">
      {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} />}
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <Link to={`/recipes/${recipe.id}`}>Виж повече</Link>
    </article>
  );
}